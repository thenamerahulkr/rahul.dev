import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Simple instant scroll to top - no animation conflicts
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
