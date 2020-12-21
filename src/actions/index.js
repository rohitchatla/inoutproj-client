import axios from "../services/Axios";
import { reset } from "redux-form";
import {
  AUTH_USER,
  UNAUTH_USER,
  FETCH_PROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
} from "./types";

/**
 * Authentication
 */

export function signinUser({ email, password }, historyPush, historyReplace) {
  // Using redux-thunk (instead of returning an object, return a function)
  // All redux-thunk doing is giving us arbitrary access to the dispatch function, and allow us to dispatch our own actions at any time we want
  return function (dispatch) {
    // Submit email/password to the server
    axios
      .post(`/signin`, { email, password }) // axios returns a promise
      .then((response) => {
        // If request is good (sign in succeeded) ...
        //console.log(response);
        // - Save the JWT token (use local storage)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("uid", response.data.id);
        // - Update state to indicate user is authenticated
        dispatch({
          type: AUTH_USER,
          payload: response.data.username,
        });

        // - Redirect (PUSH) to the route '/flashpage'
        historyPush("/");
      })
      .catch((e) => {
        // If request is bad (sign in failed) ...
        console.log(e);
        // - Redirect (REPLACE) to the route '/signin', then show an error to the user
        historyReplace("/signin", {
          time: new Date().toLocaleString(),
          message: "The email and/or password are incorrect.",
        });
      });
  };
}

export function signupUser(
  { email, password, firstName, lastName },
  historyPush,
  historyReplace
) {
  return function (dispatch) {
    axios
      .post(`/signup`, { email, password, firstName, lastName }) // axios returns a promise
      .then((response) => {
        // If request is good (sign up succeeded) ...

        // - Redirect (PUSH) to the route '/signin', then show a success message to the user
        historyPush("/signin", {
          time: new Date().toLocaleString(),
          message: response.data.message,
        });
      })
      .catch(({ response }) => {
        // If request is bad (sign up failed) ...

        // - Redirect (REPLACE) to the route '/signup', then show an error to the user
        historyReplace("/signup", {
          time: new Date().toLocaleString(),
          message: response, //response.data.message,
        });
      });
  };
}

export function signoutUser() {
  // - Delete the JWT token from local storage
  localStorage.removeItem("token");

  // - Update state to indicate the user is not authenticated
  return { type: UNAUTH_USER };
}

export function verifyJwt() {
  return function (dispatch) {
    axios
      .get(`/verify_jwt`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        dispatch({
          type: AUTH_USER,
          payload: response.data.username,
        });
      });
  };
}

/**
 * User information
 */

export function fetchProfile() {
  return function (dispatch) {
    axios
      .get(`/profile`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        dispatch({
          type: FETCH_PROFILE,
          payload: response.data.user,
        });
      });
  };
}

export function clearProfile() {
  return { type: CLEAR_PROFILE };
}

export function updateProfile(
  {
    firstName,
    lastName,
    birthday,
    sex,
    phone,
    address,
    occupation,
    description,
    image,
  },
  historyReplace
) {
  return function (dispatch) {
    // {
    //   // req.body (2nd parameter)
    //   firstName,
    //   lastName,
    //   birthday,
    //   sex,
    //   phone,
    //   address,
    //   occupation,
    //   description,
    //   image,
    // }
    const dataform = new FormData();

    dataform.append("firstName", firstName);
    dataform.append("lastName", lastName);
    dataform.append("birthday", birthday);
    dataform.append("sex", sex);
    dataform.append("phone", phone);
    dataform.append("address", address);
    dataform.append("occupation", occupation);
    dataform.append("description", description);
    dataform.append("image", image);
    axios
      .put(`/profile`, dataform, {
        // header (3rd parameter)

        headers: {
          "Content-Type": "multipart/form-data",
          authorization: localStorage.getItem("token"),
        }, // require auth
      })
      .then((response) => {
        // Update profile success
        // - Update profile
        dispatch({
          type: UPDATE_PROFILE,
          payload: response.data.user,
        });
        // - Update username for header
        dispatch({
          type: AUTH_USER,
          payload:
            response.data.user.firstName + " " + response.data.user.lastName,
        });
        // - history.replace
        historyReplace("/profile", {
          status: "success",
          time: new Date().toLocaleString(),
          message: "You have successfully updated your profile.",
        });
      })
      .catch(() => {
        // Update profile failed
        historyReplace("/profile", {
          status: "fail",
          time: new Date().toLocaleString(),
          message: "Update profile failed. Please try again.",
        });
      });
  };
}

export function changePassword({ oldPassword, newPassword }, historyReplace) {
  return function (dispatch) {
    axios
      .put(
        `/password`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: { authorization: localStorage.getItem("token") }, // require auth
        }
      )
      .then((response) => {
        dispatch(reset("settings")); // Clear the form if success
        historyReplace("/settings", {
          status: "success",
          time: new Date().toLocaleString(),
          message: response.data.message,
        });
      })
      .catch(({ response }) => {
        historyReplace("/settings", {
          status: "fail",
          time: new Date().toLocaleString(),
          message: response.data.message,
        });
      });
  };
}
