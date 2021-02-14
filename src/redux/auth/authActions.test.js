import { authActions } from "./actions";
import { types } from "./types";
import { mockToken } from "../../mock/mockToken";

describe("authActions", () => {
    it("authenticate should return correct action", () => {
        const expectedAction = {
            type: types.AUTHENTICATE,
            payload: mockToken,
        };
        expect(
            authActions.authenticate(mockToken)
        ).toEqual(expectedAction);
    });
  });
  