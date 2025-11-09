import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { Image } from '@/components/ui/Image'

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const { data, error: fetchError } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false })

        if (fetchError) throw fetchError

        setBlogPosts(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
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
          <h1 className="heading-xl mb-6">Blogs</h1>
          <p className="body-lg text-red-500">
            Failed to load blog posts. Please try again later.
          </p>
        </section>
      </div>
    )
  }

  const featuredPost = blogPosts.length > 0 ? blogPosts[0] : null
  const otherBlogPosts = blogPosts.slice(1)

  return (
    <>
      <Helmet>
        <title>Blog | Rahul Kumar</title>
        <meta 
          name="description" 
          content="Thoughts, insights, and perspectives on design, development, and the digital landscape." 
        />
        <meta property="og:title" content="Blog | Rahul Kumar" />
        <meta property="og:description" content="Articles about web development and technology" />
      </Helmet>

      <div className="pt-20">
        <section className="container-custom section-spacing">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="heading-xl mb-6">Blog</h1>
            <p className="body-lg text-muted-foreground">
              Thoughts, insights, and perspectives on design, development, and the digital landscape.
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-20">
              <Link to={`/blog/${featuredPost.slug}`} className="group block">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1">
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      {featuredPost.category} • {featuredPost.date}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-xl text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    <Button
                      variant="outline"
                      size="lg"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Read Article
                    </Button>
                  </div>
                  <div className="order-1 md:order-2 overflow-hidden rounded-lg">
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={featuredPost.image || '/placeholder.svg'}
                        alt={featuredPost.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Blog Post Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherBlogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group block bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-muted overflow-hidden">
                  <Image
                    src={post.image || '/placeholder.svg'}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    {post.category} • {post.date}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
