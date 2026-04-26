import { Link, NavLink } from "react-router-dom"
import { Sigma } from "lucide-react"

export default function SiteNav() {
  const linkBase = "px-4 py-2 rounded-full text-sm font-medium transition-colors"
  const active = "bg-secondary text-secondary-foreground"
  const idle = "text-foreground/70 hover:text-foreground hover:bg-secondary/60"
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/70 border-b border-border/60">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
            <Sigma className="w-5 h-5" />
          </span>
          <span>STEMist <span className="text-primary">Mathathon</span></span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
            Problem of the Week
          </NavLink>
          <NavLink to="/archive" className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}>
            Archive
          </NavLink>
        </nav>
      </div>
    </header>
  )
}