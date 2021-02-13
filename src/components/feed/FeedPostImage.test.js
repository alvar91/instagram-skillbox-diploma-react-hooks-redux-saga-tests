// Core
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FeedPostImage from "./FeedPostImage";
import { MemoryRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

// Instruments
import { Provider } from "react-redux";
import { store } from "../../redux/store";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("FeedPostImage should be triggered with events", () => {
  it("handleOpenPostModal should be triggered by clicking", () => {
    const mockHandleCLick = jest.fn();
    const tree = shallow(
      <MemoryRouter>
          <FeedPostImage onClick={mockHandleCLick} />
      </MemoryRouter>
    );

    const target = tree.find(FeedPostImage);
    expect(target.length).toBeGreaterThan(0);
    target.simulate("click");

    expect(mockHandleCLick).toBeCalledTimes(1);
  });
});
