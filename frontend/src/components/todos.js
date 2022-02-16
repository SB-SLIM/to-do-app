import React from "react";
import Todo from "./todo";

export default function Todos({ todos, onDelete, onUpdate }) {

  return (
    <div>
      {todos === null ? (
        <div> chargement </div>
      ) : (
        todos.map((t) => (
          <Todo key={t._id} todo={t} onDelete={onDelete} onUpdate={onUpdate} />
        ))
      )}
    </div>
  );
}
