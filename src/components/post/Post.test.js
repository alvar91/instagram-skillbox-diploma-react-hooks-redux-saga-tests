// Core
import React from "react";
import { configure, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Post from "./Post";
import { mockPosts } from "../../mock/mockPosts";
import { mockPost } from "../../mock/mockPost";
import { PostSkeleton } from "./PostSkeleton";

// Instruments
import { Provider } from "react-redux";
import { mockReduxStore } from "../../mock/mockReduxStore";

// Utils
// import { delay } from "../../utils/delay";

configure({ adapter: new Adapter() });

/**
 * Setup function for Post component
 * @param {object} storeOptionsObj contains options for creating the mock store
 * @returns {ReactRenderer}
 */
const setupTestRenderer = (storeOptionsObj) => {
  const mockStore = mockReduxStore(storeOptionsObj);
  return mount(
    <Provider store={mockStore}>
      <Post id={mockPost.id} />
    </Provider>
  );
};

describe("Post", () => {
  describe("Post with mock post state and skeleton", () => {
    let testRenderer;
    let component;
    const props = { id: mockPost.id };

    let setOptionsDialog = jest.fn();

    beforeAll(() => {
      setOptionsDialog.mockClear();
      React.useState = jest.fn(() => [true, setOptionsDialog]);

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
      component = testRenderer.find(Post);
    });

    it("Post should correctly renders markup", () => {
      expect(shallowToJson(testRenderer)).toMatchSnapshot();
    });

    it("Post should contain PostSkeleton", () => {
      expect(component).toHaveLength(1);
      expect(component.find(PostSkeleton)).toHaveLength(1);
    });

    it("Post should contain correct props", () => {
      expect(component).toHaveLength(1);
      expect(component.props()).toMatchObject(props);
    });

    // it("Post should`t contain PostSkeleton", async() => {
    //   await delay(2000)
    //   testRenderer.update();
    //   component = testRenderer.find(Post);
    //   expect(component.find(PostSkeleton)).toHaveLength(0);
    // });

    // it("img should contain correct props", () => {
    //   expect(component).toHaveLength(1);
    //   expect(component.find("img")).toHaveLength(1);
    // });
  });
});
