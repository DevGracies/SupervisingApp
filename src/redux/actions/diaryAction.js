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
const backend_base_url = "http://localhost:9000";

export const createDiaryAction = (value) => async (dispatch, state) => {
  // value is an object
  // 1. before the api call
  // 2. after the api call success
  // 3. after the api call failure

  const user = state();
  console.log(user, "user");
  const config = {
    headers: {
      "Content-Type": "applicaton/json",
      authorization: `Bearer ${user.token}`,
    },
  };
  try {
    console.log(dispatch, "this is the dispactch diary action");
    //1.
    dispatch({
      type: CREATE_DIARY_REQUEST,
    });
    const time = new Date();
    console.log(value, "value from action");
    const dateDay = [time.getDate(), time.getDay(), time.getFullYear()].join(
      "/"
    );
    const dateTime = `${time.getHours()}:${time.getMinutes()}: ${time.getSeconds()}`;
    //2.
    const { data } = await axios.post(
      `${backend_base_url}/task`,
      {
        desc: value,
        time: dateTime,
        date: dateDay,
      },
      config
    );
    console.log(data, "the data in the diary");
    dispatch({
      type: CREATE_DIARY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(message, "error");
    dispatch({
      type: CREATE_DIARY_ERROR,
      payload: message,
    });
  }
};

export const getDiaryAction = (value) => async (dispatch, state) => {
  const user = state();
  console.log(user, "user");
  const config = {
    headers: {
      "Content-Type": "applicaton/json",
      authorization: `Bearer ${user.token}`,
    },
  };
  try {
    dispatch({
      type: GET_DIARY_REQUEST,
    });
    const { data } = await axios.get(`${backend_base_url}/task`, config);
    dispatch({
      type: GET_DIARY_SUCCESS,
      payload: { data, value },
    });
  } catch (error) {
    const message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(message, "error");
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
    const { data } = await axios.get(`${backend_base_url}/task`, config);
    dispatch({
      type: GET_DIARIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(message, "error");
    dispatch({
      type: GET_DIARIES_ERROR,
      payload: message,
    });
  }
};

export const updateDiaryAction = (id, newValue) => async (dispatch, state) => {
  const user = state();
  console.log(user, "user");
  const config = {
    headers: {
      "Content-Type": "applicaton/json",
      authorization: `Bearer ${user.token}`,
    },
  };
  dispatch({
    type: UPDATE_DIARY_REQUEST,
  });
  try {
    const { data } = await axios.patch(`${backend_base_url}/task${id}`, config);
    console.log(data, newValue);
    dispatch({
      type: UPDATE_DIARY_SUCCESS,
      payload: { data, newValue },
    });
  } catch (error) {
    const message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(message, "error");
    dispatch({
      type: UPDATE_DIARY_ERROR,
      payload: message,
    });
  }
};

export const deleteDiaryAction = (id) => async (dispatch, state) => {
  const user = state();
  console.log(user, "user");
  const config = {
    headers: {
      "Content-Type": "applicaton/json",
      authorization: `Bearer ${user.token}`,
    },
  };
  dispatch({
    type: DELETE_DIARY_REQUEST,
  });
  try {
    const { data } = await axios.delete(
      `${backend_base_url}/task/${id}`,
      config
    );
    dispatch({
      type: DELETE_DIARY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(message, "error");
    dispatch({
      type: DELETE_DIARY_ERROR,
      payload: message,
    });
  }
};
