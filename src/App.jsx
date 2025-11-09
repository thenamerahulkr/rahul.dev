import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './components/theme/ThemeProvider'
import { Layout } from './components/layout/Layout'
import { AppRouter } from './router'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
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
