import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProjectsAdmin } from '@/components/admin/ProjectsAdmin'
import { BlogsAdmin } from '@/components/admin/BlogsAdmin'
import { EducationAdmin } from '@/components/admin/EducationAdmin'
import { AdminAuth } from '@/components/admin/AdminAuth'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_authenticated')
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Rahul Kumar</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="pt-20 min-h-screen bg-background">
        <div className="container-custom section-spacing">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline" className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

            <TabsContent value="projects">
              <ProjectsAdmin />
            </TabsContent>

            <TabsContent value="blogs">
              <BlogsAdmin />
            </TabsContent>

            <TabsContent value="education">
              <EducationAdmin />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
