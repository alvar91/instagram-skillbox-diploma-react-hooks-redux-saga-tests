// Core
import React from "react";
import renderer from "react-test-renderer";
import FeedPostSkeleton from "./FeedPostSkeleton";

describe("FeedPostSkeleton", () => {
  it("FeedPostSkeleton should correctly renders markup", () => {
    const tree = renderer
      .create(
        <FeedPostSkeleton />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
