import { ADD_NOTE, DELETE_NOTE, UPDATE_NOTE } from "../constants";

export const addNote = (value) => ({
  type: ADD_NOTE,
  payload: {
    value,
  },
});

export const deleteNote = (id) => ({
  type: DELETE_NOTE,
  payload: {
    id,
  },
});
export const updateNote = (id, newValue) => ({
  type: UPDATE_NOTE,
  payload: {
    id,
    newValue,
  },
});
