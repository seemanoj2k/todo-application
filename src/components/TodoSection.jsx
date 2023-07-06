import Todo from "./Todo";

const TodoSection = ({ todos, title, deleteTodo, markTodoAsCompleted }) => {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-start gap-6">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <span className="p-2 bg-gray-200 rounded shadow-sm text-sm">
          {todos?.length}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {todos?.map((todo) => (
          <Todo
            key={todo.id}
            title={todo.title}
            date={todo.date}
            completed={todo.completed}
            onComplete={() => markTodoAsCompleted(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoSection;