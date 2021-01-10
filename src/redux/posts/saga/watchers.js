// Core
import { takeEvery, all, call } from "redux-saga/effects";

// Types
import { types } from "../types";

// Workers
import {
    fetchPosts,
    likePostWorker,
    unlikePostWorker
} from "./workers";

function* watchFetchPosts () {
    yield takeEvery(types.FETCH_POSTS, fetchPosts);
}

function* watchLikePost () {
    yield takeEvery(types.LIKE_POST_WORKER, likePostWorker);
}

function* watchUnlikePost () {
    yield takeEvery(types.UNLIKE_POST_WORKER, unlikePostWorker);
}

export function* watchPosts () {
    yield all([
        call(watchFetchPosts),
        call(watchLikePost),
        call(watchUnlikePost)
    ]);
}
