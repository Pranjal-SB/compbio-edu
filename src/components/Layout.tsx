import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div className="flex min-h-screen flex-col text-biology-ink">
      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-biology-dna to-biology-protein text-white shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12h20" />
                <path d="M12 2v20" />
                <path d="m4.93 4.93 14.14 14.14" />
                <path d="m19.07 4.93-14.14 14.14" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div>
              <p className="text-caption font-semibold uppercase tracking-[0.35em] text-biology-bark">
                CompBio Edu
              </p>
              <p className="mt-0.5 text-xs text-slate-600">Computational biology learning hub</p>
            </div>
          </div>
          <Navbar />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <Outlet />
      </main>

      <footer className="mt-auto border-t border-white/70 bg-white/30 px-6 py-8 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-medium text-biology-ink">CompBio Edu</p>
            <p className="mt-1 text-sm text-slate-600">A Computational Biology Learning Platform</p>
          </div>
          <div className="flex gap-4 text-sm text-slate-500">
            <a href="#" className="transition-colors hover:text-biology-dna">About</a>
            <a href="#" className="transition-colors hover:text-biology-dna">Privacy</a>
            <a href="#" className="transition-colors hover:text-biology-dna">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
