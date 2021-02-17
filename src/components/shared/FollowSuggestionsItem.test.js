// Core
import React from "react";
import { configure, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import FollowSuggestionsItem from "./FollowSuggestionsItem";
import { mockProfile } from "../../mock/mockProfile";

configure({ adapter: new Adapter() });

/**
 * Setup function for FollowSuggestionsItems component
 * @param {object} storeOptionsObj contains options for creating the mock store
 * @returns {ReactRenderer}
 */
const setupTestRenderer = () => {
  return mount(<FollowSuggestionsItem user={mockProfile} />);
};

describe("FollowSuggestionsItem", () => {
  describe("FollowSuggestionsItem with mock post state", () => {
    let testRenderer;
    let component;
    const props = { user: mockProfile };

    beforeAll(() => {
      testRenderer = setupTestRenderer();
      component = testRenderer.find(FollowSuggestionsItem);
    });

    it("FollowSuggestionsItem should correctly renders markup", () => {
      expect(shallowToJson(testRenderer)).toMatchSnapshot();
    });

    it("FollowSuggestionsItem should contain correct props", () => {
      expect(component).toHaveLength(1);
      expect(component.props()).toMatchObject(props);
    });
  });
});
