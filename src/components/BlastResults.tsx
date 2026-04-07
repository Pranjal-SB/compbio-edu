import { useState } from 'react';

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

interface BlastResultsProps {
  results: BlastHit[];
}

function getMatchQuality(identity: number): { color: string; badge: string; label: string } {
  if (identity >= 95) {
    return {
      color: 'border-green-500 bg-green-50',
      badge: 'bg-green-100 text-green-800',
      label: 'Excellent'
    };
  } else if (identity >= 80) {
    return {
      color: 'border-blue-500 bg-blue-50',
      badge: 'bg-blue-100 text-blue-800',
      label: 'Good'
    };
  } else if (identity >= 60) {
    return {
      color: 'border-yellow-500 bg-yellow-50',
      badge: 'bg-yellow-100 text-yellow-800',
      label: 'Moderate'
    };
  } else {
    return {
      color: 'border-orange-500 bg-orange-50',
      badge: 'bg-orange-100 text-orange-800',
      label: 'Weak'
    };
  }
}

function formatEValue(eValue: number): string {
  if (eValue === 0) return '0';
  if (eValue < 0.0001) return eValue.toExponential(1);
  return eValue.toFixed(4);
}

export function BlastResults({ results }: BlastResultsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bio-card p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-biology-ink mb-2">Search Results</h2>
        <p className="text-biology-bark text-sm">
          Found <strong>{results.length}</strong> matches. Click on any result to view details.
        </p>
      </div>

      <div className="space-y-3">
        {results.map((hit) => {
          const quality = getMatchQuality(hit.identity);
          const isExpanded = expandedId === hit.id;

          return (
            <div
              key={hit.id}
              className={`border-l-4 rounded-xl bg-white shadow-sm transition-all ${quality.color}`}
            >
              <button
                onClick={() => toggleExpand(hit.id)}
                className="w-full p-4 text-left hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-sm font-semibold text-biology-ink">
                        {hit.id}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${quality.badge}`}>
                        {quality.label}
                      </span>
                    </div>
                    <p className="text-biology-ink font-medium mb-1 truncate">
                      {hit.description}
                    </p>
                    <p className="text-biology-bark text-sm italic">
                      {hit.organism}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 text-sm shrink-0">
                    <div className="text-right">
                      <div className="text-biology-bark/70 text-xs font-medium uppercase tracking-wider mb-1">
                        Identity
                      </div>
                      <div className="font-bold text-biology-ink">
                        {hit.identity.toFixed(1)}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-biology-bark/70 text-xs font-medium uppercase tracking-wider mb-1">
                        E-value
                      </div>
                      <div className="font-mono text-biology-ink font-semibold">
                        {formatEValue(hit.eValue)}
                      </div>
                    </div>
                    <div className="flex items-center text-biology-bark">
                      <svg
                        className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-200">
                  <div className="pt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-biology-bark/70 text-xs font-medium uppercase tracking-wider mb-1">
                        Alignment Length
                      </div>
                      <div className="text-biology-ink font-semibold">
                        {hit.alignmentLength} bp
                      </div>
                    </div>
                    <div>
                      <div className="text-biology-bark/70 text-xs font-medium uppercase tracking-wider mb-1">
                        Query Range
                      </div>
                      <div className="text-biology-ink font-mono">
                        {hit.queryStart} - {hit.queryEnd}
                      </div>
                    </div>
                    <div>
                      <div className="text-biology-bark/70 text-xs font-medium uppercase tracking-wider mb-1">
                        Subject Range
                      </div>
                      <div className="text-biology-ink font-mono">
                        {hit.subjectStart} - {hit.subjectEnd}
                      </div>
                    </div>
                    <div>
                      <div className="text-biology-bark/70 text-xs font-medium uppercase tracking-wider mb-1">
                        Coverage
                      </div>
                      <div className="text-biology-ink font-semibold">
                        {((hit.alignmentLength / 120) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-biology-bark text-sm leading-relaxed">
                      <p className="mb-2">
                        <strong>Match Quality:</strong> This hit shows{' '}
                        <strong className={quality.badge.includes('green') ? 'text-green-700' : 
                                          quality.badge.includes('blue') ? 'text-blue-700' :
                                          quality.badge.includes('yellow') ? 'text-yellow-700' : 'text-orange-700'}>
                          {quality.label.toLowerCase()} similarity
                        </strong>{' '}
                        with {hit.identity.toFixed(1)}% sequence identity.
                      </p>
                      <p>
                        <strong>Statistical Significance:</strong> The E-value of {formatEValue(hit.eValue)}{' '}
                        {hit.eValue < 0.001 ? 'indicates a highly significant match' : 
                         hit.eValue < 0.01 ? 'suggests a significant match' : 
                         'indicates a potentially significant match'}.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-biology-dna/5 rounded-xl border border-biology-dna/20">
        <h3 className="text-sm font-semibold text-biology-ink mb-2">Understanding Your Results</h3>
        <ul className="text-biology-bark text-sm space-y-1">
          <li><strong>Identity %:</strong> Percentage of identical matches in the alignment</li>
          <li><strong>E-value:</strong> Expected number of random matches (lower = more significant)</li>
          <li><strong>Coverage:</strong> Percentage of query sequence aligned</li>
        </ul>
      </div>
    </div>
  );
}
