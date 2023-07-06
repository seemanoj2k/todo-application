import { useState } from "react";

const TodoForm = ({onSubmit}) => {
    const [title,setTitle]=useState("");
    const [date,setDate]=useState("");
  return (
    <div className="flex items-center justify-evenly gap-2">
        <input value={title} onChange={(e)=>setTitle(e.target.value)}type="text" placeholder="Enter a todo" 
        className="p-2 border border-gray-900 rounded shadow"/>
        <input  value={date} onChange={(e)=>setDate(e.target.value)}type="date" placeholder="Due date" 
        className="p-2 border border-gray-900 rounded shadow"/>
        <button onClick={()=>onSubmit(title,date)}className="text-white bg-blue-400 hover:bg-blue-600 rounded shadow py-2 px-4">+ Add</button>
    </div>
  )
}

export default TodoForm