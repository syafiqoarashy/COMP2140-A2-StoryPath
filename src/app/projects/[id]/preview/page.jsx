'use client';

import { useState, useEffect } from 'react';
import { getProject, getLocations } from '@/app/api/api';
import Preview from "@/components/preview/Preview";
import BreadcrumbComponent from "@/components/breadcrumbs/BreadcrumbComponent";

/**
 * PreviewPage component for previewing a project and its locations.
 * @param {Object} props - Component props.
 * @param {Object} props.params - Route parameters.
 * @param {string} props.params.id - Project ID.
 * @returns {JSX.Element} - Rendered component.
 */
export default function PreviewPage({ params }) {
    const [project, setProject] = useState(null);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        /**
         * Fetches project and location data.
         * @returns {Promise<void>}
         */
        async function fetchData() {
            try {
                const fetchedProject = await getProject(params.id);
                const fetchedLocations = await getLocations();
                setProject(fetchedProject[0]);
                setLocations(fetchedLocations.filter(loc => loc.project_id === parseInt(params.id)));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }
        fetchData();
    }, [params.id]);

    if (loading) return <div>Loading...</div>;
    if (!project) return <div>Project not found</div>;

    return (
        <div className="container mx-auto p-4 mt-20 bg-black text-white">
            <BreadcrumbComponent projectTitle={project.title} projectId={project.id}/>
            <h1 className="text-3xl font-bold mb-6">{project.title} - Preview</h1>
            <Preview project={project} locations={locations} />
        </div>
    );
}