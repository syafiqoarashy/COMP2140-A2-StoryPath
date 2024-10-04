import { getProjects } from '@/app/api/api';
import ProjectsTable from '../../components/projects/ProjectsTable';
import { Button } from "@/components/ui/button";
import BreadcrumbComponent from "@/components/breadcrumbs/BreadcrumbComponent";

/**
 * Projects component for displaying all projects.
 * @returns {Promise<JSX.Element>} The rendered Projects component.
 */
export default async function Projects() {
    const projects = await getProjects();

    return (
        <div className="container mx-auto p-4 mt-24 bg-black text-white">
            <BreadcrumbComponent />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Projects</h1>
                <Button asChild>
                    <a href="/projects/create">Create New Project</a>
                </Button>
            </div>
            <ProjectsTable projects={projects} />
            {projects.length < 1 &&
                <div>
                    No projects added yet.
                </div>}
        </div>
    );
}