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
} from "../constants";

import axios from "axios";
const backend_base_url = "http://localhost:3004/posts";

export const createUserAction = (posts) => async (dispatch, state) => {
  const user = {};
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
      backend_base_url,
      {
        ...posts,
      },
      config
    );
    console.log(data, "data");
    //if we get here, then request is a sucess case
    dispatch({
      type: CREATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.message, "error");
    dispatch({
      type: CREATE_USER_ERROR,
      payload: error.message,
    });
  }
};

export const getUserAction = (email, password) => async (dispatch, state) => {
  const user = {};
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
    const { data } = await axios.get(backend_base_url, config);
    dispatch({
      type: GET_USER_SUCCESS,
      payload: { email, password, data },
    });
    console.log(data, "gua request completed");

    return { email, password, data };
  } catch (error) {
    console.log(error.message, "error");
    dispatch({
      type: GET_USER_ERROR,
      payload: error.message,
    });
  }
};

export const getUsersAction =
  (email, password, id) => async (dispatch, state) => {
    const user = {};
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
      const { data } = await axios.get(backend_base_url, config);
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: { email, password, data },
      });
      console.log(data, "gua request complete");

      return { email, password, data };
    } catch (error) {
      console.log(error.message, "error");
      dispatch({
        type: GET_USERS_ERROR,
        payload: error.message,
      });
    }
  };

export const deleteUserAction = (id) => async (dispatch) => {
  try {
    console.log(dispatch, "dispatch");
    dispatch({
      type: DELETE_USER_REQUEST,
    });

    // throw new Error("An error occured")
    //make a call
    const { data } = await axios.delete(`http://localhost:3004/posts/${id}`);
    console.log(data, "data");
    //if we get here, then request is a sucess case
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.message, "error");
    dispatch({
      type: DELETE_USER_ERROR,
      payload: error.message,
    });
  }
};
