// Core
import React from "react";
import { configure, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import PostSkeleton from "./PostSkeleton";

configure({ adapter: new Adapter() });

/**
 * Setup function for PostSkeleton component.
 * @param {object} props
 * @returns {ReactRenderer}
 */
const setupTestRenderer = () => {
  return mount(<PostSkeleton />);
};

describe("PostSkeleton", () => {
  let testRenderer;
  let component;

  beforeAll(() => {
    testRenderer = setupTestRenderer();
    component = testRenderer.find(PostSkeleton);
  });

  it("PostSkeleton should correctly renders markup", () => {
    expect(shallowToJson(testRenderer)).toMatchSnapshot();
  });
});
