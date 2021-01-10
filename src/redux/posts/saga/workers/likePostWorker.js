// Core
import { put, apply } from "redux-saga/effects";

// Instruments
import { api } from "../../../../REST";
import { postsActions } from "../../actions";

export function* likePostWorker({payload: {id}}) {
    try {
        yield put(postsActions.startFetchingPosts());
        const response = yield apply(api, api.posts.like, [id]);
        const responseLike = yield apply(response, response.json)

        if (!response.ok) {
            const { errors } = responseLike;
            throw new Error(errors);
        }

        const likes = responseLike.photo.likes;

        yield put(postsActions.likePost(id, likes));
    } catch (error) {
        yield put(postsActions.emitErrorPosts(error, "likePost worker"));
    } finally {
        yield put(postsActions.stopFetchingPosts());
    }
}
