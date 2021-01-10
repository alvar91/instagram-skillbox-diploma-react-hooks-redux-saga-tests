import { types } from "./types";
import removeDuplicatesById from "../../utils/removeDuplicatesById";

const initialState = {
  isFetchingPost: false,
  currentPage: 1,
  posts: [],
  users: [],
  hasError: false,
  errorMessage: "",
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.START_FETCHING_POSTS:
      return { ...state, isFetchingPost: true };

    case types.STOP_FETCHING_POSTS:
      return { ...state, isFetchingPost: false };

    case types.FILL_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...removeDuplicatesById(state.posts, action.payload)],
      };
      
    case types.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case types.FILL_USERS:
      return {
        ...state,
        users: [...state.users, ...removeDuplicatesById(state.posts, action.payload)],
      };

    case types.LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.payload.id) {
            post.likes = action.payload.likes;
            post.liked_by_user = true;
          }
          return post;
        }),
      };

    case types.UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.payload.id) {
            post.likes = action.payload.likes;
            post.liked_by_user = false;
          }
          return post;
        }),
      };

    case types.EMIT_ERROR_POSTS:
      return {
        ...state,
        hasError: action.error,
        errorMessage: action.payload.message,
      };

    default:
      return state;
  }
};
