import { Link } from 'react-router-dom'
import { Button } from './button'

export function NotFound() {
  return (
    <div className="container-custom section-spacing text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  )
}
