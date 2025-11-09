import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { LoadingSpinner } from './components/ui/LoadingSpinner'

const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Contact = lazy(() => import('./pages/Contact'))
const Education = lazy(() => import('./pages/Education'))
const Admin = lazy(() => import('./pages/Admin'))

export function AppRouter() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/education" element={<Education />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Suspense>
  )
}
