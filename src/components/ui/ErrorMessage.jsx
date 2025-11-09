import { Button } from './button'

export function ErrorMessage({ error, retry }) {
  return (
    <div className="container-custom section-spacing text-center">
      <h2 className="text-3xl font-bold mb-4">Something went wrong</h2>
      <p className="text-muted-foreground mb-8">{error}</p>
      {retry && (
        <Button onClick={retry}>
          Try Again
        </Button>
      )}
    </div>
  )
}
