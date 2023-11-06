import { combineReducers } from "redux";
import {
  DeleteDiaryReducer,
  DeleteUserReducer,
  GetUserReducer,
  GetUsersReducer,
  buyCake,
  createDiaryReducer,
  createUserReducer,
  getAllDiaryReducers,
  getDiaryReducer,
  updateDiaryReducer,
} from "./reducers";
import todoReducer from "./reducers/jornal";

export const reducers = combineReducers({
  cakes: buyCake,
  createUser: createUserReducer,
  getUser: GetUserReducer,
  getUsers: GetUsersReducer,
  todos: todoReducer,
  deleteUser: DeleteUserReducer,
  getDiary: getDiaryReducer,
  updateDiary: updateDiaryReducer,
  getDiaries: getAllDiaryReducers,
  deleteDiary: DeleteDiaryReducer,
  createDiary: createDiaryReducer,
});
