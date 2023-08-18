import {
  GET_BLOGS_SUCCESS,
  GET_BLOGS_REQUEST,
  GET_BLOGS_FAILED,
  WRITE_BLOG_REQUEST,
  WRITE_BLOG_SUCCESS,
  WRITE_BLOG_FAILED,
} from "../actions/types";

const initialState = {
  allBlogs: [],
  error: "",
  loading: false,
  newlyAddedBlog: [],
};

export const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        allBlogs: [...action.payload.data],
      };
    case GET_BLOGS_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case WRITE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WRITE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        newlyAddedBlog: action.payload.data,
      };
    case WRITE_BLOG_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
