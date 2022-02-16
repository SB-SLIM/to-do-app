import { formToJson } from "../api/apiFeach";
import Button from "../ui/button";
import Field from "../ui/Field";

export default function AddTodo({ onAdd }) {
  const handleSubmit = async function (e) {
    e.preventDefault();
    const form = e.target;
    try {
      await onAdd(formToJson(form));
    } catch (e) {
      console.error(e);
    }
    form.reset();
  };
  return (
    <form onSubmit={handleSubmit} className="d-flex justify-content-center">
      <Field name="task" />
      <Button type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
        </svg>
      </Button>
    </form>
  );
}
