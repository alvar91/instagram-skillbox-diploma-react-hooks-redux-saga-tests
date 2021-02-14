import { postsReducer, initialState } from "./reducer";
import { postsActions } from "./actions";
import { mockPosts } from "../../mock/mockPosts";
import { mockPageNumber } from "../../mock/mockPageNumber";
import { mockUsers } from "../../mock/mockUsers";
import { mockId, mockCountLikes } from "../../mock/mockLikes";
import { mockFetchPostsErrorMessage } from "../../mock/mockErrorMessages";

describe("authReducer", () => {
  it("should return initialState", () => {
    const action = { type: "DEFAULT" };
    expect(postsReducer(undefined, action)).toEqual(initialState);
  });
  it("should store isFetchingPost=true", () => {
    const action = postsActions.startFetchingPosts();
    expect(postsReducer(initialState, action)).toEqual({
      ...initialState,
      isFetchingPost: true,
    });
  });
  it("should store isFetchingPost=false", () => {
    const action = postsActions.stopFetchingPosts();
    expect(postsReducer(initialState, action)).toEqual({
      ...initialState,
      isFetchingPost: false,
    });
  });
  it("should store fetched posts", () => {
    const action = postsActions.fillPosts(mockPosts);
    expect(postsReducer(initialState, action)).toEqual({
      ...initialState,
      posts: [...initialState.posts, ...action.payload],
    });
  });
  it("should store setted current page", () => {
    const action = postsActions.setCurrentPage(mockPageNumber);
    expect(postsReducer(initialState, action)).toEqual({
      ...initialState,
      currentPage: action.payload,
    });
  });
  it("should store fetched users", () => {
    const action = postsActions.fillUsers(mockUsers);
    expect(postsReducer(initialState, action)).toEqual({
      ...initialState,
      users: [...initialState.users, ...action.payload],
    });
  });
  it("should store count of likes and post liked by user to true", () => {
    const action = postsActions.likePost(mockId, mockCountLikes);
    expect(postsReducer(initialState, action)).toEqual({
      ...initialState,
      posts: initialState.posts.map((post) => {
        if (post.id === action.payload.id) {
          post.likes = action.payload.likes;
          post.liked_by_user = true;
        }
        return post;
      }),
    });
  });
  it("should store count of likes and post liked by user to false", () => {
    const action = postsActions.unlikePost(mockId, mockCountLikes);
    expect(postsReducer(initialState, action)).toEqual({
      ...initialState,
      posts: initialState.posts.map((post) => {
        if (post.id === action.payload.id) {
          post.likes = action.payload.likes;
          post.liked_by_user = true;
        }
        return post;
      }),
    });
  });
  it("should store hasError=true and mockFetchPostsErrorMessage", () => {
    const action = postsActions.emitErrorPosts(mockFetchPostsErrorMessage);
    expect(postsReducer(initialState, action)).toEqual({
      ...initialState,
      hasError: action.error,
      errorMessage: action.payload.message,
    });
  });
});
