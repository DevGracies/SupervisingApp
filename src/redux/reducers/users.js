import {
  CREATE_USER_ERROR,
  CREATE_USER_REQUEST,
  CREATE_USER_RESET,
  CREATE_USER_SUCCESS,
  DELETE_USER_ERROR,
  DELETE_USER_REQUEST,
  GET_USERS_ERROR,
  GET_USERS_REQUEST,
  GET_USERS_RESET,
  GET_USERS_SUCCESS,
  DELETE_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_RESET,
  GET_USER_ERROR,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_RESET,
  LOGIN_USER_ERROR,
} from "../constants";

export const createUserReducer = (
  state = { user: null, loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        user: action.payload,
      };
    case CREATE_USER_RESET:
      return {
        loading: false,
        success: false,
        user: null,
        error: null,
      };
    case CREATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo "))
  : null;
export const LoginUserReducer = (
  state = {
    user: userInfoFromStorage,
    loading: false,
    success: false,
    errors: null,
  },
  action
) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload,
      };
    case LOGIN_USER_RESET:
      return {
        loading: false,
        success: false,
        user: null,
        errors: null,
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export const GetUsersReducer = (
  state = {
    users: [],
    loading: false,
    success: false,
    errors: null,
  },
  action
) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        users: action.payload,
      };
    case GET_USERS_RESET:
      return {
        loading: false,
        success: false,
        users: null,
        errors: null,
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export const GetUserReducer = (
  state = {
    user: null,
    loading: false,
    success: false,
    errors: null,
  },
  action
) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_SUCCESS:
      const { email, password } = action.payload;
      console.log(email, password, "checkemail");
      const user = action.payload.data.find(
        (user) => user.email === email && user.password === password
      );
      if (!user) {
        console.log("credential incorrecte");
      }
      console.log(user);
      return {
        ...state,
        loading: false,
        success: true,
        user: user ? user : null,
      };
    case GET_USER_RESET:
      return {
        loading: false,
        success: false,
        user: null,
        errors: null,
      };
    case GET_USER_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};
export const DeleteUserReducer = (
  state = { user: null, loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        user: action.payload,
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
// reducers.js

const initialState = {
  users: [], // initial state loaded from db.json
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DIARYENTRY":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.userId
            ? { ...user, diaries: [...user.diaries, action.payload.diaryEntry] }
            : user
        ),
      };
    // other cases for different actions
    default:
      return state;
  }
};

// export default rootReducer;
// DiaryEntryForm.js
//
// import { useDispatch } from 'react-redux';
// import { addDiaryEntry } from './actions';
//
// const DiaryEntryForm = ({ userId }) => {
// const dispatch = useDispatch();
//
// const handleAddDiaryEntry = (diaryEntry) => {
// dispatch(addDiaryEntry(userId, diaryEntry));
// };
//
// ... your component code
//
// return (
//  ... your form UI with a button or submit event that triggers handleAddDiaryEntry
// );
// };
//
// export default DiaryEntryForm;
//
// git add Backend
// git commit -m "Commit message for Backend changes"
// git add Frontend
// git commit -m "Commit message for Frontend changes"
