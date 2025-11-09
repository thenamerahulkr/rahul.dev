import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'

export function BlogsAdmin() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    date: '',
    category: '',
    author: 'Rahul Kumar',
    medium_url: ''
  })

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setBlogs(data || [])
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (blog) => {
    setEditingId(blog.id)
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      image: blog.image || '',
      date: blog.date || '',
      category: blog.category || '',
      author: blog.author || 'Rahul Kumar',
      medium_url: blog.medium_url || ''
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image: '',
      date: '',
      category: '',
      author: 'Rahul Kumar',
      medium_url: ''
    })
  }

  const handleSave = async () => {
    try {
      if (editingId && editingId !== 'new') {
        const { error } = await supabase
          .from('blogs')
          .update(formData)
          .eq('id', editingId)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([formData])

        if (error) throw error
      }

      await fetchBlogs()
      handleCancel()
    } catch (error) {
      console.error('Error saving blog:', error)
      alert('Error saving blog: ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchBlogs()
    } catch (error) {
      console.error('Error deleting blog:', error)
      alert('Error deleting blog: ' + error.message)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading blogs...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Blog Posts</h2>
        <Button onClick={() => setEditingId('new')} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Post
        </Button>
      </div>

      {(editingId === 'new' || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId === 'new' ? 'Add New Blog Post' : 'Edit Blog Post'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <Input
                placeholder="Slug (URL-friendly)"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>
            <Textarea
              placeholder="Excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
            />
            <Textarea
              placeholder="Content (HTML supported)"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={10}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
              <Input
                placeholder="Date (e.g., Feb 6, 2025)"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
              <Input
                placeholder="Author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </div>
            <Input
              placeholder="Medium/Dev URL (optional)"
              value={formData.medium_url}
              onChange={(e) => setFormData({ ...formData, medium_url: e.target.value })}
            />
            <div className="flex gap-2">
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" className="gap-2">
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {blogs.map((blog) => (
          <Card key={blog.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                  <p className="text-muted-foreground mb-2">{blog.excerpt}</p>
                  <p className="text-sm text-muted-foreground">
                    {blog.category} • {blog.date} • By {blog.author}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(blog)}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(blog.id)}
                    variant="destructive"
                    size="sm"
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
