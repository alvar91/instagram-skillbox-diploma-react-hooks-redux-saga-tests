// Core
import React from "react";
import { configure, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import { ProfileNameSection } from "./profile";
import { mockProfile } from "../mock/mockProfile";

// Instruments
import { Provider } from "react-redux";
import { mockReduxStore } from "../mock/mockReduxStore";

// Utils
// import { delay } from "../../utils/delay";

configure({ adapter: new Adapter() });

const mockHandleClick = jest.fn();
/**
 * Setup function for ProfileNameSection component
 * @param {object} storeOptionsObj contains options for creating the mock store
 * @returns {ReactRenderer}
 */
const setupTestRenderer = (storeOptionsObj) => {
  const mockStore = mockReduxStore(storeOptionsObj);
  return mount(
    <Provider store={mockStore}>
      <ProfileNameSection
        user={mockProfile}
        isOwner={true}
        handleOptionsMenuClick={mockHandleClick}
      />
    </Provider>
  );
};

describe("ProfileNameSection", () => {
  describe("ProfileNameSection with mock user state", () => {
    let testRenderer;
    let component;
    const props = { user: mockProfile, isOwner: true, handleOptionsMenuClick: mockHandleClick };

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
          profile: mockProfile,
          hasErrorAuth: false,
          errorMessageAuth: "",
        },
      };
      testRenderer = setupTestRenderer(storeOptionsObj);
      component = testRenderer.find(ProfileNameSection);
    });

    it("ProfileNameSection should correctly renders markup", () => {
      expect(shallowToJson(testRenderer)).toMatchSnapshot();
    });
   
    it("ProfileNameSection should contain correct props", () => {
      expect(component).toHaveLength(1);
      expect(component.props()).toMatchObject(props);
    });
  });
});
