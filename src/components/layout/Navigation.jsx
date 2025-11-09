import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme/ThemeToggle"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const routes = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blogs", path: "/blog" },
    { name: "Contact", path: "/contact" },
    { name: "Education", path: "/education" },
  ]

  const handleClick = (route, e) => {
    // If clicking on the same page, scroll to top
    if (location.pathname === route.path) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container-custom flex items-center justify-between h-20">
          <Link 
            to="/" 
            className="font-playfair text-2xl font-bold tracking-tight"
          >
            Rahul<span className="text-muted-foreground">Kumar</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {routes.map((route) => {
              const isActive = location.pathname === route.path

              return (
                <Link
                  key={route.path}
                  to={route.path}
                  onClick={(e) => handleClick(route, e)}
                  className={cn(
                    "link-underline text-lg transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {route.name}
                </Link>
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
              return (
                <Link
                  key={route.path}
                  to={route.path}
                  onClick={(e) => {
                    handleClick(route, e)
                    setIsMenuOpen(false)
                  }}
                  className={cn(
                    "text-2xl py-2 transition-colors",
                    location.pathname === route.path ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {route.name}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}
