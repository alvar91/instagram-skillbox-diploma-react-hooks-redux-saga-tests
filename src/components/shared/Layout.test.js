// Core
import React from "react";
import renderer from "react-test-renderer";
import Layout from "./Layout";
import MockComponent from "../../mock/MockComponent";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

/**
 * Setup function for Layout component.
 * @param {object} props
 * @returns {ReactTree}
 */
const setupRenderTree = (props) => {
  return renderer.create(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/`]}>
        <Layout {...props}>
          <MockComponent />
        </Layout>
      </MemoryRouter>
    </Provider>
  );
};

/**
 * Setup function for Layout component.
 * @param {object} props
 * @returns {ReactTree}
 */
const setupTestRenderer = (props) => {
  return mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/`]}>
        <Layout {...props}>
          <MockComponent />
        </Layout>
      </MemoryRouter>
    </Provider>
  );
};

describe("Layout", () => {
  let tree;
  let testRenderer;
  const props = { title: "Test title" };
  beforeAll(() => {
    tree = setupRenderTree(props);
    testRenderer = setupTestRenderer(props);
  });
  it("Layout should correctly renders markup", () => {
    expect(tree).toMatchSnapshot();
  });
  it("Layout should contain correct props", () => {
    expect(testRenderer.find(Layout)).toHaveLength(1);
    expect(testRenderer.find(Layout).props()).toMatchObject(props);
  });
});
