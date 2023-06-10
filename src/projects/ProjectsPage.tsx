import React from 'react';
import { MOCK_PROJECTS } from "./MockProjects";
import ProjectList from "./ProjectList";
import { Project } from "./Projects";

const ProjectsPage = () => {
  const [projects, setProjects] = React.useState(MOCK_PROJECTS);

  const saveProject = (project: Project) => {
    let updatedProject = projects.map((p) => {
      return p.id === project.id ? project : p;
    });
    setProjects(updatedProject);
  };

  return (
    <div>
      <h1>Projects</h1>
      
      <ProjectList onSave={saveProject} projects={projects} />
    </div>
  )
}

export default ProjectsPage;
