import React from 'react'

const List = ({list,setList,todo,setTodo,edit,setEdit}) => {
  return (
    <ul>
       {
        list.map((item,index) => {
         return  <li key={index}>{item}
         <button onClick={ () => {
          const delTodo = list.filter((_,i)=> i !== index)
          setList(delTodo)
         }}>Delete</button>

         <button onClick={()=>{
         setTodo(item)
         setEdit(index)
         }}>Edit</button>
         </li>
        })
       }
    </ul>
  )
}

export default List
