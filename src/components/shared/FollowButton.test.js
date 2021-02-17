// Core
import React from "react";
import { configure, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import FollowButton from "./FollowButton";
import { mockProfile } from "../../mock/mockProfile";

configure({ adapter: new Adapter() });

/**
 * Setup function for FollowButton component
 * @param {object} storeOptionsObj contains options for creating the mock store
 * @returns {ReactRenderer}
 */
const setupTestRenderer = () => {
  return mount(<FollowButton user={mockProfile} side />);
};

describe("FollowButton", () => {
  describe("FollowButton with mock post state", () => {
    let testRenderer;
    let component;
    const props = { user: mockProfile, side: true };

    beforeAll(() => {
      testRenderer = setupTestRenderer();
      component = testRenderer.find(FollowButton);
    });

    it("FollowButton should correctly renders markup", () => {
      expect(shallowToJson(testRenderer)).toMatchSnapshot();
    });

    it("FollowButton should contain correct props", () => {
      expect(component).toHaveLength(1);
      expect(component.props()).toMatchObject(props);
    });
  });
});
