import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './components/theme/ThemeProvider'
import { Layout } from './components/layout/Layout'
import { AppRouter } from './router'
import { ScrollToTop } from './components/ScrollToTop'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Layout>
            <AppRouter />
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
