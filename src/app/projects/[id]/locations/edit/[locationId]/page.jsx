'use client'

import { useEffect, useState } from 'react'
import { LocationForm } from '@/components/locations/LocationForm'
import { getLocation, updateLocation } from '@/app/api/api'
import { useRouter } from 'next/navigation'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function EditLocation({ params }) {
    const [location, setLocation] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        async function fetchLocation() {
            try {
                const fetchedLocation = await getLocation(params.locationId)
                console.log("fetched location:", fetchedLocation);
                setLocation(fetchedLocation[0])
                setLoading(false)
            } catch (error) {
                console.error('Error fetching location:', error)
                setLoading(false)
            }
        }
        fetchLocation()
    }, [params.locationId])

    async function handleUpdateLocation(data) {
        try {
            await updateLocation(params.locationId, data)
            router.push(`/projects/${params.id}`)
        } catch (error) {
            console.error('Error updating location:', error)
        }
    }

    if (loading) return <div>Loading...</div>
    if (!location) return <div>Location not found</div>

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
                        <BreadcrumbLink href={`/projects/${params.id}`}>{project ? project.title : 'Project'}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit Location</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-3xl font-bold mb-6">Edit Location</h1>
            <LocationForm location={location} onSubmit={handleUpdateLocation} />
        </div>
    )
}