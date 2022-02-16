import React from "react";
import { formToJson } from "../api/apiFeach";

import Button from "../ui/button";
import Field from "../ui/Field";

export default function Todo({ todo, onUpdate, onDelete }) {
  const handelDelete = async function (e) {
    e.preventDefault();
    console.log("test");
    await onDelete(todo);
  };

  const handelUpdate = async function (e) {
    e.preventDefault();
    let form = formToJson(e.target);

    await onUpdate(todo, form);
  };
  console.log("sb");
  console.log(todo);

  return (
    <form
      className="d-flex justify-content-center mb-2"
      onSubmit={handelUpdate}
    >
      <Field name="task" readonly={true} value={todo.name} />
      <Button type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-bar-up"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </Button>
      <Button type="danger" onClick={handelDelete}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </Button>
    </form>
  );
}
