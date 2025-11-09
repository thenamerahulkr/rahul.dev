import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { Image } from '@/components/ui/Image'

export default function ProjectDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProject() {
      try {
        const { data, error: fetchError } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .single()

        if (fetchError) throw fetchError

        setProject(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <>
        <Helmet>
          <title>Project Not Found | Rahul Kumar</title>
        </Helmet>
        <div className="pt-20 text-center container-custom section-spacing">
          <h2 className="text-3xl font-bold mb-4">Project not found</h2>
          <p className="text-muted-foreground mb-8">
            The project you are looking for does not exist or has been removed.
          </p>
          <Link to="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </>
    )
  }

  const nextProject = project.next_project_slug && project.next_project_title
    ? { title: project.next_project_title, slug: project.next_project_slug }
    : null

  return (
    <>
      <Helmet>
        <title>{project.title} | Rahul Kumar</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.featured_image} />
      </Helmet>

      <div className="pt-20">
        <article className="container-custom section-spacing">
          {/* Back Button */}
          <div className="mb-10">
            <Button asChild variant="ghost" className="group">
              <Link to="/projects" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Projects</span>
              </Link>
            </Button>
          </div>

          {/* Project Header */}
          <div className="max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">{project.description}</p>
            <div className="flex flex-wrap gap-6">
              {project.live_url && (
                <Button asChild size="lg" className="gap-2">
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                    <span>View Live Site</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {project.github_url && (
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    <span>View Code</span>
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-16 max-w-4xl mx-auto">
            <div className="group aspect-video bg-muted rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-[0.98] hover:shadow-lg">
              <Image
                src={project.featured_image || '/placeholder.svg'}
                alt={project.title}
                width={1600}
                height={800}
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-foreground">Project Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-muted-foreground uppercase">Client</h3>
                  <p className="text-lg text-foreground">{project.client}</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground uppercase">Year</h3>
                  <p className="text-lg text-foreground">{project.year}</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground uppercase">Role</h3>
                  <p className="text-lg text-foreground">{project.role}</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground uppercase">Technologies</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">The Challenge</h2>
                  <p className="text-lg text-muted-foreground">{project.challenge}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">The Solution</h2>
                  <p className="text-lg text-muted-foreground">{project.solution}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Gallery */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-foreground">Project Gallery</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.gallery?.map((image, index) => (
                <div
                  key={index}
                  className="group aspect-video bg-muted rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-[0.98] hover:shadow-lg"
                >
                  <Image
                    src={image || '/placeholder.svg'}
                    alt={`${project.title} - Image ${index + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Next Project */}
          {nextProject && (
            <div className="border-t border-border pt-16">
              <div className="text-center p-6 rounded-lg">
                <p className="text-muted-foreground mb-4">Next Project</p>
                <h2 className="text-3xl font-bold mb-8 text-foreground">{nextProject.title}</h2>
                <Button asChild size="lg">
                  <Link to={`/projects/${nextProject.slug}`}>View Project</Link>
                </Button>
              </div>
            </div>
          )}
        </article>
      </div>
    </>
  )
}
