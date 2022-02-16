import "./App.css";
import Todos from "./components/todos";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useTodos } from "./hooks/todos.js";
import { useContext, useEffect } from "react";
import AddTodo from "./components/createTodo";
import { TaskContext } from "./context/tasksContext";

function App() {
  const { todos, createTodos, deleteTodo, updateTodos } =
    useContext(TaskContext);

  return (
    <div className="App container">
      <div className="t-color-red fw-bold fs-2">
        TODO <span className="t-color-white">List</span>
      </div>
      <AddTodo onAdd={createTodos} />
      <Todos todos={todos} onDelete={deleteTodo} onUpdate={updateTodos} />
    </div>
  );
}

export default App;
