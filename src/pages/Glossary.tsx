import { useMemo, useState } from 'react'
import { glossaryTerms, type GlossaryCategory, type GlossaryTerm } from '../data/glossaryTerms'

const categoryStyles: Record<GlossaryCategory, string> = {
  Proteins: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Nucleic Acids': 'bg-sky-100 text-sky-800 border-sky-200',
  Tools: 'bg-violet-100 text-violet-800 border-violet-200',
}

function Glossary() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openTerms, setOpenTerms] = useState<string[]>([])

  const filteredTerms = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return [...glossaryTerms]
      .sort((a, b) => a.term.localeCompare(b.term))
      .filter((term) => {
        if (!query) return true

        return (
          term.term.toLowerCase().includes(query) ||
          term.definition.toLowerCase().includes(query) ||
          term.category.toLowerCase().includes(query)
        )
      })
  }, [searchQuery])

  const toggleTerm = (term: GlossaryTerm['term']) => {
    setOpenTerms((current) =>
      current.includes(term) ? current.filter((item) => item !== term) : [...current, term],
    )
  }

  return (
    <div className="space-y-8">
      <section className="bio-card p-6 md:p-8">
        <p className="text-caption font-semibold uppercase tracking-[0.35em] text-biology-bark">
          Genomic Navigator
        </p>
        <h1 className="mt-3">Biochemistry Glossary</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-700">
          Explore key protein and genomics terms with quick search, clear definitions, and
          expandable notes for deeper study.
        </p>

        <div className="mt-6 max-w-xl">
          <label className="bio-label" htmlFor="glossary-search">
            Search terms
          </label>
          <input
            id="glossary-search"
            className="bio-input"
            type="search"
            placeholder="Search by term, definition, or category"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-600">
          <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800">
            Proteins
          </span>
          <span className="rounded-full bg-sky-100 px-3 py-1 font-medium text-sky-800">
            Nucleic Acids
          </span>
          <span className="rounded-full bg-violet-100 px-3 py-1 font-medium text-violet-800">
            Tools
          </span>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-biology-bark">
            {filteredTerms.length} term{filteredTerms.length === 1 ? '' : 's'} found
          </p>
          <p className="text-sm text-slate-600">Alphabetized A-Z</p>
        </div>

        <div className="space-y-3">
          {filteredTerms.length === 0 ? (
            <div className="bio-card px-6 py-10 text-center text-slate-600">
              No terms match your search. Try a different keyword.
            </div>
          ) : (
            filteredTerms.map((term) => {
              const isOpen = openTerms.includes(term.term)

              return (
                <article key={term.term} className="bio-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleTerm(term.term)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50 md:px-6"
                    aria-expanded={isOpen}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-biology-dna/10 text-sm font-bold text-biology-dna">
                        {term.term.charAt(0)}
                      </span>
                      <div className="min-w-0">
                        <h2 className="truncate text-xl font-semibold">{term.term}</h2>
                        <p className="text-sm text-slate-600">Click to expand definition</p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${categoryStyles[term.category]}`}
                      >
                        {term.category}
                      </span>
                      <span className="text-2xl text-slate-400">{isOpen ? '−' : '+'}</span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/70 px-5 py-4 md:px-6">
                      <p className="max-w-4xl text-slate-700">{term.definition}</p>
                    </div>
                  )}
                </article>
              )
            })
          )}
        </div>
      </section>
    </div>
  )
}

export default Glossary
