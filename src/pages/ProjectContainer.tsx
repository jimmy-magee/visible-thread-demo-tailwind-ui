// Dependencies
import React, { useState, useEffect, useMemo, useCallback } from 'react'

// Components
import ProjectList, { IProject } from './ProjectList'
import Project from './Project'

import ProjectForm from './ProjectForm'


const initialTodos = [
  { id: 1, task: 'Go shopping', isComplete: true },
  { id: 2, task: 'Pay the electricity bill', isComplete: false}
]

function ProjectContainer() {
  const [projectList, setProjectList] = useState(initialTodos)
  const [selectedProject, setSelectedProject] = useState(null)
  const [task, setTask] = useState('')
  const [term, setTerm] = useState('')
  const [editMode, setEditMode] = useState(false)

  const printProjectList = useCallback(() => {
    console.log('Changing projectList', projectList)
  }, [projectList])

  useEffect(() => {
    // console.log('Rendering <App />')
  })

  useEffect(() => {
    printProjectList()
  }, [projectList, printProjectList, selectedProject])

  const handleCreate = () => {
    const newTodo = {
      id: Date.now(),
      task,
      isComplete: false,
    }

    setProjectList([...projectList, newTodo])
    setTask('')
  }


  const handleUpdate = (taskId: number) => {
    console.log('Updating task '+ taskId)

    let updatedTodos = projectList.map(project => {
      if(project.id === taskId){
          project.isComplete = !project.isComplete
       }
     return project
     })

    setProjectList(updatedTodos)
    console.log('Updated to do list '+ updatedTodos)
  }

    const handleSelect = (project: IProject) => {
      console.log('Project Selection Changed '+ project)
      setSelectedProject(project)
    }

  const handleSearch = () => {
    setTerm(task)
  }

  const handleEditMode = () => {
      setEditMode(!editMode)
    }

  const handleDelete = useCallback((taskId: number) => {
    const newTodoList = projectList.filter((project: IProject) => project.id !== taskId)
    setProjectList(newTodoList)
  }, [projectList])

  const filteredProjectList = useMemo(() => projectList.filter((project: IProject) => {
    // console.log('Filtering...')
    return project.task.toLowerCase().includes(term.toLowerCase())
  }), [term, projectList])

  return (
    <div>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={handleCreate}>Create</button>
      <button onClick={handleSearch}>Search</button>
       <p>Edit Mode {editMode.toString()}</p>
      <ProjectList projectList={filteredProjectList} editMode={editMode} handleDelete={handleDelete} handleUpdate={handleUpdate} handleSelect={handleSelect} handleEditMode={handleEditMode}/>
      { editMode &&
                    <ProjectForm></ProjectForm>
                    }
    </div>
  )
}

export default ProjectContainer
