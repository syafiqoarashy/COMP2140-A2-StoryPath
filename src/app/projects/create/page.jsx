'use client'

import { ProjectForm } from '@/components/projects/ProjectForm'
import { createProject } from '@/app/api/api'
import { useRouter } from 'next/navigation'

export default function CreateProject() {
  const router = useRouter()

  async function handleCreateProject(data) {
    try {
      await createProject(data)
      router.push('/projects')
    } catch (error) {
    }
  }

  return (
    <div className="container mx-auto p-4 bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
      <ProjectForm onSubmit={handleCreateProject} />
    </div>
  )
}