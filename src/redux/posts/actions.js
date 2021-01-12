import { types } from "./types";

export const postsActions = {
  startFetchingPosts: () => {
    return {
      type: types.START_FETCHING_POSTS,
    };
  },

  stopFetchingPosts: () => {
    return {
      type: types.STOP_FETCHING_POSTS,
    };
  },

  fetchPosts: (pageNumber) => {
    return {
      type: types.FETCH_POSTS,
      payload: pageNumber,
    };
  },

  setCurrentPage: (pageNumber) => {
    return {
      type: types.SET_CURRENT_PAGE,
      payload: pageNumber,
    };
  },

  fillPosts: (posts) => {
    return {
      type: types.FILL_POSTS,
      payload: posts,
    };
  },

  fillUsers: (users) => {
    return {
      type: types.FILL_USERS,
      payload: users,
    };
  },

  emitErrorPosts: (error, meta = null) => {
    return {
      type: types.EMIT_ERROR_POSTS,
      payload: error,
      error: true,
      meta,
    };
  },
  likePostWorker: (id) => {
    return {
      type: types.LIKE_POST_WORKER,
      payload: { id },
    };
  },
  likePost: (id, likes) => {
    return {
      type: types.LIKE_POST,
      payload: { id, likes },
    };
  },
  unlikePostWorker: (id) => {
    return {
      type: types.UNLIKE_POST_WORKER,
      payload: { id },
    };
  },
  unlikePost: (id, likes) => {
    return {
      type: types.UNLIKE_POST,
      payload: { id, likes },
    };
  },
};
