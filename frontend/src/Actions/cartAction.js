import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  COUPON_APPLIED_FAIL,
  COUPON_APPLIED_REQUEST,
  COUPON_APPLIED_SUCCESS,
} from "../Constants/cartConstant";
import axios from "axios";
export const addToCart = (p) => async (dispatch, getState) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: p,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (c) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: c });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const applyCouponOnItems = (coupon) => async (dispatch, getState) => {
  try {
    dispatch({ type: COUPON_APPLIED_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };
    const { data } = await axios.post("/api/cart/coupon", { coupon }, config);

    dispatch({ type: COUPON_APPLIED_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: COUPON_APPLIED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
