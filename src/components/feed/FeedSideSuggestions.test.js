// Core
import React from "react";
import { configure, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import FeedSideSuggestions from "./FeedSideSuggestions";
import { mockUsers } from "../../mock/mockUsers";

// Instruments
import { Provider } from "react-redux";
import { mockReduxStore } from "../../mock/mockReduxStore";

configure({ adapter: new Adapter() });

/**
 * Setup function for FeedSideSuggestions component
 * @param {object} storeOptionsObj contains options for creating the mock store
 * @returns {ReactRenderer}
 */
const setupTestRenderer = (storeOptionsObj) => {
  const mockStore = mockReduxStore(storeOptionsObj);

  return mount(
    <Provider store={mockStore}>
      <FeedSideSuggestions />
    </Provider>
  );
};

describe("FeedSideSuggestions", () => {
  describe("FeedSideSuggestions with initial state", () => {
    let testRenderer;

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
    });

    it("FeedSideSuggestions should correctly renders markup", () => {
      expect(shallowToJson(testRenderer)).toMatchSnapshot();
    });
  });

  describe("FeedSideSuggestions with fetching posts state", () => {
    let testRenderer;

    beforeAll(() => {
      const storeOptionsObj = {
        postsObj: {
          posts: [],
          currentPage: 1,
          isFetchingPost: true,
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
    });

    it("FeedSideSuggestions should correctly renders markup with fetching posts state", () => {
      expect(shallowToJson(testRenderer)).toMatchSnapshot();
    });

    describe("FeedSideSuggestions with mock users state", () => {
      let testRenderer;
      let component;

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
        component = testRenderer.find(FeedSideSuggestions);
      });

      it("FeedSideSuggestions should correctly renders markup mock users state", () => {
        expect(shallowToJson(testRenderer)).toMatchSnapshot();
      });
      it("FeedSideSuggestions should have 6 users", () => {
        expect(component.find("Memo(UserCard)").length).toBe(6);
      });
    });
  });
});
