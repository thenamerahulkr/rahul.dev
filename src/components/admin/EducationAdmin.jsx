import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'

export function EducationAdmin() {
  const [education, setEducation] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    location: '',
    start_date: '',
    end_date: '',
    gpa: '',
    description: '',
    order_index: 0
  })

  useEffect(() => {
    fetchEducation()
  }, [])

  const fetchEducation = async () => {
    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setEducation(data || [])
    } catch (error) {
      console.error('Error fetching education:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (edu) => {
    setEditingId(edu.id)
    setFormData({
      degree: edu.degree || '',
      institution: edu.institution || '',
      location: edu.location || '',
      start_date: edu.start_date || '',
      end_date: edu.end_date || '',
      gpa: edu.gpa || '',
      description: edu.description || '',
      order_index: edu.order_index || 0
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({
      degree: '',
      institution: '',
      location: '',
      start_date: '',
      end_date: '',
      gpa: '',
      description: '',
      order_index: 0
    })
  }

  const handleSave = async () => {
    try {
      if (editingId && editingId !== 'new') {
        const { error } = await supabase
          .from('education')
          .update(formData)
          .eq('id', editingId)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('education')
          .insert([formData])

        if (error) throw error
      }

      await fetchEducation()
      handleCancel()
    } catch (error) {
      console.error('Error saving education:', error)
      alert('Error saving education: ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return

    try {
      const { error } = await supabase
        .from('education')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchEducation()
    } catch (error) {
      console.error('Error deleting education:', error)
      alert('Error deleting education: ' + error.message)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading education...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Education</h2>
        <Button onClick={() => setEditingId('new')} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Entry
        </Button>
      </div>

      {(editingId === 'new' || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId === 'new' ? 'Add New Education' : 'Edit Education'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Degree (e.g., Bachelor of Technology)"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Institution"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              />
              <Input
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input
                placeholder="Start Date (e.g., 2020)"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              />
              <Input
                placeholder="End Date (or 'Present')"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              />
              <Input
                placeholder="GPA (optional)"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
              />
            </div>
            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
            <Input
              type="number"
              placeholder="Order Index (for sorting)"
              value={formData.order_index}
              onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
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
        {education.map((edu) => (
          <Card key={edu.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                  <p className="text-lg text-muted-foreground mb-1">
                    {edu.institution} {edu.location && `- ${edu.location}`}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {edu.start_date} - {edu.end_date || 'Present'}
                    {edu.gpa && ` | GPA: ${edu.gpa}`}
                  </p>
                  {edu.description && (
                    <p className="text-muted-foreground">{edu.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(edu)}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(edu.id)}
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
