/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { SyntheticEvent} from 'react';
import { Project } from './Projects';

interface ProjectFormProps {
   onCancle: () => void;
   onSave: (project: Project) => void;
   project: Project;
}

function ProjectForm({ onCancle, onSave, project: initialProject }: ProjectFormProps) {
   const [project, setproject] = React.useState(initialProject);
   const [ errors, setErrors ] = React.useState({
      name:'',
      description: '',
      budget: '',
   });

   const handleSubmit = (event: SyntheticEvent) => {
      event.preventDefault();
      if (!isValid()) return;
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
      });
      setErrors(() => validate(updatedProject));
   }

   function validate(project: Project) {
      let errors = {
         name: '',
         description: '',
         budget: '',
      }

      if (project.name.length === 0) {
         errors.name = 'Name is required.';
      }
      if (project.name.length > 0 && project.name.length < 3) {
         errors.name = 'Name needs to be at least 3 characters';
      }
      if (project.description.length === 0) {
         errors.description = 'Description is required.'
      }
      if (project.budget === 0 || project.budget < 0) {
         errors.budget = 'Budget must be more than $0';
      }

      return errors;
   }

   function isValid() {
      return (
         errors.name.length === 0 &&
         errors.description.length === 0 &&
         errors.budget.length === 0
      )
   }

   return (
      <form onSubmit={handleSubmit} className='input-group vertical'>
      <label htmlFor="name">Name</label>
      <input type="text" name='name' placeholder='enter name' value={project.name} onChange={handleChange} />
      {
         errors.name.length > 0 && (
            <div className='card error'>
               <p>{errors.name}</p>
            </div>
         )
      }

      <label htmlFor="description">Description</label>
      <textarea name="description" placeholder='enter description' value={project.description} onChange={handleChange}></textarea>
      {
         errors.description.length > 0 && (
            <div className='card error'>
               <p>{errors.description}</p>
            </div>
         )
      }

      <label htmlFor="budget">Budget</label>
      <input type="number" name='budget' placeholder='enter budget' value={project.budget} onChange={handleChange}/>
      {
         errors.budget.length > 0 && (
            <div className='card error'>
               <p>{errors.budget}</p>
            </div>
         )
      }

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