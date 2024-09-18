'use client'

import { useEffect, useState } from 'react'
import { ProjectForm } from '@/components/projects/ProjectForm'
import { getProject, updateProject } from '@/app/api/api'
import { useRouter } from 'next/navigation'

export default function EditProject({ params }) {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchProject() {
      try {
        const fetchedProject = await getProject(params.id)
        setProject(fetchedProject[0])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching project:', error)
        setLoading(false)
      }
    }
    fetchProject()
  }, [params.id])

  async function handleUpdateProject(data) {
    try {
      await updateProject(params.id, data)
      router.push('/projects')
    } catch (error) {
      console.error('Error updating project:', error)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!project) return <div>Project not found</div>

  return (
    <div className="container mx-auto p-4 bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
      <ProjectForm project={project} onSubmit={handleUpdateProject} />
    </div>
  )
}