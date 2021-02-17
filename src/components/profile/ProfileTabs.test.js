// Core
import React from "react";
import { configure, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import ProfileTabs from "./ProfileTabs";
import { mockProfile } from "../../mock/mockProfile";

configure({ adapter: new Adapter() });

/**
 * Setup function for ProfileTabs component
 * @param {object} storeOptionsObj contains options for creating the mock store
 * @returns {ReactRenderer}
 */
const setupTestRenderer = () => {
  return mount(<ProfileTabs user={mockProfile} isOwner />);
};

describe("ProfileTabs", () => {
  describe("ProfileTabs with mock post state", () => {
    let testRenderer;
    let component;
    const props = { user: mockProfile, isOwner: true };

    beforeAll(() => {
      testRenderer = setupTestRenderer();
      component = testRenderer.find(ProfileTabs);
    });

    it("ProfileTabs should correctly renders markup", () => {
      expect(shallowToJson(testRenderer)).toMatchSnapshot();
    });

    it("ProfileTabs should contain correct props", () => {
      expect(component).toHaveLength(1);
      expect(component.props()).toMatchObject(props);
    });
  });
});
