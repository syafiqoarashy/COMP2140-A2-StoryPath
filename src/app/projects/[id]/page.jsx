'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { getProject, getLocations, getLocationsByProjectId } from '@/app/api/api';
import LocationsTable from '@/components/locations/LocationsTable';
import BreadcrumbComponent from "@/components/breadcrumbs/BreadcrumbComponent";

/**
 * Fetches project and locations based on the project ID.
 * @param {string} projectId - The ID of the project.
 * @returns {Promise<{project: object, locations: object[], error: string | null}>} 
 * An object containing the project, locations, and any error message.
 */
async function fetchProjectAndLocations(projectId) {
  try {
    const fetchedProject = await getProject(projectId);
    const allLocations = await getLocations();
    const projectLocations = getLocationsByProjectId(allLocations, parseInt(projectId));
    return { project: fetchedProject[0], locations: projectLocations, error: null };
  } catch (error) {
    console.error('Error fetching project and locations:', error);
    return { project: null, locations: [], error: 'Failed to load project and locations. Please try again later.' };
  }
}

/**
 * ProjectLocations component that displays the project details and its associated locations.
 * @param {Object} params - The parameters passed to the component.
 * @param {string} params.id - The ID of the project.
 * @returns {JSX.Element} The rendered component.
 */
export default function ProjectLocations({ params }) {
  const [project, setProject] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const { project, locations, error } = await fetchProjectAndLocations(params.id);
      setProject(project);
      setLocations(locations);
      setError(error);
      setLoading(false);
    };
    loadData();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!project) return <div>Project not found</div>;

  return (
      <div className="container mx-auto p-4 mt-24 bg-black text-white">
        <BreadcrumbComponent projectTitle={project.title} projectId={params.id}/>
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
        {locations.length < 1 && <div>No locations added yet.</div>}
      </div>
  );
}