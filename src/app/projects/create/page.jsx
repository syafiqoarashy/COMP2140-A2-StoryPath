'use client'

import { ProjectForm } from '@/components/projects/ProjectForm'
import { createProject } from '@/app/api/api'
import { useRouter } from 'next/navigation'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

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
    <div className="container mx-auto p-4 mt-24 mb-24 bg-black text-white">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create New Project</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
      <ProjectForm onSubmit={handleCreateProject} />
    </div>
  )
}