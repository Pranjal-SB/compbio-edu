import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-full px-4 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-biology-dna text-white shadow-sm'
      : 'text-slate-600 hover:bg-white hover:text-biology-ink',
  ].join(' ')

function Navbar() {
  return (
    <nav className="flex flex-wrap items-center gap-2">
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
  )
}

export default Navbar
