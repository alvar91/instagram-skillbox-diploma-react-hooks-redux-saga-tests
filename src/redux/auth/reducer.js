import { types } from "./types";

export const initialState = {
  isFetchingAuth: false,
  isLoggedIn: false,
  profile: [],
  hasError: false,
  errorMessage: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.START_FETCHING_AUTH:
      return { ...state, isFetchingAuth: true };

    case types.STOP_FETCHING_AUTH:
      return { ...state, isFetchingAuth: false };

    case types.FILL_PROFILE:
      return {
        ...state,
        isLoggedIn: true,
        profile: action.payload,
      };

    case types.LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        profile: [],
      };

    case types.EMIT_ERROR_AUTH:
      return {
        ...state,
        hasError: action.error,
        errorMessage: action.payload.message,
      };

    case types.CLEAR_ERROR:
      return {
        ...state,
        hasError: false,
        errorMessage: "",
      };

    default:
      return state;
  }
};
