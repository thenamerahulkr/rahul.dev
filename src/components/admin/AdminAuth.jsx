import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock } from 'lucide-react'

export function AdminAuth({ onAuthenticated }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simple password check - In production, use proper authentication
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'

    if (password === adminPassword) {
      localStorage.setItem('admin_authenticated', 'true')
      onAuthenticated()
    } else {
      setError('Invalid password')
    }
    setLoading(false)
  }

  return (
    <>
      <Helmet>
        <title>Admin Login | Rahul Kumar</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription>Enter your password to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Authenticating...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
