import { authReducer, initialState } from "./reducer";
import { authActions } from "./actions";
import { mockProfile } from "../../mock/mockProfile";
import { mockAuthErrorMessage } from "../../mock/mockErrorMessages";

describe("authReducer", () => {
  it("should return initialState", () => {
    const action = { type: "DEFAULT" };
    expect(authReducer(undefined, action)).toEqual(initialState);
  });
  it("should store isFetchingAuth=true", () => {
    const action = authActions.startFetchingAuth();
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isFetchingAuth: true,
    });
  });
  it("should store isFetchingAuth=false", () => {
    const action = authActions.stopFetchingAuth();
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isFetchingAuth: false,
    });
  });
  it("should store isLoggedIn=true and profile=mockProfile", () => {
    const action = authActions.fillProfile(mockProfile);
    expect(authReducer(initialState, action)).toEqual({
        ...initialState,
        isLoggedIn: true,
        profile: action.payload,
    });
  });
  it("should store isLoggedIn=false and profile=[]", () => {
    const action = authActions.logout();
    expect(authReducer(initialState, action)).toEqual({
        ...initialState,
        isLoggedIn: false,
        profile: [],
    });
  });
  it("should store hasError=true and errorMessage=mockAuthErrorMessage", () => {
    const action = authActions.emitErrorAuth(mockAuthErrorMessage);
    expect(authReducer(initialState, action)).toEqual({
        ...initialState,
        hasError: action.error,
        errorMessage: action.payload.message,
    });
  });
  it("should store hasError=false and empty errorMessage", () => {
    const action = authActions.clearErrorAuth(mockAuthErrorMessage);
    expect(authReducer(initialState, action)).toEqual({
        ...initialState,
        hasError: false,
        errorMessage: "",
    });
  });
});
