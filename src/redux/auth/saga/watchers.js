// Core
import { takeEvery, all, call } from "redux-saga/effects";

// Types
import { types } from "../types";

// Workers
import { authenticate } from "./workers";

function* watchAuthenticate() {
  yield takeEvery(types.AUTHENTICATE, authenticate);
}

export function* watchAuth() {
  yield all([call(watchAuthenticate)]);
}
