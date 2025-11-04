import React from 'react'

const List = ({list,setList}) => {
  return (
    <ul>
       {
        list.map((item,index) => {
         return  <li key={index}>{item}</li>
        })
       }
    </ul>
  )
}

export default List
