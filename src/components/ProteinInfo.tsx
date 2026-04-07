import { useEffect, useState } from 'react';
import { getProteinInfo } from '../services/uniprotApi';
import type { UniProtProteinInfo } from '../services/uniprotApi';

interface ProteinInfoProps {
  pdbId: string | null;
}

interface ExtendedUniProtInfo extends UniProtProteinInfo {
  comments?: Array<{
    commentType: string;
    texts?: Array<{ value: string }>;
  }>;
}

export function ProteinInfo({ pdbId }: ProteinInfoProps) {
  const [info, setInfo] = useState<ExtendedUniProtInfo | null>(null);
  const [resolution, setResolution] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pdbId) {
      setInfo(null);
      setResolution(null);
      return;
    }

    let isMounted = true;

    const fetchInfo = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 1. Fetch PDB metadata to get resolution and UniProt accession
        const pdbRes = await fetch(`https://data.rcsb.org/rest/v1/core/entry/${pdbId}`);
        if (!pdbRes.ok) throw new Error('Failed to fetch PDB metadata');
        const pdbData = await pdbRes.json();
        
        if (isMounted && pdbData.rcsb_entry_info?.resolution_combined?.length > 0) {
          setResolution(pdbData.rcsb_entry_info.resolution_combined[0]);
        }

        // 2. Get UniProt accession
        let accession = null;
        
        // Try to get from PDB polymer entities first
        const polymerRes = await fetch(`https://data.rcsb.org/graphql`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `{ entry(entry_id: "${pdbId}") { polymer_entities { rcsb_polymer_entity_container_identifiers { uniprot_ids } } } }`
          })
        });
        
        if (polymerRes.ok) {
          const polymerData = await polymerRes.json();
          const entities = polymerData.data?.entry?.polymer_entities || [];
          for (const entity of entities) {
            const ids = entity.rcsb_polymer_entity_container_identifiers?.uniprot_ids;
            if (ids && ids.length > 0) {
              accession = ids[0];
              break;
            }
          }
        }

        // Fallback to UniProt search if GraphQL fails
        if (!accession) {
          const searchRes = await fetch(`https://rest.uniprot.org/uniprotkb/search?query=xref:pdb-${pdbId}&format=json`);
          if (searchRes.ok) {
            const searchData = await searchRes.json();
            if (searchData.results && searchData.results.length > 0) {
              accession = searchData.results[0].primaryAccession;
            }
          }
        }

        // 3. Fetch UniProt info
        if (accession && isMounted) {
          const uniprotInfo = await getProteinInfo(accession);
          setInfo(uniprotInfo as ExtendedUniProtInfo);
        } else if (isMounted) {
          // If no UniProt info, just set basic info from PDB
          setInfo({
            proteinDescription: {
              recommendedName: {
                fullName: { value: pdbData.struct?.title || 'Unknown Protein' }
              }
            }
          });
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
          setError('Failed to load protein information.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchInfo();

    return () => {
      isMounted = false;
    };
  }, [pdbId]);

  if (!pdbId) {
    return (
      <div className="bio-card p-6 text-center text-biology-bark">
        Select a protein to view its information.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bio-card p-6 flex justify-center items-center min-h-[200px]">
        <svg className="animate-spin h-8 w-8 text-biology-dna" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bio-card p-6 text-red-600 bg-red-50">
        {error}
      </div>
    );
  }

  const name = info?.proteinDescription?.recommendedName?.fullName?.value || 'Unknown Protein';
  const organism = info?.organism?.scientificName || info?.organism?.commonName || 'Unknown';
  const functionComment = info?.comments?.find(c => c.commentType === 'FUNCTION');
  const functionText = functionComment?.texts?.[0]?.value || 'No function information available.';
  const seqLength = info?.sequence?.length;
  const accession = info?.primaryAccession;

  return (
    <div className="flex flex-col gap-4">
      <div className="bio-card p-6">
        <h2 className="text-2xl font-bold text-biology-ink mb-1">{name}</h2>
        <div className="text-sm text-biology-bark mb-4 font-medium">PDB ID: {pdbId}</div>
        
        <div className="space-y-4">
          <div>
            <h3 className="bio-label">Organism</h3>
            <p className="text-biology-ink">{organism}</p>
          </div>
          
          <div>
            <h3 className="bio-label">Function</h3>
            <p className="text-biology-ink text-sm leading-relaxed">{functionText}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="bio-label">Sequence Length</h3>
              <p className="text-biology-ink">{seqLength ? `${seqLength} AA` : 'Unknown'}</p>
            </div>
            <div>
              <h3 className="bio-label">Resolution</h3>
              <p className="text-biology-ink">{resolution ? `${resolution} Å` : 'Unknown'}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-biology-clay/30 flex gap-3">
            <a 
              href={`https://www.rcsb.org/structure/${pdbId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-biology-dna hover:underline"
            >
              View on RCSB PDB ↗
            </a>
            {accession && (
              <a 
                href={`https://www.uniprot.org/uniprotkb/${accession}/entry`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-biology-protein hover:underline"
              >
                View on UniProt ↗
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="bio-card p-5">
        <h3 className="bio-label mb-3">Secondary Structure Legend</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-red-500 shadow-sm"></div>
            <span className="text-sm text-biology-ink font-medium">Alpha Helix</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-blue-500 shadow-sm"></div>
            <span className="text-sm text-biology-ink font-medium">Beta Sheet</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gray-400 shadow-sm"></div>
            <span className="text-sm text-biology-ink font-medium">Loops / Unstructured</span>
          </div>
        </div>
      </div>
    </div>
  );
}
