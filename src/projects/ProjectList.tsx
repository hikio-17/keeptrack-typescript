import React from 'react';
import { Project } from './Projects';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface ProjectListProps {
   projects: Project[];
   onSave: (project: Project) => void;
}

function ProjectList({ projects, onSave }: ProjectListProps) {
   const [projectBeingEditing, setProjectBeingEditing] = React.useState({});

   const handleEdit = (project: Project) => {
      setProjectBeingEditing(project)
   }

   const handleCancle = () => {
      setProjectBeingEditing({})
   }

   const items = projects.map((project) => (
      <div key={project.id} className="cols-md">
         {
            project === projectBeingEditing ? (
               <ProjectForm project={project} onSave={onSave} onCancle={handleCancle} />
            ) : (
               <ProjectCard project={project} onEdit={handleEdit} />
            )
         }
      </div>
   ))
   return (
      <div className='row'>
         {items}
      </div>
   )
}

export default ProjectList;