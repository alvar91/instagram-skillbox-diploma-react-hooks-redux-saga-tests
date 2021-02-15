// Core
import React from "react";
import { configure, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import FeedPost from "./FeedPost";
import { mockPost } from "../../mock/mockPost";
//import { createMemoryHistory } from "history";
import FeedPostImage from "./FeedPostImage";

configure({ adapter: new Adapter() });

// Instruments
import { Provider } from "react-redux";
import { store } from "../../redux/store";

/**
 * Setup function for FeedPost component.
 * @param {object} props
 * @returns {ReactRenderer}
 */
const setupTestRenderer = (props) => {
  return mount(
    <Provider store={store}>
      <FeedPost {...props} />
    </Provider>
  );
};

describe("FeedPost", () => {
  let testRenderer;
  let component;
  const props = { post: mockPost, index: 1 };

  beforeAll(() => {
    // const mockHistoryPush = jest.fn();
    // jest.mock("react-router-dom", () => ({
    //   ...jest.requireActual("react-router-dom"),
    //   useHistory: () => ({
    //     push: mockHistoryPush,
    //   }),

    // // }));
    // const history = createMemoryHistory({ initialEntries: "/" });

    testRenderer = setupTestRenderer(props);
    component = testRenderer.find(FeedPost);
  });

  // beforeEach(() => {
  //   history.push("/");
  // });

  it("FeedPost should correctly renders markup", () => {
    expect(shallowToJson(testRenderer)).toMatchSnapshot();
  });
  it("FeedPost should contain correct props", () => {
    expect(component).toHaveLength(1);
    expect(component.props()).toMatchObject(props);
  });
  it("FeedPost should correct push location to history", () => {
    
    const feedPostImage = testRenderer.find(FeedPostImage);
    expect(feedPostImage).toHaveLength(1);
  });
});
