import firebase from "firebase";

export const login = (email, token) => async (dispatch) => {
  try {
    dispatch({ type: "LOGGED_IN_USER", payload: { email, token } });
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ email: email, token: token })
    );
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    firebase.auth().signOut();
    dispatch({ type: "LOGOUT", payload: null });
    localStorage.removeItem("userInfo");
  } catch (error) {
    console.log(error);
  }
};
