'use client'

import { useEffect, useState } from 'react'
import { LocationForm } from '@/components/locations/LocationForm'
import { getLocation, updateLocation, getProject } from '@/app/api/api'
import { useRouter } from 'next/navigation'
import BreadcrumbComponent from "@/components/breadcrumbs/BreadcrumbComponent";

/**
 * EditLocation component for editing an existing location in a project.
 * @param {Object} props - Component props.
 * @param {Object} props.params - Route parameters.
 * @param {string} props.params.id - Project ID.
 * @param {string} props.params.locationId - Location ID.
 * @returns {JSX.Element} - Rendered component.
 */
export default function EditLocation({ params }) {
    const [location, setLocation] = useState(null)
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        /**
         * Fetches location and project data.
         * @returns {Promise<void>}
         */
        async function fetchData() {
            try {
                const [fetchedLocation, fetchedProject] = await Promise.all([
                    getLocation(params.locationId),
                    getProject(params.id)
                ]);
                setLocation(fetchedLocation[0])
                setProject(fetchedProject[0])
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error)
                setLoading(false)
            }
        }
        fetchData()
    }, [params.locationId, params.id])

    /**
     * Handles the update of a location.
     * @param {Object} data - The updated location data.
     * @returns {Promise<void>}
     */
    async function handleUpdateLocation(data) {
        try {
            await updateLocation(params.locationId, data)
            router.push(`/projects/${params.id}`)
        } catch (error) {
            console.error('Error updating location:', error)
        }
    }

    if (loading) return <div>Loading...</div>
    if (!location || !project) return <div>Not found</div>

    return (
        <div className="container mx-auto p-4 mt-24 mb-24 bg-black text-white">
            <BreadcrumbComponent
                projectTitle={project.title}
                projectId={params.id}
                locationName={location.location_name}
                locationId={params.locationId}
            />
            <h1 className="text-3xl font-bold mb-6">Edit Location</h1>
            <LocationForm location={location} onSubmit={handleUpdateLocation} />
        </div>
    )
}