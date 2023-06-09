import React from 'react';
import { Project } from './Projects';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface ProjectListProps {
   projects: Project[];
}

function ProjectList({ projects }: ProjectListProps) {
   const items = projects.map((project) => (
      <div className="cols-md">
         <ProjectCard project={project} />
         <ProjectForm />
      </div>
   ))
   return (
      <div className='row'>
         {items}
      </div>
   )
}

export default ProjectList;