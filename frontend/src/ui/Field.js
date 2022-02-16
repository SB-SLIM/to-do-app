import React from "react";
import "./field.css";

export default function Field({ value, readonly, name, handleChange }) {
  const handleDoubleClick = (e) => {
    readonly = false;
    e.target.removeAttribute("readOnly");
  };
  return (
    <div className="form-group">
      {readonly ? (
        <input
          type="text"
          name={name}
          className="bg-color border-top-0 border-end-0 border-start-0 text-white p-2 m-2"
          defaultValue={value}
          onDoubleClick={handleDoubleClick}
          readOnly
          onChange={handleChange}
        />
      ) : (
        <input
          type="text"
          name={name}
          className="bg-color text-white p-2"
          m-2
          defaultValue={value}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
