// Dependencies
import React, { FC, useEffect, memo } from 'react'
// Components
import Project  from './Project'

//import Form from './Form'
import { Routes, Route, Link, Outlet } from 'react-router-dom'

// Types
export type IProject = {
  id: number
  task: string
  isComplete: boolean
}

interface Props {
  projectList: IProject[]
  editMode: boolean
  handleDelete: any
  handleUpdate: any
  handleSelect: any
  handleEditMode: any
}

const ProjectList: FC<Props> = ({ projectList, editMode, handleDelete, handleUpdate, handleSelect, handleEditMode }) => {

  useEffect(() => {
    // This effect is executed every new render
     console.log('Rendering <List />')
  })

  return (


    <ul>
    <h3>Edit Mode in ProjectList {editMode.toString()}</h3>
      {projectList.map((todo: IProject) => (
        <Project
          key={todo.id}
          id={todo.id}
          task={todo.task}
          editMode={editMode}
          isComplete={todo.isComplete}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          handleSelect={handleSelect}
          handleEditMode={handleEditMode}
        />
      ))
      }




    </ul>




  )
}

export default memo(ProjectList)

