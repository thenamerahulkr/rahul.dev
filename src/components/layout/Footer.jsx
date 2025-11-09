import { Link } from "react-router-dom"
import { Github, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link to="/" className="font-playfair text-3xl font-bold tracking-tight">
              Rahul<span className="text-muted-foreground">Kumar</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Full Stack Developer specializing in creating beautiful, functional websites and applications.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/#education" className="text-muted-foreground hover:text-foreground transition-colors">
                  Education
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/thenamerahulkr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://github.com/thenamerahulkr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://twitter.com/thenamerahulkr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Rahul Kumar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
