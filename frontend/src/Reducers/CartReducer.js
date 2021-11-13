import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_DRAWER,
  CART_EMPTY,
} from "../Constants/cartConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === existItem._id ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x._id !== action.payload._id),
      };
    case CART_EMPTY:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};

export const cartDrawerReducer = (state = false, action) => {
  switch (action.type) {
    case CART_DRAWER:
      return action.payload;

    default:
      return state;
  }
};
