import axios from "axios";

import {
  GET_BLOGS_SUCCESS,
  GET_BLOGS_REQUEST,
  GET_BLOGS_FAILED,
  WRITE_BLOG_FAILED,
  WRITE_BLOG_REQUEST,
  WRITE_BLOG_SUCCESS,
} from "./types";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PROXY_URL = process.env.REACT_APP_API_PROXY_URL;

export const getAllBlogs = () => {
  return async (dispatch) => {
    dispatch({ type: GET_BLOGS_REQUEST });
    try {
      const response = await axios.get(
        PROXY_URL + `${BASE_URL}/api/blog/blogs`
      );
      if (response) {
        return dispatch({
          type: GET_BLOGS_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      return dispatch({ type: GET_BLOGS_FAILED, payload: error.message });
    }
  };
};

export const writeBlog = (blog) => {
  return async (dispatch) => {
    dispatch({ type: WRITE_BLOG_REQUEST });
    try {
      const response = await axios.post(
        PROXY_URL + `${BASE_URL}/api/blog/write-blog`,
        blog
      );
      if (response) {
        return dispatch({
          type: WRITE_BLOG_SUCCESS,
          payload: { data: response.data.data, status: response.status },
        });
      }
    } catch (error) {
      return dispatch({ type: WRITE_BLOG_FAILED, payload: error.message });
    }
  };
};
