// Core
import { put, apply } from "redux-saga/effects";

// Instruments
import { api } from "../../../../REST";
import { authActions } from "../../../auth/actions";

export function* authenticate({ payload: token = null }) {
  if (!token) return;
  try {
    yield put(authActions.startFetchingAuth());

    const authResponse = yield apply(api, api.auth.authenticate, [token]);

    const auth = yield apply(authResponse, authResponse.json);

    if (!auth.access_token) {
      const { error_description } = auth;
      const message = error_description
        ? error_description
        : "Failed to get access token. Please try to log in again";
      throw new Error(message);
    }

    yield apply(api, api.auth.setBearerToken, [auth.access_token]);

    const profileResponse = yield apply(api, api.auth.getProfile, [auth]);
    const profile = yield apply(profileResponse, profileResponse.json);

    if (!profile.id) {
      const { error_description } = auth;
      const message = error_description
        ? error_description
        : "Failed to get access to your private profile. Please try to log in again";
      throw new Error(message);
    }
    yield put(authActions.fillProfile(profile));
  } catch (error) {
    yield put(authActions.emitErrorAuth(error, "authenticate worker"));
  } finally {
    yield put(authActions.stopFetchingAuth());
  }
}
