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

  /**
   * @param {number} pageNumber Number of page
   * @return {Object}
   */
  
  fetchPosts: (pageNumber) => {
    return {
      type: types.FETCH_POSTS,
      payload: pageNumber,
    };
  },

  /**
   * @param {number} pageNumber Number of page
   * @return {Object}
   */
  
  setCurrentPage: (pageNumber) => {
    return {
      type: types.SET_CURRENT_PAGE,
      payload: pageNumber,
    };
  },

  /**
   * Fill posts to store
   * @param {Array{}} posts
   * @return {Object}
   */
  
  fillPosts: (posts) => {
    return {
      type: types.FILL_POSTS,
      payload: posts,
    };
  },

  /**
   * Fill users to store
   * @param {Array{}} users
   * @return {Object}
   */

  fillUsers: (users) => {
    return {
      type: types.FILL_USERS,
      payload: users,
    };
  },

  /**
   * @param {Error} error
   * @param {string | null} meta
   * @return {Object}
   */

  emitErrorPosts: (error, meta = null) => {
    return {
      type: types.EMIT_ERROR_POSTS,
      payload: error,
      error: true,
      meta,
    };
  },

  /**
   * @param {number} id Identifier of the post
   * @return {Object}
   */

  likePostWorker: (id) => {
    return {
      type: types.LIKE_POST_WORKER,
      payload: { id },
    };
  },

  /**
   * @param {number} id Identifier of the post
   * @param {number} likes Count of likes
   * @return {Object}
   */

  likePost: (id, likes) => {
    return {
      type: types.LIKE_POST,
      payload: { id, likes },
    };
  },

  /**
   * @param {number} id Identifier of the post
   * @return {Object}
   */

  unlikePostWorker: (id) => {
    return {
      type: types.UNLIKE_POST_WORKER,
      payload: { id },
    };
  },

  /**
   * @param {number} id Identifier of the post
   * @param {number} likes Count of likes
   * @return {Object}
   */

  unlikePost: (id, likes) => {
    return {
      type: types.UNLIKE_POST,
      payload: { id, likes },
    };
  },
};
