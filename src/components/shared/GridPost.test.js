// Core
import React from "react";
import { configure, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import GridPost from "./GridPost";
import { mockPost } from "../../mock/mockPost";

configure({ adapter: new Adapter() });

/**
 * Setup function for GridPost component
 * @param {object} storeOptionsObj contains options for creating the mock store
 * @returns {ReactRenderer}
 */
const setupTestRenderer = () => {
  return mount(<GridPost post={ mockPost } />);
};

describe("GridPost", () => {
  describe("GridPost with mock post state", () => {
    let testRenderer;
    let component;
    const props = { post: mockPost };

    beforeAll(() => {
      testRenderer = setupTestRenderer();
      component = testRenderer.find(GridPost);
    });

    it("GridPost should correctly renders markup", () => {
      expect(shallowToJson(testRenderer)).toMatchSnapshot();
    });

    it("GridPost should contain correct props", () => {
      expect(component).toHaveLength(1);
      expect(component.props()).toMatchObject(props);
    });
  });
});
