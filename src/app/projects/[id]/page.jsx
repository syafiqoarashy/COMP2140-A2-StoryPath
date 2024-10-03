'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { getProject, getLocations, getLocationsByProjectId } from '@/app/api/api';
import LocationsTable from '@/components/locations/LocationsTable';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function ProjectLocations({ params }) {
  const [project, setProject] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProjectAndLocations() {
      try {
        const fetchedProject = await getProject(params.id);
        const allLocations = await getLocations();
        const projectLocations = getLocationsByProjectId(allLocations, parseInt(params.id));
        setProject(fetchedProject[0]);
        console.log("Project locations,", projectLocations);
        setLocations(projectLocations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project and locations:', error);
        setLoading(false);
      }
    }
    fetchProjectAndLocations();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  return (
      <div className="container mx-auto p-4 mt-20 bg-black text-white">
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
              <BreadcrumbPage>{project ? project.title : 'Project'}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{project.title} - Locations</h1>
          <div className="flex space-x-2">
            <Button asChild variant="outline">
              <Link href={`/projects/${params.id}/locations/create`}>Add New Location</Link>
            </Button>
            <Button asChild>
              <Link href={`/projects/${params.id}/preview`}>Preview</Link>
            </Button>
          </div>
        </div>
        <LocationsTable locations={locations} projectId={params.id} />
        {locations.length < 1 && (
            <div>
              No locations added yet.
            </div>
        )}
      </div>
  );
}