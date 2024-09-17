import { getProjects, createProject } from '@/app/api/api';

export default async function Projects() {
  const projects = await getProjects();
  console.log('Projects fetched:', projects);
  async function handleCreateProject(formData) {
    'use server';
    const newProject = {
      title: formData.get('title'),
      description: formData.get('description'),
      instructions: formData.get('instructions'),
      initial_clue: formData.get('initial_clue'),
      homescreen_display: formData.get('homescreen_display'),
      is_published: formData.get('is_published') === 'on',
      participant_scoring: formData.get('participant_scoring')
    };
    await createProject(newProject);
  }
  
  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <a href={`/projects/${project.id}`}>{project.title}</a>
          </li>
        ))}
      </ul>

      <h2>Create New Project</h2>
      <form action={handleCreateProject}>
        <input type="text" name="title" placeholder="Title" required /><br />
        <textarea name="description" placeholder="Description"></textarea><br />
        <textarea name="instructions" placeholder="Instructions"></textarea><br />
        <input type="text" name="initial_clue" placeholder="Initial Clue" /><br />
        <select name="homescreen_display">
          <option value="Display initial clue">Display initial clue</option>
          <option value="Display all locations">Display all locations</option>
        </select><br />
        <label>
          <input type="checkbox" name="is_published" /> Is Published
        </label><br />
        <select name="participant_scoring">
          <option value="Not Scored">Not Scored</option>
          <option value="Number of Scanned QR Codes">Number of Scanned QR Codes</option>
          <option value="Number of Locations Entered">Number of Locations Entered</option>
        </select><br />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}