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
 * @returns {RenderTree}
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
 * @returns {ReactRenderer}
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
  let component;
  const props = { title: "Test title" };
  beforeAll(() => {
    tree = setupRenderTree(props);
    testRenderer = setupTestRenderer(props);
    component = testRenderer.find(Layout);
  });
  it("Layout should correctly renders markup", () => {
    expect(tree).toMatchSnapshot();
  });
  it("Layout should contain correct props", () => {
    expect(component).toHaveLength(1);
    expect(component.props()).toMatchObject(props);
  });
});
