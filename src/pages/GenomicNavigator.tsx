import { Link } from 'react-router-dom'

function GenomicNavigator() {
  return (
    <div className="space-y-12">
      <section className="bio-card p-6 md:p-8">
        <p className="text-caption font-semibold uppercase tracking-[0.35em] text-biology-dna">
          Module 2
        </p>
        <h1 className="mt-3">Genomic Navigator</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-700">
          Explore the world of DNA sequences, learn about the Human Genome Project, and master essential biochemistry terminology.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Link to="/genomic-navigator/blast" className="group block">
          <article className="bio-card h-full p-6 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-biology-dna/10 text-biology-dna">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-biology-ink">BLAST Search</h2>
            <p className="mt-2 text-slate-600">
              Find similar sequences in biological databases using the Basic Local Alignment Search Tool.
            </p>
            <div className="mt-4 flex items-center text-sm font-medium text-biology-dna">
              Open Tool
              <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </article>
        </Link>

        <Link to="/genomic-navigator/timeline" className="group block">
          <article className="bio-card h-full p-6 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-biology-protein/10 text-biology-protein">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-biology-ink">HGP Timeline</h2>
            <p className="mt-2 text-slate-600">
              Explore the key milestones of the Human Genome Project from 1990 to 2003.
            </p>
            <div className="mt-4 flex items-center text-sm font-medium text-biology-protein">
              View Timeline
              <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </article>
        </Link>

        <Link to="/genomic-navigator/glossary" className="group block">
          <article className="bio-card h-full p-6 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-biology-membrane/10 text-biology-membrane">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-biology-ink">Glossary</h2>
            <p className="mt-2 text-slate-600">
              Learn essential biochemistry terms with searchable definitions and categories.
            </p>
            <div className="mt-4 flex items-center text-sm font-medium text-biology-membrane">
              Browse Terms
              <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </article>
        </Link>
      </section>
    </div>
  )
}

export default GenomicNavigator
