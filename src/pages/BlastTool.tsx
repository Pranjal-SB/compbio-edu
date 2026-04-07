import { useState } from 'react';
import { BlastResults } from '../components/BlastResults';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

const SAMPLE_SEQUENCE = `ATGCTAGCTAGCTAGCTAGCATGCTAGCTAGCATGCTAGCTAGCATGCTAGCTAGCATGCTAGCTAGCATGCTAGCTAGCATGCTAGCTAGCATGCTAGCTAGCATGCTAGCTAGCATGCTAGCTAGC`;

interface BlastHit {
  id: string;
  organism: string;
  description: string;
  eValue: number;
  identity: number;
  alignmentLength: number;
  queryStart: number;
  queryEnd: number;
  subjectStart: number;
  subjectEnd: number;
}

function BlastTool() {
  const [sequence, setSequence] = useState('');
  const [program, setProgram] = useState<'blastn' | 'blastp'>('blastn');
  const [database, setDatabase] = useState('nr');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<BlastHit[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runBlastSearch = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const mockResults: BlastHit[] = [
      {
        id: 'NM_001234567',
        organism: 'Homo sapiens',
        description: 'BRCA1, DNA repair associated',
        eValue: 0,
        identity: 100,
        alignmentLength: 120,
        queryStart: 1,
        queryEnd: 120,
        subjectStart: 1,
        subjectEnd: 120
      },
      {
        id: 'XM_009876543',
        organism: 'Pan troglodytes',
        description: 'BRCA1-like protein',
        eValue: 1e-95,
        identity: 98.5,
        alignmentLength: 120,
        queryStart: 1,
        queryEnd: 120,
        subjectStart: 1,
        subjectEnd: 120
      },
      {
        id: 'NM_987654321',
        organism: 'Mus musculus',
        description: 'Brca1, DNA repair associated',
        eValue: 2e-78,
        identity: 89.2,
        alignmentLength: 118,
        queryStart: 1,
        queryEnd: 119,
        subjectStart: 1,
        subjectEnd: 118
      },
      {
        id: 'XM_123456789',
        organism: 'Danio rerio',
        description: 'brca1 gene, partial sequence',
        eValue: 5e-45,
        identity: 75.8,
        alignmentLength: 115,
        queryStart: 3,
        queryEnd: 117,
        subjectStart: 1,
        subjectEnd: 115
      },
      {
        id: 'NM_543216789',
        organism: 'Drosophila melanogaster',
        description: 'hypothetical protein similar to BRCA1',
        eValue: 0.003,
        identity: 45.2,
        alignmentLength: 95,
        queryStart: 10,
        queryEnd: 105,
        subjectStart: 5,
        subjectEnd: 100
      }
    ];

    return mockResults;
  };

  const executeSearch = async () => {
    if (!sequence.trim()) {
      setError('Please enter a sequence');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('BLAST search timed out. Please try again.')), 15000);
      });

      const mockResults = await Promise.race([runBlastSearch(), timeoutPromise]);
      setResults(mockResults);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to perform BLAST search';
      setError(message.includes('timed out') ? 'BLAST search timed out. Please try again.' : 'Could not complete the BLAST search. Check your connection and try again.');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = () => {
    setSequence(SAMPLE_SEQUENCE);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sequence.trim()) {
      setError('Please enter a sequence');
      return;
    }

    await executeSearch();
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-biology-ink mb-4">BLAST Search Tool</h1>
        <p className="text-biology-bark text-lg max-w-3xl">
          Search for similar sequences in biological databases using the Basic Local Alignment Search Tool (BLAST). 
          Enter a DNA or protein sequence to find matches across different organisms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Input & Controls */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bio-card p-6">
            <h2 className="text-xl font-bold text-biology-ink mb-4">What is BLAST?</h2>
            <p className="text-biology-bark text-sm leading-relaxed mb-3">
              <strong>BLAST</strong> (Basic Local Alignment Search Tool) finds regions of similarity between biological sequences. 
              The program compares your query sequence against a database and calculates statistical significance.
            </p>
            <p className="text-biology-bark text-sm leading-relaxed">
              <strong>E-value</strong> measures the number of expected matches by random chance. Lower values indicate more significant matches.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bio-card p-6">
            <h2 className="text-xl font-bold text-biology-ink mb-4">Search Parameters</h2>
            
            <div className="mb-4">
              <label className="bio-label">Sequence</label>
              <textarea
                value={sequence}
                onChange={(e) => setSequence(e.target.value)}
                placeholder="Paste your DNA or protein sequence here..."
                className="bio-input h-32 resize-none font-mono text-sm"
              />
              <button
                type="button"
                onClick={handleLoadSample}
                className="mt-2 text-sm text-biology-dna hover:text-biology-dna/80 font-medium transition"
              >
                Load sample sequence
              </button>
            </div>

            <div className="mb-4">
              <label className="bio-label">Program</label>
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value as 'blastn' | 'blastp')}
                className="bio-input"
              >
                <option value="blastn">BLASTn (nucleotide)</option>
                <option value="blastp">BLASTp (protein)</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="bio-label">Database</label>
              <select
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
                className="bio-input"
              >
                <option value="nr">Non-redundant (nr)</option>
                <option value="refseq">RefSeq</option>
                <option value="pdb">Protein Data Bank</option>
                <option value="swissprot">Swiss-Prot</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || !sequence.trim()}
              className="bio-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Run BLAST Search'}
            </button>
          </form>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-2">
          {error && (
            <ErrorMessage message={error} onRetry={() => void executeSearch()} className="mb-6" />
          )}

          {!results && !loading && !error && (
            <div className="bio-card p-12 flex flex-col items-center justify-center min-h-[500px] text-center">
              <div className="w-16 h-16 rounded-full bg-biology-dna/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-biology-dna" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-biology-ink mb-2">Ready to Search</h3>
              <p className="text-biology-bark max-w-md">
                Enter a sequence and configure your search parameters to find similar sequences in biological databases.
              </p>
            </div>
          )}

          {loading && (
            <div className="bio-card p-12 flex flex-col items-center justify-center min-h-[500px]">
              <LoadingSpinner size="lg" message="Running BLAST search..." />
              <p className="text-biology-bark/70 text-sm mt-2">This may take a few moments</p>
            </div>
          )}

          {!loading && results && (
            <BlastResults results={results} />
          )}
        </div>
      </div>
    </div>
  );
}

export default BlastTool;
