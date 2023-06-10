/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Project } from './Projects';

interface ProjectFormProps {
   onCancle: () => void;
   onSave: (project: Project) => void;
   project: Project;
}

function ProjectForm({ onCancle, onSave, project: initialProject }: ProjectFormProps) {
   const [project, setproject] = React.useState(initialProject);

   const handleSubmit = (event: any) => {
      event.preventDefault();
      onSave(project);
   }
   
   const handleChange = (event: any) => {
      const { type, name, value, checked } = event.target;

      let updatedValue = type === 'checkbox' ? checked : value;

      if (type === 'number') {
         updatedValue = Number(updatedValue);
      }

      const change = {
         [name]: updatedValue,
      }

      let updatedProject: Project;
      setproject((p: Project) => {
         updatedProject = new Project({ ...p, ...change});
         return updatedProject;
      })
   }


   return (
      <form onSubmit={handleSubmit} className='input-group vertical'>
      <label htmlFor="name">Name</label>
      <input type="text" name='name' placeholder='enter name' value={project.name} onChange={handleChange} />

      <label htmlFor="description">Description</label>
      <textarea name="description" placeholder='enter description' value={project.description} onChange={handleChange}></textarea>

      <label htmlFor="budget">Budget</label>
      <input type="number" name='budget' placeholder='enter budget' value={project.budget} onChange={handleChange}/>

      <label htmlFor="isActive">isActive</label>
      <input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange}/>

      <div className="input-group">
         <button className='primary bordered medium' type='submit'>Save</button>
         <span></span>
         <button onClick={onCancle} type='button' className='bordered medium'>Cancel</button>
      </div>
   </form>
   )
}

export default ProjectForm;