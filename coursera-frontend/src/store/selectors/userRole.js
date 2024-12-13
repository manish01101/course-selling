import { userState } from "../atoms/user";
import { selector } from "recoil";

export const userRoleState = selector({
  key: "userRoleState",
  get: ({ get }) => {
    const state = get(userState);

    return state.userRole;
  },
});
