import { createContext, useEffect } from "react";
import { useTodos } from "../hooks/todos";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const {
    loading,
    todos,
    addValue,
    fetchTodos,
    deleteTodo,
    updateTodos,
    createTodos,
    changeAddValue,
  } = useTodos();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos, todos]);

  return (
    <TaskContext.Provider
      value={{
        loading,
        todos,
        addValue,
        deleteTodo,
        updateTodos,
        createTodos,
        changeAddValue,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, TaskContext };
