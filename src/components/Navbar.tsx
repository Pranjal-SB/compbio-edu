import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
    isActive
      ? 'bg-biology-dna text-white shadow-sm'
      : 'text-slate-600 hover:bg-biology-dna/10 hover:text-biology-dna',
  ].join(' ')

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'block rounded-xl px-4 py-3 text-base font-medium transition-all duration-300',
    isActive
      ? 'bg-biology-dna text-white shadow-sm'
      : 'text-slate-600 hover:bg-biology-dna/10 hover:text-biology-dna',
  ].join(' ')

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className="hidden items-center gap-2 md:flex">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/protein-prism" className={linkClass}>
          Protein Prism
        </NavLink>
        <NavLink to="/genomic-navigator" className={linkClass}>
          Genomic Navigator
        </NavLink>
      </nav>

      <button
        className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isOpen ? (
            <>
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </>
          ) : (
            <>
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </>
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[73px] z-50 border-b border-white/70 bg-white/95 p-4 shadow-lg backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-2">
            <NavLink to="/" end className={mobileLinkClass} onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/protein-prism" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
              Protein Prism
            </NavLink>
            <NavLink to="/genomic-navigator" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
              Genomic Navigator
            </NavLink>
          </nav>
        </div>
      )}
    </>
  )
}

export default Navbar
