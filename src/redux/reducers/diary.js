import {
  CREATE_DIARY_ERROR,
  CREATE_DIARY_REQUEST,
  CREATE_DIARY_RESET,
  CREATE_DIARY_SUCCESS,
  DELETE_DIARY_ERROR,
  DELETE_DIARY_REQUEST,
  DELETE_DIARY_SUCCESS,
  GET_DIARIES_ERROR,
  GET_DIARIES_REQUEST,
  GET_DIARIES_RESET,
  GET_DIARIES_SUCCESS,
  GET_DIARY_ERROR,
  GET_DIARY_REQUEST,
  GET_DIARY_SUCCESS,
  GET_USERS_RESET,
  UPDATE_DIARY_ERROR,
  UPDATE_DIARY_REQUEST,
  UPDATE_DIARY_RESET,
  UPDATE_DIARY_SUCCESS,
} from "../constants";

export const createDiaryReducer = (
  state = { diary: null, loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case CREATE_DIARY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_DIARY_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        diary: action.payload,
      };
    case CREATE_DIARY_RESET:
      return {
        loading: false,
        success: false,
        error: null,
      };
    case CREATE_DIARY_ERROR:
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

export const updateDiaryReducer = (
  state = { diary: [], loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case UPDATE_DIARY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_DIARY_SUCCESS:
      return {
        success: true,
        ...state,
        diary: state.diary.map((note) =>
          note.id === action.payload.id
            ? { ...note, value: action.payload.newValue }
            : note
        ),
      };
    case UPDATE_DIARY_RESET:
      return {
        loading: false,
        success: false,
        task: null,
        errors: null,
      };
    case UPDATE_DIARY_ERROR:
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

export const getDiaryReducer = (
  state = { diary: [], loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case GET_DIARY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_DIARY_SUCCESS:
      const { desc, time } = action.payload;
      console.log(desc, time);
      return {
        ...state,
        loading: false,
        success: true,
        diary: [
          ...state.diary,
          { value: action.payload.value, id: Date.now() },
        ],
      };
    case GET_DIARY_ERROR:
      return {
        ...state,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllDiaryReducers = (
  state = { diaries: [], loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case GET_DIARIES_REQUEST:
      return {
        ...state,
        loadings: true,
      };
    case GET_DIARIES_SUCCESS:
      return {
        ...state,
        success: true,
        diaries: action.payload,
      };
    case GET_DIARIES_RESET:
      return {
        loadings: false,
        success: false,
        diaries: action.payload,
        errors: null,
      };
    case GET_DIARIES_ERROR:
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
export const DeleteDiaryReducer = (
  state = { diary: [], loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case DELETE_DIARY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DIARY_SUCCESS:
      return {
        ...state,
        success: true,
        diary: state.diary.filter((note) => note.id !== action.payload.id),
      };
    case DELETE_DIARY_ERROR:
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
