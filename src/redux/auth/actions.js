// Types
import { types } from "./types";

export const authActions = {
  authenticate: (token) => {
    return {
      type: types.AUTHENTICATE,
      payload: token,
    };
  },

  startFetchingAuth: () => {
    return {
      type: types.START_FETCHING_AUTH,
    };
  },

  stopFetchingAuth: () => {
    return {
      type: types.STOP_FETCHING_AUTH,
    };
  },
  fillProfile: (profile) => {
    return {
      type: types.FILL_PROFILE,
      payload: profile,
    };
  },
  logout: () => {
    return {
      type: types.LOG_OUT,
    };
  },
  emitErrorAuth: (error, meta = null) => {
    return {
      type: types.EMIT_ERROR_AUTH,
      payload: error,
      error: true,
      meta,
    };
  },
  clearErrorAuth: () => {
    return {
      type: types.CLEAR_ERROR,
    };
  },
};
