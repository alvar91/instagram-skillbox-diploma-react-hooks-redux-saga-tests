import { getFormattedDate } from "./dateFormat";
import { mockDate, correctMockDate } from "../mock/mockDate";

describe("Format date test", () => {
  it("Should return correct format of date", () => {
    const date = getFormattedDate(mockDate);
    expect(date).toEqual(correctMockDate);
  });
});
