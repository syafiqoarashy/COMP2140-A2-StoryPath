'use client'

import { useEffect, useState } from 'react'
import { LocationForm } from '@/components/locations/LocationForm'
import { createLocation, getProject } from '@/app/api/api'
import { useRouter } from 'next/navigation'
import BreadcrumbComponent from "@/components/breadcrumbs/BreadcrumbComponent";

/**
 * CreateLocation component for adding a new location to a project.
 * @param {Object} props - Component props.
 * @param {Object} props.params - Route parameters.
 * @returns {JSX.Element} - Rendered component.
 */
export default function CreateLocation({ params }) {
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

    /**
     * Handles the creation of a new location.
     * @param {Object} data - The location data.
     * @returns {Promise<void>} - A promise that resolves when the location is created.
     */
    async function handleCreateLocation(data) {
        try {
            await createLocation({ ...data, project_id: parseInt(params.id) })
            router.push(`/projects/${params.id}`)
        } catch (error) {
            console.error('Error creating location:', error)
        }
    }

    if (loading) return <div>Loading...</div>
    if (!project) return <div>Project not found</div>

    return (
        <div className="container mx-auto p-4 mt-24 mb-24 bg-black text-white">
            <BreadcrumbComponent
                projectTitle={project.title}
                projectId={params.id}
            />
            <h1 className="text-3xl font-bold mb-6">Add New Location</h1>
            <LocationForm onSubmit={handleCreateLocation} />
        </div>
    )
}