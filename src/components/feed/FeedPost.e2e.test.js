// Core
import React from "react";
import { configure, mount } from "enzyme";
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
  const historyState = {
    pathname: `/${mockPost.id}`,
    state: { modal: true },
  };

  beforeAll(() => {
    historyMock = createMemoryHistory();

    testRenderer = setupTestRenderer(props, historyMock);
    component = testRenderer.find(FeedPost);
  });

  beforeEach(() => {
    historyMock.push("/");
  });

  it("FeedPost should correct push state to history", () => {
    const feedPostImage = testRenderer.find(FeedPostImage);
    expect(feedPostImage).toHaveLength(1);
    const postImage = testRenderer.find(`[data-testid="postImage"]`);
    expect(postImage).toHaveLength(1);
    postImage.props().onClick();
    expect(historyMock.location).toMatchObject(historyState);
  });
});
