import { useState,useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoSection from "./components/TodoSection";

function App() {
  const [todos, setTodos] = useState(null);
  const [sortIsAscending, setSortIsAscending] = useState(true);

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos") || "[]"));
  }, []);

  return (
    <div className="max-w-md m-auto mt-10">
      <h2 className="text-4xl font-bold text-gray-500 mb-4 text-center">
        Todo App
      </h2>
      <TodoForm
        onSubmit={(title, date) => {
          const updatedTodos = [
            ...todos,
            { id: new Date(), title, date, completed: false },
          ];
          setTodos(updatedTodos);

          localStorage.setItem("todos", JSON.stringify(updatedTodos));
        }}
      />

      <div className="flex items-center gap-4">
        <input
          onChange={(e) => {
            const filteredTodos = JSON.parse(
              localStorage.getItem("todos")
            )?.filter((todo) =>
              todo.title.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setTodos(filteredTodos);
          }}
          className="p-2 border border-gray-500 rounded shadow w-full my-4"
          placeholder="Type here to search..."
        />

        <div className="flex items-center gap-0">
          <select
            onChange={(e) => {
              switch (e.target.value) {
                case "Title":
                  console.log("title");
                  setTodos([
                    ...(todos?.sort((a, b) => (a.title > b.title ? 1 : -1)) ??
                      []),
                  ]);
                  break;
                case "Date":
                  setTodos([
                    ...(todos?.sort(
                      (a, b) => new Date(a.date) - new Date(b.date)
                    ) ?? []),
                  ]);
                  break;
              }
            }}
            className="p-2 border border-r-0 border-gray-500 rounded-l shadow w-28"
          >
            <option value="Title">Title</option>
            <option value="Date">Date</option>
          </select>
          <button
            onClick={() => {
              setSortIsAscending(!sortIsAscending);
              setTodos([...(todos?.reverse() ?? [])]);
            }}
            className="p-1.5 border-2 border-gray-500 rounded-r shadow"
          >
            {sortIsAscending ? "A" : "D"}
          </button>
        </div>
      </div>

      {[
        {
          title: "Overdue",
          todos: todos?.filter(
            (todo) =>
              new Date(todo.date).toISOString().slice(0, 10) <
                new Date().toISOString().slice(0, 10) && !todo.completed
          ),
        },
        {
          title: "Due Today",
          todos: todos?.filter(
            (todo) =>
              new Date(todo.date).toISOString().slice(0, 10) ===
                new Date().toISOString().slice(0, 10) && !todo.completed
          ),
        },
        {
          title: "Due Later",
          todos: todos?.filter(
            (todo) =>
              new Date(todo.date).toISOString().slice(0, 10) >
                new Date().toISOString().slice(0, 10) && !todo.completed
          ),
        },
        { title: "Completed", todos: todos?.filter((todo) => todo.completed) },
      ].map((section) => (
        <TodoSection
          key={section.title}
          title={section.title}
          markTodoAsCompleted={(id) =>
            setTodos(
              todos?.map((todo) => {
                if (todo.id === id) {
                  todo.completed = true;
                }

                return todo;
              })
            )
          }
          deleteTodo={(id) => {
            const remainingTodos = todos.filter((todo) => todo.id !== id);
            setTodos(remainingTodos);

            localStorage.setItem("todos", JSON.stringify(remainingTodos));
          }}
          todos={section.todos}
        />
      ))}
    </div>
  );
}

export default App;