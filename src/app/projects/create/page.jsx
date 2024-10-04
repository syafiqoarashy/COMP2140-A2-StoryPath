'use client'

import { ProjectForm } from '@/components/projects/ProjectForm'
import { createProject } from '@/app/api/api'
import { useRouter } from 'next/navigation'
import BreadcrumbComponent from "@/components/breadcrumbs/BreadcrumbComponent";

/**
 * CreateProject component for creating a new project.
 * @returns {JSX.Element} The rendered CreateProject component.
 */
export default function CreateProject() {
    const router = useRouter()

    /**
     * Handles the creation of a new project.
     * @param {Object} data - The project data to be created.
     * @returns {Promise<void>}
     */
    async function handleCreateProject(data) {
        try {
            await createProject(data)
            router.push('/projects')
        } catch (error) {
            console.error('Error creating project:', error)
        }
    }

    return (
        <div className="container mx-auto p-4 mt-24 mb-24 bg-black text-white">
            <BreadcrumbComponent />
            <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
            <ProjectForm onSubmit={handleCreateProject} />
        </div>
    )
}