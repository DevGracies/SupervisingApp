import { ADD_NOTE, DELETE_NOTE, UPDATE_NOTE } from "../constants";

const intialState = {
  todos: [],
};
const todoReducer = (state = intialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        todos: [
          ...state.todos,
          { value: action.payload.value, id: Date.now() },
        ],
      };
    case DELETE_NOTE:
      return {
        ...state,
        todos: state.todos.filter((todos) => todos.id !== action.payload.id),
      };
    case UPDATE_NOTE:
      return {
        ...state,
        todos: state.todos.map((todos) =>
          todos.id === action.payload.id
            ? { ...todos, value: action.payload.newValue }
            : todos
        ),
      };

    default:
      return state;
  }
};

export default todoReducer;
