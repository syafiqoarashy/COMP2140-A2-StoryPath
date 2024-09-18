'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from 'next/link';
import { deleteProject } from '@/app/api/api';

export default function ProjectsTable({ projects: initialProjects }) {
  const [projects, setProjects] = useState(initialProjects);
  const router = useRouter();

  async function handleDeleteProject(id) {
    try {
      await deleteProject(id);
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  }

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="justify-between">
          <TableHead className="w-1/4">Title</TableHead>
          <TableHead className="w-1/4">Description</TableHead>
          <TableHead className="w-1/4">Status</TableHead>
          <TableHead className="w-1/4">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map(project => (
          <TableRow key={project.id} className="justify-between">
            <TableCell className="w-1/4">{project.title}</TableCell>
            <TableCell className="w-1/4">{project.description}</TableCell>
            <TableCell className="w-1/4">
              <Badge variant={project.is_published ? "success" : "secondary"} className={project.is_published ? "bg-green-500 hover:bg-green-600" : ""}>
                {project.is_published ? "Published" : "Draft"}
              </Badge>
            </TableCell>
            <TableCell className="w-1/4">
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link href={`/projects/${project.id}`}>View Locations</Link>
                </Button>
                <Button variant="outline" onClick={() => router.push(`/projects/edit/${project.id}`)}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDeleteProject(project.id)}>Delete</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}