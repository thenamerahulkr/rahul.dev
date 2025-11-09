import { useState, useEffect } from 'react'
import { getEducationDetails } from '@/lib/education'

export function EducationSection() {
  const [educationData, setEducationData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEducation() {
      try {
        const data = await getEducationDetails()
        setEducationData(data)
      } catch (error) {
        console.error('Error loading education:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEducation()
  }, [])

  if (loading) return null
  if (!educationData || educationData.length === 0) return null

  return (
    <section className="container-custom section-spacing">
      <h2 className="text-3xl font-bold mb-8 text-center md:text-left text-foreground">Education</h2>
      <div className="space-y-8 max-w-3xl mx-auto">
        {educationData.map((edu) => (
          <div
            key={edu.id}
            className="
              border-l-4 border-zinc-900 dark:border-primary pl-4 py-1
              transition-transform duration-300 ease-in-out
              hover:scale-[0.99] hover:border-primary/80 hover:shadow-lg
              hover:bg-background/50 hover:dark:bg-secondary/10
              rounded-md
            "
          >
            <h3 className="text-xl font-semibold text-foreground">{edu.degree}</h3>
            <p className="text-lg text-muted-foreground">
              {edu.institution} {edu.location ? ` - ${edu.location}` : ''}
            </p>
            <p className="text-sm mt-1 text-muted-foreground">
              {edu.start_date} - {edu.end_date || 'Present'}
              {edu.gpa && ` | GPA: ${edu.gpa}`}
            </p>
            {edu.description && <p className="mt-2 text-muted-foreground leading-relaxed">{edu.description}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
