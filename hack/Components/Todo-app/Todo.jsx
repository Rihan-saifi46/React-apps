import React, { useState } from 'react'
import List from './List'

const Todo = () => {
    const [todo, setTodo] = useState('')
    const [list, setList] = useState([])
  return (
    <div>
      <input type='text' value={todo} onChange={(e)=>{
      setTodo(e.target.value)
      }} />
      <button onClick={ () => {
        if(todo.trim() !== ''){
       setList([...list,todo])
       setTodo('')   
       }}}>Add</button>
      <List list ={list} setList = {setList}/>
    </div>
  )
}

export default Todo
