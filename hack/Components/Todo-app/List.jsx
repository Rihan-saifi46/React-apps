import React from 'react'

const List = ({list,setList}) => {
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
            
         }}>Edit</button>
         </li>
        })
       }
    </ul>
  )
}

export default List
