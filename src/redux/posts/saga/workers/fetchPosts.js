// Core
import { put, apply } from "redux-saga/effects";

// Instruments
import { api } from "../../../../REST";
import { postsActions } from "../../actions";

export function* fetchPosts({ payload: pageNumber = 1 }) {
  try {
    yield put(postsActions.startFetchingPosts());

    const response = yield apply(api, api.posts.fetch, [pageNumber]);
    const posts = yield apply(response, response.json);

    if (!response.ok) {
      const { errors } = posts;
      const message = errors
        ? errors
        : "Failed to fetch posts. Please, try again later";
      throw new Error(message);
    }

    yield put(postsActions.fillPosts(posts));

    const users = posts.map((post) => post.user);
    yield put(postsActions.fillUsers(users));
    yield put(postsActions.setCurrentPage(pageNumber));
  } catch (error) {
    yield put(postsActions.emitErrorPosts(error, "fetch posts worker"));
  } finally {
    yield put(postsActions.stopFetchingPosts());
  }
}
