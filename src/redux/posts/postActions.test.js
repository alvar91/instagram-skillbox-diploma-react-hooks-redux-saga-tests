import { postsActions } from "./actions";
import { types } from "./types";
import { mockPageNumber } from "../../mock/mockPageNumber";
import { mockPosts } from "../../mock/mockPosts";
import { mockUsers } from "../../mock/mockUsers";
import {
  mockFetchPostsErrorMessage,
  mockErrorMeta,
} from "../../mock/mockErrorMessages";
import { mockId, mockCountLikes } from "../../mock/mockLikes";

describe("postsActions", () => {
  it("startFetchingPosts should return correct action", () => {
    const expectedAction = {
      type: types.START_FETCHING_POSTS,
    };
    expect(postsActions.startFetchingPosts()).toEqual(expectedAction);
  });
  it("stopFetchingPosts should return correct action", () => {
    const expectedAction = {
      type: types.STOP_FETCHING_POSTS,
    };
    expect(postsActions.stopFetchingPosts()).toEqual(expectedAction);
  });
  it("fetchPosts should return correct action", () => {
    const mockPageNumber = 1;
    const expectedAction = {
      type: types.FETCH_POSTS,
      payload: mockPageNumber,
    };
    expect(postsActions.fetchPosts(mockPageNumber)).toEqual(expectedAction);
  });
  it("setCurrentPage should return correct action", () => {
    const expectedAction = {
      type: types.SET_CURRENT_PAGE,
      payload: mockPageNumber,
    };
    expect(postsActions.setCurrentPage(mockPageNumber)).toEqual(expectedAction);
  });
  it("fillPosts should return correct action", () => {
    const expectedAction = {
      type: types.FILL_POSTS,
      payload: mockPosts,
    };
    expect(postsActions.fillPosts(mockPosts)).toEqual(expectedAction);
  });
  it("fillUsers should return correct action", () => {
    const expectedAction = {
      type: types.FILL_USERS,
      payload: mockUsers,
    };
    expect(postsActions.fillUsers(mockUsers)).toEqual(expectedAction);
  });
  it("emitErrorPosts should return correct action", () => {
    const expectedAction = {
      type: types.EMIT_ERROR_POSTS,
      payload: mockFetchPostsErrorMessage,
      error: true,
      meta: mockErrorMeta,
    };
    expect(
      postsActions.emitErrorPosts(mockFetchPostsErrorMessage, mockErrorMeta)
    ).toEqual(expectedAction);
  });
  it("likePostWorker should return correct action", () => {
    const expectedAction = {
      type: types.LIKE_POST_WORKER,
      payload: { id: mockId },
    };
    expect(postsActions.likePostWorker(mockId)).toEqual(expectedAction);
  });
  it("likePost should return correct action", () => {
    const expectedAction = {
      type: types.LIKE_POST,
      payload: { id: mockId, likes: mockCountLikes },
    };
    expect(postsActions.likePost(mockId, mockCountLikes)).toEqual(
      expectedAction
    );
  });

  it("unlikePostWorker should return correct action", () => {
    const expectedAction = {
      type: types.UNLIKE_POST_WORKER,
      payload: { id: mockId },
    };
    expect(postsActions.unlikePostWorker(mockId)).toEqual(expectedAction);
  });
  it("unlikePost should return correct action", () => {
    const expectedAction = {
      type: types.UNLIKE_POST,
      payload: { id: mockId, likes: mockCountLikes },
    };
    expect(postsActions.unlikePost(mockId, mockCountLikes)).toEqual(
      expectedAction
    );
  });
});
