'use client'

import { useEffect, useState } from 'react'
import { ProjectForm } from '@/components/projects/ProjectForm'
import { getProject, updateProject } from '@/app/api/api'
import { useRouter } from 'next/navigation'
import BreadcrumbComponent from "@/components/breadcrumbs/BreadcrumbComponent";

/**
 * EditProject component for editing an existing project.
 * @param {Object} props - The component props.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.id - The project ID.
 * @returns {JSX.Element} The rendered EditProject component.
 */
export default function EditProject({ params }) {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    /**
     * Fetches the project data.
     * @returns {Promise<void>}
     */
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

  /**
   * Handles the update of the project.
   * @param {Object} data - The updated project data.
   * @returns {Promise<void>}
   */
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
      <div className="container mx-auto p-4 mt-24 mb-24 bg-black text-white">
        <BreadcrumbComponent projectTitle={project.title}/>
        <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
        <ProjectForm project={project} onSubmit={handleUpdateProject} />
      </div>
  )
}