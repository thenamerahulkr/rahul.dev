import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'

export function ProjectsAdmin() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    technologies: '',
    image: '',
    featured_image: '',
    gallery: '',
    live_url: '',
    github_url: '',
    client: '',
    year: '',
    role: '',
    challenge: '',
    solution: '',
    next_project_slug: '',
    next_project_title: ''
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: true })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (project) => {
    setEditingId(project.id)
    setFormData({
      title: project.title || '',
      slug: project.slug || '',
      description: project.description || '',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      image: project.image || '',
      featured_image: project.featured_image || '',
      gallery: Array.isArray(project.gallery) ? project.gallery.join(', ') : '',
      live_url: project.live_url || '',
      github_url: project.github_url || '',
      client: project.client || '',
      year: project.year || '',
      role: project.role || '',
      challenge: project.challenge || '',
      solution: project.solution || '',
      next_project_slug: project.next_project_slug || '',
      next_project_title: project.next_project_title || ''
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({
      title: '',
      slug: '',
      description: '',
      technologies: '',
      image: '',
      featured_image: '',
      gallery: '',
      live_url: '',
      github_url: '',
      client: '',
      year: '',
      role: '',
      challenge: '',
      solution: '',
      next_project_slug: '',
      next_project_title: ''
    })
  }

  const handleSave = async () => {
    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
        gallery: formData.gallery.split(',').map(g => g.trim()).filter(Boolean)
      }

      if (editingId && editingId !== 'new') {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingId)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectData])

        if (error) throw error
      }

      await fetchProjects()
      handleCancel()
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Error saving project: ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Error deleting project: ' + error.message)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        <Button onClick={() => setEditingId('new')} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Project
        </Button>
      </div>

      {(editingId === 'new' || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId === 'new' ? 'Add New Project' : 'Edit Project'}</CardTitle>
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
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
            <Input
              placeholder="Technologies (comma-separated)"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
              <Input
                placeholder="Featured Image URL"
                value={formData.featured_image}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
              />
            </div>
            <Input
              placeholder="Gallery URLs (comma-separated)"
              value={formData.gallery}
              onChange={(e) => setFormData({ ...formData, gallery: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Live URL"
                value={formData.live_url}
                onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
              />
              <Input
                placeholder="GitHub URL"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input
                placeholder="Client"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              />
              <Input
                placeholder="Year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              />
              <Input
                placeholder="Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>
            <Textarea
              placeholder="Challenge"
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              rows={3}
            />
            <Textarea
              placeholder="Solution"
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              rows={3}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Next Project Slug"
                value={formData.next_project_slug}
                onChange={(e) => setFormData({ ...formData, next_project_slug: e.target.value })}
              />
              <Input
                placeholder="Next Project Title"
                value={formData.next_project_title}
                onChange={(e) => setFormData({ ...formData, next_project_title: e.target.value })}
              />
            </div>
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
        {projects.map((project) => (
          <Card key={project.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies?.map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-muted text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {project.client} • {project.year} • {project.role}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(project)}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(project.id)}
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
