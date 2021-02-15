// Core
import React from "react";
import { configure, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import FeedPost from "./FeedPost";
import { mockPost } from "../../mock/mockPost";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
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
const setupTestRenderer = (props, mockHistory) => {
  return mount(
    <Provider store={store}>
      <Router history={mockHistory}>
        <FeedPost {...props} />
      </Router>
    </Provider>
  );
};

describe("FeedPost", () => {
  let testRenderer;
  let component;
  const props = { post: mockPost, index: 1 };
  let historyMock;

  beforeAll(() => {
    historyMock = createMemoryHistory();

    testRenderer = setupTestRenderer(props, historyMock);
    component = testRenderer.find(FeedPost);
  });

  beforeEach(() => {
    historyMock.push("/");
  });

  it("FeedPost should correctly renders markup", () => {
    expect(shallowToJson(testRenderer)).toMatchSnapshot();
  });
  it("FeedPost should contain correct props", () => {
    expect(component).toHaveLength(1);
    expect(component.props()).toMatchObject(props);
  });
  it("FeedPost should correct push state to history", () => {
    const feedPostImage = testRenderer.find(FeedPostImage);
    expect(feedPostImage).toHaveLength(1);
    const postImage = testRenderer.find(`[data-testid="postImage"]`);
    expect(postImage).toHaveLength(1);
    postImage.props().onClick();
    expect(historyMock.location.pathname).toEqual(`/${mockPost.id}`);
  });
});
