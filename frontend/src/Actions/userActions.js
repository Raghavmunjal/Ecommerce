import firebase from "firebase";
import {
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../Constants/userConstant.js";
import { auth, googleAuthProvider } from "../firebase";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const result = await auth.signInWithEmailAndPassword(email, password);
    const { user } = result;
    if (user) {
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: { email: user.email, token: idTokenResult.token },
      });
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ email: email, token: idTokenResult.token })
      );
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.message,
    });
  }
};

export const googleLogin = () => async (dispatch) => {
  auth
    .signInWithPopup(googleAuthProvider)
    .then(async (result) => {
      const { user } = result;
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: { email: user.email, token: idTokenResult.token },
        });
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ email: user.email, token: idTokenResult.token })
        );
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.message,
      });
    });
};

export const registerComplete = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const result = await auth.signInWithEmailLink(email, window.location.href);
    if (result.user.emailVerified) {
      // remove user email from localStorage
      window.localStorage.removeItem("emailForRegistration");

      // get user id token
      let user = auth.currentUser;
      await user.updatePassword(password);
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: { email: user.email, token: idTokenResult.token },
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: { email: user.email, token: idTokenResult.token },
      });
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ email: email, token: idTokenResult.token })
      );
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    firebase.auth().signOut();
    localStorage.removeItem("userInfo");
    dispatch({
      type: USER_LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};
