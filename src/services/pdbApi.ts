import { ApiError, fetchWithTimeout, readJson, readText } from './http';

export interface PdbEntry {
  rcsc?: never;
  entry?: {
    id?: string;
    struct?: { title?: string };
    exptl?: Array<{ method?: string }>;
    polymer_entities?: unknown[];
  };
}

export interface PdbSearchHit {
  identifier: string;
  score?: number;
  services?: unknown[];
}

export interface PdbSearchResponse {
  query_id?: string;
  total_count?: number;
  result_set?: PdbSearchHit[];
}

export interface PdbStructure {
  pdbId: string;
  metadata: PdbEntry;
  structureText: string;
}

/**
 * Fetches a PDB structure file and metadata for a PDB ID.
 *
 * @param pdbId - Four-character PDB identifier.
 * @returns Structure text plus metadata.
 */
export async function fetchStructure(pdbId: string): Promise<PdbStructure> {
  const normalizedId = pdbId.trim().toUpperCase();
  if (!normalizedId) {
    throw new ApiError('pdbId is required');
  }

  const structureUrl = `https://files.rcsb.org/download/${encodeURIComponent(normalizedId)}.pdb`;
  const metadataUrl = `https://data.rcsb.org/rest/v1/core/entry/${encodeURIComponent(normalizedId)}`;

  const [structureResponse, metadataResponse] = await Promise.all([
    fetchWithTimeout(structureUrl),
    fetchWithTimeout(metadataUrl),
  ]);

  const [structureText, metadata] = await Promise.all([
    readText(structureResponse, structureUrl),
    readJson<PdbEntry>(metadataResponse, metadataUrl),
  ]);

  return { pdbId: normalizedId, structureText, metadata };
}

/**
 * Searches PDB entries by free-text protein query.
 *
 * @param query - Search term.
 * @returns Search hits from the RCSB search API.
 */
export async function searchProteins(query: string): Promise<PdbSearchHit[]> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    throw new ApiError('query is required');
  }

  const url = 'https://search.rcsb.org/rcsbsearch/v2/query';
  const response = await fetchWithTimeout(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: {
        type: 'group',
        logical_operator: 'and',
        nodes: [
          {
            type: 'terminal',
            service: 'text',
            parameters: {
              attribute: 'rcsb_entity_source_organism.taxonomy_lineage.name',
              operator: 'contains_words',
              value: trimmedQuery,
            },
          },
        ],
      },
      return_type: 'entry',
      request_options: { results_content_type: ['experimental'] },
    }),
  });

  const data = await readJson<PdbSearchResponse>(response, url);
  return data.result_set ?? [];
}
