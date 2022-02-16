import React from "react";

export default function Button({ children, type, ...buttonProps }) {
  let classN = "btn p-2 m-2 btn-" + type;
  if (type === "submit") {
    classN = "btn p-2 m-2 btn-primary";
  }
  return (
    <button type={type} className={classN} {...buttonProps}>
      {children}
    </button>
  );
}
