import { Navigation } from './Navigation'
import { Footer } from './Footer'

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
