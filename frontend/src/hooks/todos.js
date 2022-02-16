import { useCallback, useReducer } from "react";
import { apiFetch } from "../api/apiFeach";

const FETCH_TODOS_REQUEST = "FETCH_TODOS_REQUEST";
const FETCH_TODOS_RESPONSE = "FETCH_TODOS_RESPONSE";
const DELETE_TODOS = "DELETE_TODOS";
const ADD_TODOS = "ADD_TODOS";
const UPDATE_TODOS = "UPDATE_TODOS";
const CHANGE_ADDVALUE = "CHANGE_ADDVALUE";

function reducer(state, action) {
  console.log("TODOS REDUCE", action.type, action);
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return { ...state, loading: true };
    case FETCH_TODOS_RESPONSE:
      return {
        ...state,
        loading: false,
        todos: action.payload,
      };
    case DELETE_TODOS:
      return {
        ...state,
        todos: state.todos.filter((i) => i !== action.payload),
      };
    case ADD_TODOS:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        loading: false,
      };
    case UPDATE_TODOS:
      return {
        ...state,
        todos: state.todos.map((i) =>
          i === action.target ? { ...i, ...action.payload } : i
        ),
      };
    case CHANGE_ADDVALUE:
      return { ...state, addValue: action.payload };
    default:
      break;
  }
}

const initialState = {
  loading: false,
  todos: null,
  addValue: null,
};
export function useTodos() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    loading: state.loading,
    todos: state.todos,
    addValue: state.addValue,
    fetchTodos: useCallback(
      async function () {
        if (state.todos !== null) {
          return null;
        }
        dispatch({ type: FETCH_TODOS_REQUEST });
        const data = await apiFetch("/tasks");
        dispatch({ type: FETCH_TODOS_RESPONSE, payload: data.tasks });
      },
      [state.todos]
    ),
    deleteTodo: useCallback(async function (todo) {
      dispatch({ type: DELETE_TODOS, payload: todo });
      await apiFetch("/tasks/" + todo._id, {
        method: "delete",
      });
    }, []),
    updateTodos: useCallback(async function (todo, data) {
      dispatch({ type: UPDATE_TODOS, target: todo, payload: data });
      await apiFetch("/tasks/" + todo._id, {
        method: "patch",
        body: JSON.stringify({ name: data }),
      });
    }, []),
    createTodos: async function (data) {
      dispatch({ type: FETCH_TODOS_REQUEST });
      const todo = await apiFetch("/tasks", {
        method: "post",
        body: JSON.stringify({ name: data }),
      });
      dispatch({ type: ADD_TODOS, payload: todo });
    },
    changeAddValue: (value) => {
      dispatch({ type: CHANGE_ADDVALUE, payload: value });
    },
  };
}
