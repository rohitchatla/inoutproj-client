import { AUTH_USER, UNAUTH_USER } from "../actions/types";

export default function (state = {}, action) {
  // Attention!!! The state object here refers to state.auth, instead of the application state.

  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, username: action.payload };
    case UNAUTH_USER:
      return { ...state, authenticated: false, username: "" };

    default:
      return state;
  }
}
