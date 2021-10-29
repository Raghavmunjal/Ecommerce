import axios from "axios";
import { toast } from "react-toastify";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../Constants/productConstant";

export const createProduct = (values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };

    const {
      title,
      description,
      price,
      quantity,
      category,
      subCategory,
      images,
      color,
      brand,
      shipping,
    } = values;

    const { data } = await axios.post(
      "/api/product",
      {
        title,
        description,
        price,
        quantity,
        category,
        subCategory,
        images,
        color,
        brand,
        shipping,
      },
      config
    );
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast.error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};

export const listProducts = (category, page) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(
      `/api/product/all?category=${category}&page=${page}`
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast.error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};

export const deleteProduct = (slug) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: userInfo.token,
      },
    };

    await axios.delete(`/api/product/${slug}`, config);
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
    toast.success(`Product ${slug} deleted successfully`);
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast.error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};
