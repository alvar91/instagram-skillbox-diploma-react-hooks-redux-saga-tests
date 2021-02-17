// Core
import React from "react";
import { configure, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import PostModal from "./PostModal";
import { mockPost } from "../../mock/mockPost";
import { mockPosts } from "../../mock/mockPosts";
import { MemoryRouter, Route } from "react-router-dom";

configure({ adapter: new Adapter() });

// Instruments
import { Provider } from "react-redux";
import { mockReduxStore } from "../../mock/mockReduxStore";

/**
 * Setup function for FeedPost component.
 * @param {object} props
 * @returns {ReactRenderer}
 */
const setupTestRenderer = (storeOptionsObj) => {
    const mockStore = mockReduxStore(storeOptionsObj);
  return mount(
    <Provider store={mockStore}>
      <MemoryRouter
        initialEntries={[ { pathname: `/${mockPost.id}`, key: 'testKey' } ]}
      >
        <Route path="/:postId">
          <PostModal />
        </Route>
      </MemoryRouter>
    </Provider>
  );
};

describe("FeedPost", () => {
  let testRenderer;
  let component;

  beforeAll(() => {
    const storeOptionsObj = {
      postsObj: {
        posts: mockPosts,
        currentPage: 1,
        isFetchingPost: false,
        hasErrorPosts: false,
        errorMessagePosts: "",
      },
      usersObj: {
        users: [],
      },
      authObj: {
        isFetchingAuth: false,
        isLoggedIn: false,
        profile: [],
        hasErrorAuth: false,
        errorMessageAuth: "",
      },
    };
    testRenderer = setupTestRenderer(storeOptionsObj);
    component = testRenderer.find(PostModal);
  });

  it("FeedPost should correctly renders markup", () => {
    expect(shallowToJson(testRenderer)).toMatchSnapshot();
  });
});
