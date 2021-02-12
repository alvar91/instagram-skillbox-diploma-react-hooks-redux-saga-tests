import removeDublicatesById from "./removeDuplicatesById";
import { mockPosts } from "../mock/mockPosts";

describe("Remove duplicates from collection test", () => {
  it("Should return collection without dublicates with length equal to 0", () => {
    const uniquePosts = removeDublicatesById(mockPosts, mockPosts);
    expect(uniquePosts.length).toEqual(0);
  });
});
