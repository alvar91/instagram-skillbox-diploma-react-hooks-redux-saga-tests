// Core
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FeedPostImage from "./FeedPostImage";
import { MemoryRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("FeedPostImage should be triggered with events", () => {
  beforeAll(() => {
    const mockHistoryPush = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useHistory: () => ({
        push: mockHistoryPush,
      }),
    }));
  });

  it("handleOpenPostModal should be triggered by clicking", () => {
    const mockHandleClick = jest.fn();
    const tree = shallow(
      <MemoryRouter>
        <FeedPostImage onClick={mockHandleClick} />
      </MemoryRouter>
    );

    const target = tree.find(FeedPostImage);
    expect(target.length).toBeGreaterThan(0);
    target.simulate("click");

    expect(mockHandleClick).toBeCalledTimes(1);
  });
});
