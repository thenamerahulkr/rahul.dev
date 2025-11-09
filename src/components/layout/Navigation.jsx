import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { HashLink } from 'react-router-hash-link'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const routes = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blogs", path: "/blog" },
    // use pathname + hash so react-router can navigate to home and set the hash
    { name: "Contact", path: "/", hash: "#contact" },
    { name: "Education", path: "/", hash: "#education" },
  ]

  const handleClick = (route, e) => {
    // If clicking on the same page without hash, scroll to top
    if (location.pathname === route.path && !route.hash) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container-custom flex items-center justify-between h-20">
          <HashLink 
            to="/" 
            scroll={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-playfair text-2xl font-bold tracking-tight"
          >
            Rahul<span className="text-muted-foreground">Kumar</span>
          </HashLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {routes.map((route) => {
              const to = `${route.path}${route.hash || ''}`
              const isActive = route.hash
                ? location.pathname === route.path && location.hash === route.hash
                : location.pathname === route.path

              return (
                <HashLink
                  key={`${route.path}${route.hash || ''}`}
                  to={to}
                  onClick={(e) => handleClick(route, e)}
                  scroll={el => el ? el.scrollIntoView({ behavior: 'smooth', block: 'start' }) : window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={cn(
                    "link-underline text-lg transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {route.name}
                </HashLink>
              )
            })}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background p-6" style={{ paddingTop: '5rem' }}>
          <nav className="flex flex-col space-y-6 text-center">
            {routes.map((route) => {
              const to = `${route.path}${route.hash || ''}`
              const key = `${route.path}${route.hash || ''}`
              return (
                <HashLink
                  key={key}
                  to={to}
                  onClick={(e) => {
                    handleClick(route, e)
                    setIsMenuOpen(false)
                  }}
                  scroll={el => el ? el.scrollIntoView({ behavior: 'smooth', block: 'start' }) : window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={cn(
                    "text-2xl py-2 transition-colors",
                    location.pathname === route.path ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {route.name}
                </HashLink>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}
