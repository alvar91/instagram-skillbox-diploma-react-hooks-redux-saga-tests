import { authActions } from "./actions";
import { types } from "./types";
import { mockToken } from "../../mock/mockToken";
import { mockProfile } from "../../mock/mockProfile";
import {
  mockAuthErrorMessage,
  mockErrorMeta,
} from "../../mock/mockErrorMessages";

describe("authActions", () => {
  it("authenticate should return correct action", () => {
    const expectedAction = {
      type: types.AUTHENTICATE,
      payload: mockToken,
    };
    expect(authActions.authenticate(mockToken)).toEqual(expectedAction);
  });
  it("startFetchingAuth should return correct action", () => {
    const expectedAction = {
      type: types.START_FETCHING_AUTH,
    };
    expect(authActions.startFetchingAuth()).toEqual(expectedAction);
  });
  it("stopFetchingAuth should return correct action", () => {
    const expectedAction = {
      type: types.STOP_FETCHING_AUTH,
    };
    expect(authActions.stopFetchingAuth()).toEqual(expectedAction);
  });
  it("fillProfile should return correct action", () => {
    const expectedAction = {
      type: types.FILL_PROFILE,
      payload: mockProfile,
    };
    expect(authActions.fillProfile(mockProfile)).toEqual(expectedAction);
  });
  it("logout should return correct action", () => {
    const expectedAction = {
      type: types.LOG_OUT,
    };
    expect(authActions.logout()).toEqual(expectedAction);
  });
  it("emitErrorAuth should return correct action", () => {
    const expectedAction = {
      type: types.EMIT_ERROR_AUTH,
      payload: mockAuthErrorMessage,
      error: true,
      meta: mockErrorMeta,
    };
    expect(
      authActions.emitErrorAuth(mockAuthErrorMessage, mockErrorMeta)
    ).toEqual(expectedAction);
  });
  it("clearErrorAuth should return correct action", () => {
    const expectedAction = {
      type: types.CLEAR_ERROR,
    };
    expect(authActions.clearErrorAuth()).toEqual(expectedAction);
  });
});
