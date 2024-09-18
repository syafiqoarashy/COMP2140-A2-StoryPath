import { getProjects } from '@/app/api/api';
import ProjectsTable from '../../components/projects/ProjectsTable';
import { Button } from "@/components/ui/button";

export default async function Projects() {
  const projects = await getProjects();
  console.log('Projects fetched:', projects);

  return (
    <div className="container mx-auto p-4 bg-black text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button asChild>
          <a href="/projects/create">Create New Project</a>
        </Button>
      </div>
        {projects.length < 1 &&
        <div>
            No projects added yet.
        </div>}
      <ProjectsTable projects={projects} />
    </div>
  );
}