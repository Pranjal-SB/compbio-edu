import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div className="min-h-screen text-biology-ink">
      <header className="border-b border-white/70 bg-white/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-caption font-semibold uppercase tracking-[0.35em] text-biology-bark">
              CompBio Edu
            </p>
            <p className="mt-1 text-sm text-slate-600">Computational biology learning hub</p>
          </div>
          <Navbar />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <Outlet />
      </main>

      <footer className="border-t border-white/70 px-6 py-6 text-center text-sm text-slate-600">
        Built for protein structure and genomics learning.
      </footer>
    </div>
  )
}

export default Layout
