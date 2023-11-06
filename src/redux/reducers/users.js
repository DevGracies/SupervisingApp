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

export const GetUsersReducer = (
  state = {
    users: [],
    loadings: false,
    success: false,
    errors: null,
  },
  action
) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        loadings: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loadings: false,
        success: true,
        users: action.payload,
      };
    case GET_USERS_RESET:
      return {
        loadings: false,
        success: false,
        users: null,
        errors: null,
      };
    case GET_USERS_ERROR:
      return {
        ...state,
        loadings: false,
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
    loadings: false,
    success: false,
    errors: null,
  },
  action
) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        loadings: true,
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
        loadings: false,
        success: true,
        user: user ? user : null,
      };
    case GET_USER_RESET:
      return {
        loadings: false,
        success: false,
        users: null,
        errors: null,
      };
    case GET_USER_ERROR:
      return {
        ...state,
        loadings: false,
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
