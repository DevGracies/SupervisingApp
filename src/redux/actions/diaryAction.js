import {
  CREATE_DIARY_ERROR,
  CREATE_DIARY_REQUEST,
  CREATE_DIARY_SUCCESS,
  DELETE_DIARY_ERROR,
  DELETE_DIARY_REQUEST,
  DELETE_DIARY_SUCCESS,
  GET_DIARIES_ERROR,
  GET_DIARIES_REQUEST,
  GET_DIARIES_SUCCESS,
  GET_DIARY_ERROR,
  GET_DIARY_REQUEST,
  GET_DIARY_SUCCESS,
  UPDATE_DIARY_ERROR,
  UPDATE_DIARY_REQUEST,
  UPDATE_DIARY_SUCCESS,
} from "../constants";

import axios from "axios";
const backend_base_url = "http://localhost:3004/diary";

export const createDiaryAction = (value) => async (dispatch, state) => {
  const diary = {};
  const config = {
    headers: {
      "Content-Type": "applicaton/json",
      authorization: `Bearer ${diary.token}`,
    },
  };
  try {
    console.log(dispatch, "this is the dispactch diary action");
    dispatch({
      type: CREATE_DIARY_REQUEST,
    });

    console.log(value, "value from action");
    const { data } = await axios.post(backend_base_url, {
      desc: value,
    });
    console.log(data, "the data in the diary");
    dispatch({
      type: CREATE_DIARY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.message, "error");
    dispatch({
      type: CREATE_DIARY_ERROR,
      payload: error.message,
    });
  }
};

export const getDiaryAction = (value) => async (dispatch, state) => {
  const diary = {};
  const config = {
    headers: {
      " Content-Type": "application/json",
      authorization: `Bearer ${diary.token}`,
    },
  };
  try {
    dispatch({
      type: GET_DIARY_REQUEST,
    });
    const { data } = await axios.get(backend_base_url, config);
    dispatch({
      type: GET_DIARY_SUCCESS,
      payload: { data, value },
    });
  } catch (error) {
    dispatch({
      type: GET_DIARY_ERROR,
      payload: error.message,
    });
  }
};

export const getDiariesAction = () => async (dispatch, state) => {
  const diary = {};
  const config = {
    headers: {
      " Content-Type": "application/json",
      authorization: `Bearer ${diary.token}`,
    },
  };
  try {
    dispatch({
      type: GET_DIARIES_REQUEST,
    });
    const { data } = await axios.get(backend_base_url, config);
    dispatch({
      type: GET_DIARIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DIARIES_ERROR,
      payload: error.message,
    });
  }
};

export const updateDiaryAction = (id, newValue) => async (dispatch, state) => {
  // const diary = {};
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     authorization: `Bearer ${diary.token}`,
  //   },
  // };
  dispatch({
    type: UPDATE_DIARY_REQUEST,
  });
  try {
    const { data } = await axios.patch(
      `http://localhost:3004/diary/${id}`
      // config
    );
    dispatch({
      type: UPDATE_DIARY_SUCCESS,
      payload: data,
      newValue,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DIARY_ERROR,
      payload: error.message,
    });
  }
};

export const deleteDiaryAction = (id) => async (dispatch, state) => {
  // const diary = {};
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     authorization: `Bearer ${diary.token}`,
  //   },
  // };
  dispatch({
    type: DELETE_DIARY_REQUEST,
  });
  try {
    const { data } = await axios.delete(
      `http://localhost:3004/diary/${id}`
      // config
    );
    dispatch({
      type: DELETE_DIARY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DIARY_ERROR,
      payload: error.message,
    });
  }
};
