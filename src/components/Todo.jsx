

const Todo = ({title,date,onComplete,completed,onDelete}) => {
  return (
    <div className="flex items-center justify-between">
        <input checked={completed} type="checkbox" className="rounded shadow-sm" onClick={onComplete}/>
        <h5 className="text-gray-800 text-lg">{title}</h5>
        <span className="text-gray-300 text-sm"> -- </span>
        <p className="text-gray-600 text-sm">{new Date(date).toISOString().slice(0,10)}</p>
        <button onClick={onDelete}className="text-white bg-red-400 hover:bg-red-600 rounded shadow px-2 py-1 text-sm ">DEL</button>
    </div>
  )
}

export default Todo
