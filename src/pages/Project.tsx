import React, { FC, useEffect, memo } from 'react'


interface Props {
  id: number
  task: string
  isComplete: boolean
  editMode: boolean
  handleDelete: any
  handleUpdate: any
  handleSelect: any
  handleEditMode: any
}

const Project: FC<Props> = ({ id, task, isComplete, editMode, handleDelete, handleUpdate, handleSelect, handleEditMode }) => {
  useEffect(() => {
    console.log('Rendering <Project />', id, task, isComplete, editMode)
  })

  return (



    <li>

    <button onClick={handleEditMode}> Toggle Edit Mode {editMode}</button>{task}<span> Project completed {isComplete.toString()} </span>  <button onClick={() => handleUpdate(id)}>Edit</button><button onClick={() => handleSelect(task)}>Select</button> <button onClick={() => handleDelete(id)}>X</button></li>
  )
}

export default memo(Project)
