import { toast } from "react-toastify";
import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  GET_USER_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  DIARYENTRY,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_RESET,
} from "../constants";

import axios from "axios";
const backend_base_url = "http://localhost:9000";

export const createUserAction = (posts) => async (dispatch, state) => {
  const {
    LoggedInUser: { user },
  } = state();
  console.log(user, "this is from the state");
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${user.token}`,
    },
  };
  try {
    console.log(dispatch, "dispatch");
    dispatch({
      type: CREATE_USER_REQUEST,
    });

    // throw new Error("An error occured")
    //make a call
    const { data } = await axios.post(
      `${backend_base_url}/users`,
      {
        posts,
      },
      config
    );
    console.log(data, "data");
    //if we get here, then request is a sucess case
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: data.payload,
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
      type: CREATE_USER_ERROR,
      payload: message,
    });
  }
};

export const loginUserAction = (email, password) => async (dispatch, state) => {
  const {
    LoggedInUser: { user },
  } = state();
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${user.token}`,
    },
  };
  try {
    console.log(dispatch, "dispatch");
    dispatch({
      type: LOGIN_USER_REQUEST,
    });

    // throw new Error("An error occured")
    //make a call
    const { data } = await axios.post(
      `${backend_base_url}/users/login`,
      {
        email: email,
        password: password,
      },
      config
    );
    //if we get here, then request is a sucess case
    const userInfo = { ...data.payload, token: data.token };
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: userInfo,
    });
    //persist user login detail in local storage

    localStorage.setItem("userinfo", JSON.stringify(userInfo));
  } catch (error) {
    const message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(message, "error");
    dispatch({
      type: LOGIN_USER_ERROR,
      payload: message,
    });
  }
};

export const logout = () => async (dispatch, state) => {
  console.log("logged out");
  dispatch({ type: LOGIN_USER_RESET });
  localStorage.setItem("userinfo", null);
  toast.success("Logged out");
};

export const getUserAction =
  (lastName, firstName, phoneNumber, email, password) =>
  async (dispatch, state) => {
    const {
      LoggedInUser: { user },
    } = state();
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
    };
    try {
      dispatch({
        type: GET_USER_REQUEST,
      });
      const { data } = await axios.get(`${backend_base_url}/users`, config);
      dispatch({
        type: GET_USER_SUCCESS,
        payload: { email, password, lastName, firstName, phoneNumber, data },
      });
      console.log(data, "gua request completed");

      return { email, password, lastName, firstName, phoneNumber, data };
    } catch (error) {
      const message =
        error.response && error.response.data.errors
          ? error.response.data.errors.join(",")
          : error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      console.log(message, "error");
      dispatch({
        type: GET_USER_ERROR,
        payload: message,
      });
    }
  };
export const getUsersAction =
  (email, password, lastName, firstName, phoneNumber, id) =>
  async (dispatch, state) => {
    const {
      LoggedInUser: { user },
    } = state();
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
    };
    try {
      dispatch({
        type: GET_USERS_REQUEST,
      });
      const { data } = await axios.get(`${backend_base_url}/users`, config);
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: { email, password, lastName, firstName, phoneNumber, data },
      });
      console.log(data, "gua request complete");

      return { email, password, lastName, firstName, phoneNumber, data };
    } catch (error) {
      const message =
        error.response && error.response.data.errors
          ? error.response.data.errors.join(",")
          : error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      console.log(message, "error");
      dispatch({
        type: GET_USERS_ERROR,
        payload: message,
      });
    }
  };

export const deleteUserAction = (id) => async (dispatch, state) => {
  const {
    LoggedInUser: { user },
  } = state();
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${user.token}`,
    },
  };
  try {
    console.log(dispatch, "dispatch");
    dispatch({
      type: DELETE_USER_REQUEST,
    });

    // throw new Error("An error occured")
    //make a call
    const { data } = await axios.delete(
      `${backend_base_url}/users/${id}`,
      config
    );
    console.log(data, "data");
    //if we get here, then request is a sucess case
    dispatch({
      type: DELETE_USER_SUCCESS,
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
      type: DELETE_USER_ERROR,
      payload: message,
    });
  }
};

// export const userDaries = (userId, diaryEntry) => async (dispatch, state) => {
// try {
// dispatch({
// type: DIARYENTRY,
// payload: { userId, diaryEntry },
// });
// } catch (error) {
// dispatch({
// type: DIARYENTRY,
// payload: message,
// });
// }
// };
