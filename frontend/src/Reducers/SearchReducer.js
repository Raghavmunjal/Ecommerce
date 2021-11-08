import {
  SEARCH_PRODUCT_FAIL,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_RESET,
  SEARCH_QUERY_RESET,
  SEARCH_QUERY,
} from "../Constants/searchConstant";

export const searchQueryReducer = (state = { text: "" }, action) => {
  switch (action.type) {
    case SEARCH_QUERY:
      return { ...state, ...action.payload };
    case SEARCH_QUERY_RESET:
      return { text: "" };
    default:
      return state;
  }
};

export const searchProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case SEARCH_PRODUCT_REQUEST:
      return { loading: true, products: [] };
    case SEARCH_PRODUCT_SUCCESS:
      return { loading: false, products: action.payload };
    case SEARCH_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case SEARCH_PRODUCT_RESET:
      return { products: [] };
    default:
      return state;
  }
};
