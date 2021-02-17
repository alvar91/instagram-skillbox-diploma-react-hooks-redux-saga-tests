// Core
import React from "react";
import { configure, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import FollowSuggestions from "./FollowSuggestions";
import { mockUsers } from "../../mock/mockUsers";

// Instruments
import { Provider } from "react-redux";
import { mockReduxStore } from "../../mock/mockReduxStore";

configure({ adapter: new Adapter() });

/**
 * Setup function for LikeButton component
 * @param {object} storeOptionsObj contains options for creating the mock store
 * @returns {ReactRenderer}
 */
const setupTestRenderer = (storeOptionsObj) => {
  const mockStore = mockReduxStore(storeOptionsObj);
  return mount(
    <Provider store={mockStore}>
      <FollowSuggestions hideHeader />
    </Provider>
  );
};

describe("FollowSuggestions", () => {
  describe("FollowSuggestions with mock post state", () => {
    let testRenderer;
    let component;
    const props = { hideHeader: true };

    beforeAll(() => {
      const storeOptionsObj = {
        postsObj: {
          posts: [],
          currentPage: 1,
          isFetchingPost: false,
          hasErrorPosts: false,
          errorMessagePosts: "",
        },
        usersObj: {
          users: mockUsers,
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
      component = testRenderer.find(FollowSuggestions);
    });

    it("FollowSuggestions should correctly renders markup", () => {
      expect(shallowToJson(testRenderer)).toMatchSnapshot();
    });

    it("FollowSuggestions should contain correct props", () => {
      expect(component).toHaveLength(1);
      expect(component.props()).toMatchObject(props);
    });
  });
});
