// Core
import { put, apply } from "redux-saga/effects";

// Instruments
import { api } from "../../../../REST";
import { postsActions } from "../../actions";

export function* unlikePostWorker({payload: {id}}) {
    try {
        yield put(postsActions.startFetchingPosts());
        const response = yield apply(api, api.posts.unlike, [id]);
        const responseUnlike = yield apply(response, response.json)

        if (!response.ok) {
            const { errors } = responseUnlike;
            throw new Error(errors);
        }

        const likes = responseUnlike.photo.likes;

        yield put(postsActions.unlikePost(id, likes));
    } catch (error) {
        yield put(postsActions.emitErrorPosts(error, "unlikePost worker"));
    } finally {
        yield put(postsActions.stopFetchingPosts());
    }
}
