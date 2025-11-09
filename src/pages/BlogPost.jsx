import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { Image } from '@/components/ui/Image'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBlogPost() {
      try {
        const { data, error: fetchError } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .single()

        if (fetchError) throw fetchError

        setPost(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPost()
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <>
        <Helmet>
          <title>Post Not Found | Rahul Kumar</title>
        </Helmet>
        <div className="pt-20">
          <div className="container-custom section-spacing text-center">
            <h2 className="text-3xl font-bold mb-4">Post not found</h2>
            <p className="text-muted-foreground mb-8">
              Sorry, the blog post you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Rahul Kumar</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="pt-20">
        <article className="container-custom section-spacing">
          {/* Back Button */}
          <div className="mb-10">
            <Button asChild variant="ghost" className="group">
              <Link to="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Blog</span>
              </Link>
            </Button>
          </div>

          {/* Post Header */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="text-sm font-medium text-muted-foreground mb-4">
              {post.category} • {post.date}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{post.title}</h1>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                <Image
                  src="/images/profile.png"
                  alt={post.author}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-muted-foreground">By {post.author}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="aspect-[16/9] bg-muted rounded-lg overflow-hidden">
              <Image
                src={post.image || '/placeholder.svg'}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Post Content */}
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg prose-zinc max-w-none mb-8 dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content || post.excerpt || '' }}
            />
            {/* Medium/Dev Redirect Button */}
            {post.medium_url && (
              <div className="flex gap-4 mb-8">
                <Button asChild size="lg" className="gap-2">
                  <a href={post.medium_url} target="_blank" rel="noopener noreferrer">
                    Read this article on Medium or Dev
                  </a>
                </Button>
              </div>
            )}
          </div>

          {/* Author Bio */}
          <div className="max-w-3xl mx-auto mt-16 p-8 bg-muted rounded-lg">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-muted overflow-hidden flex-shrink-0">
                <Image
                  src="/images/profile.png"
                  alt={post.author}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">About {post.author}</h3>
                <p className="text-muted-foreground">
                  Full Stack Developer with a passion for technology, JavaScript, and sharing knowledge on
                  web development and computer science.
                </p>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {post.relatedposts && post.relatedposts.length > 0 && (
            <div className="max-w-3xl mx-auto mt-16">
              <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {post.relatedposts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group block bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video bg-muted overflow-hidden">
                      <Image
                        src={relatedPost.image || '/placeholder.svg'}
                        alt={relatedPost.title}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </>
  )
}
