import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Smooth scroll to top with easeInOutCubic easing
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    const scrollToTop = () => {
      const startPosition = window.pageYOffset
      const duration = 800 // Duration in milliseconds
      let startTime = null

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        
        // Apply easing function
        const ease = easeInOutCubic(progress)
        
        window.scrollTo(0, startPosition * (1 - ease))

        if (timeElapsed < duration) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }

    scrollToTop()
  }, [pathname])

  return null
}
