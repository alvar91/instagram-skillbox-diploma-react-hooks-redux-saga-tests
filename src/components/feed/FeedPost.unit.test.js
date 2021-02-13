// Core
import React from "react";
import { configure, mount } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import FeedPost from "./FeedPost";
import { mockPost } from "../../mock/mockPost";

configure({ adapter: new Adapter() });

// Instruments
import { Provider } from "react-redux";
import { store } from "../../redux/store";

describe("FeedPost", () => {
  it("FeedPost correctly renders markup", () => {
    const tree = mount(
      <Provider store={store}>
        <FeedPost post={mockPost} index={1} />
      </Provider>
    );
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
