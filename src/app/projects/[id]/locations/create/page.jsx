'use client'

import { LocationForm } from '@/components/locations/LocationForm'
import { createLocation } from '@/app/api/api'
import { useRouter } from 'next/navigation'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function CreateLocation({ params }) {
    const router = useRouter()

    async function handleCreateLocation(data) {
        try {
            await createLocation({ ...data, project_id: parseInt(params.id) })
            router.push(`/projects/${params.id}`)
        } catch (error) {
            console.error('Error creating location:', error)
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
                        <BreadcrumbLink href={`/projects/${params.id}`}>Project</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Add New Location</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-3xl font-bold mb-6">Add New Location</h1>
            <LocationForm onSubmit={handleCreateLocation} />
        </div>
    )
}