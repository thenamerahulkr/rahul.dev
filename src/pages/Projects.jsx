import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { Image } from '@/components/ui/Image'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error: fetchError } = await supabase
          .from('projects')
          .select('id, slug, title, description, technologies, image')
          .order('created_at', { ascending: false })

        if (fetchError) throw fetchError

        setProjects(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-20">
        <section className="container-custom section-spacing text-center">
          <h2 className="text-3xl font-bold mb-4">Error Loading Projects</h2>
          <p className="body-lg text-muted-foreground mb-8">
            There was an issue fetching the projects. Please try again later.
          </p>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </section>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Projects | Rahul Kumar</title>
        <meta 
          name="description" 
          content="A showcase of my work, featuring web applications, design projects, and experiments." 
        />
        <meta property="og:title" content="Projects | Rahul Kumar" />
        <meta property="og:description" content="Web development projects and experiments" />
      </Helmet>

      <div className="pt-20">
        <section className="container-custom section-spacing">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-xl mb-6">Projects</h1>
            <p className="body-lg text-muted-foreground">
              A showcase of my work, featuring web applications, design projects, and experiments.
            </p>
          </div>

          <div className="mb-24">
            <h2 className="heading-lg mb-10 relative">
              Web Projects
              <span className="absolute -z-10 text-[8rem] font-bold text-muted/20 -top-16 -left-6 opacity-80">01</span>
            </h2>

            <div className="grid gap-16 md:gap-24">
              {projects.length === 0 ? (
                <div className="text-center text-muted-foreground text-xl">No projects found.</div>
              ) : (
                projects.map((project, index) => (
                  <div key={project.id} className="group">
                    <div
                      className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`}
                    >
                      <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                        <span className="text-8xl font-bold text-muted/30 group-hover:text-muted/50 transition-colors">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                        <h2 className="text-4xl font-bold mb-6 -mt-8 group-hover:translate-x-2 transition-transform">
                          {project.title}
                        </h2>
                        <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.technologies?.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <Button
                          asChild
                          variant="outline"
                          size="lg"
                          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        >
                          <Link to={`/projects/${project.slug}`}>View Project</Link>
                        </Button>
                      </div>
                      <div className={`overflow-hidden rounded-lg ${index % 2 === 1 ? "md:col-start-1" : ""}`}>
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden transition-transform group-hover:scale-105 duration-500">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
