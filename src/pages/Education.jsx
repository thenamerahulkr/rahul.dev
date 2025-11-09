import { Helmet } from 'react-helmet-async'
import { EducationSection } from '@/components/EducationSection'

export default function Education() {
  return (
    <>
      <Helmet>
        <title>Education | Rahul Kumar</title>
        <meta 
          name="description" 
          content="Educational background and qualifications of Rahul Kumar" 
        />
        <meta property="og:title" content="Education | Rahul Kumar" />
        <meta property="og:description" content="Educational background and qualifications" />
      </Helmet>

      <div className="pt-20">
        <EducationSection />
      </div>
    </>
  )
}
