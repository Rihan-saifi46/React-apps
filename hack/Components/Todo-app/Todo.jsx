import React, { useState } from 'react'
import List from './List'

const Todo = () => {
    const [todo, setTodo] = useState('')
    const [list, setList] = useState([])
    const [edit, setEdit] = useState(null)

    const Handle = () => {
      if(todo.trim() == '') return

      if(edit !== null){
        const updateList  = [...list]
        updateList(edit) = todo
        setList(updateList)
        setEdit(null)
      }
      else{
         setList([...list,todo])
      }

      setTodo('')
    }
  return (
    <div>
      <input type='text' value={todo} onChange={(e)=>{
      setTodo(e.target.value)
      }} />
      <button onClick={Handle}>{edit !== null?"Update":"Add"}</button>
      <List edit={edit} setEdit={setEdit} todo={todo} setTodo={setTodo} list ={list} setList = {setList}/>
    </div>
  )
}

export default Todo
