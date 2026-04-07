import { useState, useEffect } from 'react';
import { ProteinViewer } from '../components/ProteinViewer';
import { ProteinSearch } from '../components/ProteinSearch';
import { ProteinInfo } from '../components/ProteinInfo';
import { fetchStructure } from '../services/pdbApi';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

const FEATURED_PROTEINS = [
  { id: '3I40', name: 'Insulin', desc: 'Hormone regulating blood sugar' },
  { id: '4HHB', name: 'Hemoglobin', desc: 'Oxygen transport in blood' },
  { id: '1EMA', name: 'Green Fluorescent Protein', desc: 'Bioluminescent marker' }
];

function ProteinPrism() {
  const [selectedPdbId, setSelectedPdbId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pdbData, setPdbData] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const retryLoadProtein = () => {
    if (selectedPdbId) {
      setReloadToken((token) => token + 1);
    }
  };

  useEffect(() => {
    if (!selectedPdbId) return;

    const loadProtein = async () => {
        try {
          setLoading(true);
          setError(null);
          const result = await fetchStructure(selectedPdbId);
          setPdbData(result.structureText);
        } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load protein structure';
        setError(message.toLowerCase().includes('not found') || message.toLowerCase().includes('invalid')
          ? 'Invalid PDB ID. Please choose a valid structure and try again.'
          : 'Could not load the protein structure. Please check your connection and try again.');
        setPdbData('');
      } finally {
        setLoading(false);
      }
    };

    loadProtein();
  }, [selectedPdbId, reloadToken]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-biology-ink mb-4">Protein Prism</h1>
        <p className="text-biology-bark text-lg max-w-3xl">
          Explore the 3D structures of proteins. Search for a specific protein or select one of our featured examples to visualize its molecular structure and learn about its function.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Search & Info */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bio-card p-6">
            <h2 className="text-xl font-bold text-biology-ink mb-4">Search Proteins</h2>
            <ProteinSearch onSelectProtein={setSelectedPdbId} />
          </div>

          <div className="bio-card p-6">
            <h2 className="text-xl font-bold text-biology-ink mb-4">Featured Proteins</h2>
            <div className="flex flex-col gap-3">
              {FEATURED_PROTEINS.map(protein => (
                <button
                  key={protein.id}
                  onClick={() => setSelectedPdbId(protein.id)}
                  className={`text-left p-3 rounded-xl border transition-colors ${
                    selectedPdbId === protein.id 
                      ? 'border-biology-dna bg-biology-dna/5' 
                      : 'border-biology-clay/30 hover:border-biology-dna/50 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-biology-ink">{protein.name}</span>
                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-biology-bark">{protein.id}</span>
                  </div>
                  <div className="text-sm text-biology-bark">{protein.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <ProteinInfo pdbId={selectedPdbId} />
        </div>

        {/* Right Column: 3D Viewer */}
        <div className="lg:col-span-2">
          {error && (
            <ErrorMessage message={error} onRetry={retryLoadProtein} className="mb-6" />
          )}

          {!selectedPdbId && !loading && !error && (
            <div className="bio-card p-12 flex flex-col items-center justify-center min-h-[500px] text-center">
              <div className="w-16 h-16 rounded-full bg-biology-dna/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-biology-dna" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-biology-ink mb-2">No Protein Selected</h3>
              <p className="text-biology-bark max-w-md">
                Search for a protein or select one from the featured list to view its 3D structure.
              </p>
            </div>
          )}

          {loading && (
            <div className="bio-card p-12 flex flex-col items-center justify-center min-h-[500px]">
              <LoadingSpinner size="lg" message="Loading protein structure..." />
            </div>
          )}

          {!loading && pdbData && (
            <ProteinViewer pdbData={pdbData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProteinPrism;
