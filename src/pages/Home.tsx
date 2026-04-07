import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-biology bg-white/60 p-10 text-center shadow-biology backdrop-blur-md md:p-20">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-biology-dna/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-biology-protein/10 blur-3xl"></div>
        
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-biology-dna to-biology-protein text-white shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12h20" />
                <path d="M12 2v20" />
                <path d="m4.93 4.93 14.14 14.14" />
                <path d="m19.07 4.93-14.14 14.14" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-biology-ink md:text-6xl">
            CompBio Edu
          </h1>
          <p className="mb-8 text-xl text-slate-600">
            A computational biology learning platform. Explore the building blocks of life through interactive visualizations and genomic analysis tools.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/protein-prism" className="bio-button text-lg">
              Start Exploring
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <Link to="/protein-prism" className="group block transition-transform hover:-translate-y-1">
          <article className="bio-card relative h-full overflow-hidden p-8 transition-shadow hover:shadow-xl">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-biology-protein/10 transition-transform group-hover:scale-150"></div>
            <div className="relative z-10">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-biology-protein/20 text-biology-protein">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m12 2 3 7h-6z" />
                  <path d="m22 12-7 3v-6z" />
                  <path d="m12 22-3-7h6z" />
                  <path d="m2 12 7-3v6z" />
                </svg>
              </div>
              <p className="text-caption font-semibold uppercase tracking-[0.3em] text-biology-protein">
                Module 1
              </p>
              <h2 className="mt-2 text-3xl">Protein Prism</h2>
              <p className="mt-4 text-slate-600">
                Dive into the 3D world of macromolecules. Visualize protein structures, understand folding patterns, and explore molecular interactions in real-time.
              </p>
              <div className="mt-8 flex items-center font-medium text-biology-protein">
                Launch Module
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>
          </article>
        </Link>

        <Link to="/genomic-navigator" className="group block transition-transform hover:-translate-y-1">
          <article className="bio-card relative h-full overflow-hidden p-8 transition-shadow hover:shadow-xl">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-biology-dna/10 transition-transform group-hover:scale-150"></div>
            <div className="relative z-10">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-biology-dna/20 text-biology-dna">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 2v20" />
                  <path d="M9 2v20" />
                  <path d="M2 15h20" />
                  <path d="M2 9h20" />
                </svg>
              </div>
              <p className="text-caption font-semibold uppercase tracking-[0.3em] text-biology-dna">
                Module 2
              </p>
              <h2 className="mt-2 text-3xl">Genomic Navigator</h2>
              <p className="mt-4 text-slate-600">
                Navigate through DNA sequences. Analyze genetic data, identify mutations, and understand the code that drives biological functions.
              </p>
              <div className="mt-8 flex items-center font-medium text-biology-dna">
                Launch Module
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>
          </article>
        </Link>
      </section>
    </div>
  )
}

export default Home
