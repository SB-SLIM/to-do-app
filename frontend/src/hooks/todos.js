import { useCallback, useReducer } from "react";
import { apiFetch } from "../api/apiFeach";

export const FETCH_TODOS_REQUEST = "FETCH_TODOS_REQUEST";
export const FETCH_TODOS_RESPONSE = "FETCH_TODOS_RESPONSE";
export const DELETE_TODOS = "DELETE_TODOS";
export const ADD_TODOS = "ADD_TODOS";
export const UPDATE_TODOS = "UPDATE_TODOS";

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
      return { ...state, todos: [...state.todos, action.payload] };
    case UPDATE_TODOS:
      return {
        ...state,
        todos: state.todos.map((i) =>
          i === action.target ? { ...i, ...action.payload } : i
        ),
      };
    default:
      break;
  }
}
export function useTodos() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    todos: null,
  });

  return {
    loading: state.loading,
    todos: state.todos,
    fetchTodos: useCallback(
      async function () {
        if (state.todos !== null) {
          return null;
        }
        dispatch({ type: FETCH_TODOS_REQUEST });
        const data = await apiFetch("/tasks");
        console.log(data.tasks);
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
      console.log("update data: " + data);
      await apiFetch("/tasks/" + todo._id, {
        method: "put",
        body: data,
      });
    }, []),
    createTodos: async function (data) {
      console.log("hook data" + data);
      const todo = await apiFetch("/tasks", {
        method: "post",
        body: data,
      });
      dispatch({ type: ADD_TODOS, payload: todo });
    },
  };
}
