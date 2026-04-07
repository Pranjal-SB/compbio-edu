import { useState } from 'react';
import { searchProteins } from '../services/pdbApi';
import type { PdbSearchHit } from '../services/pdbApi';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

interface ProteinSearchProps {
  onSelectProtein: (pdbId: string) => void;
}

export function ProteinSearch({ onSelectProtein }: ProteinSearchProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<PdbSearchHit[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setError(null);
    setHasSearched(true);

    try {
      // If it looks like a 4-character PDB ID, we could just select it directly,
      // but the requirements say "Search input accepts PDB ID or protein name"
      // and "Search button triggers API call with loading state".
      // We'll just use the search API.
      const hits = await searchProteins(query);
      setResults(hits.slice(0, 10)); // Show top 10
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred during search';
      setError(message.toLowerCase().includes('network')
        ? 'Could not search proteins. Please check your connection and try again.'
        : 'Protein search failed. Please try again.');
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={(e) => { e.preventDefault(); void handleSearch(); }} className="flex gap-2">
        <div className="flex-1">
          <label htmlFor="protein-search" className="sr-only">Search Protein</label>
          <input
            id="protein-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or PDB ID (e.g., insulin, 3I40)"
            className="bio-input"
            disabled={isSearching}
          />
        </div>
        <button
          type="submit"
          disabled={isSearching || !query.trim()}
          className="bio-button whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <ErrorMessage message={error} onRetry={() => void handleSearch()} />
      )}

      {isSearching && (
        <div className="py-6">
          <LoadingSpinner size="md" message="Searching proteins..." />
        </div>
      )}

      {hasSearched && !isSearching && results.length === 0 && !error && (
        <div className="p-4 text-center text-biology-bark bg-white/50 rounded-xl border border-white/70">
          No results found for "{query}". Try another term.
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {results.map((hit) => (
            <button
              key={hit.identifier}
              onClick={() => onSelectProtein(hit.identifier)}
              className="bio-card p-3 text-left hover:border-biology-dna transition-colors focus:outline-none focus:ring-2 focus:ring-biology-dna/50"
            >
              <div className="font-semibold text-biology-ink">{hit.identifier}</div>
              <div className="text-sm text-biology-bark mt-1">Score: {hit.score?.toFixed(2) || 'N/A'}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
