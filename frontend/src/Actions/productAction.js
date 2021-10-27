import axios from "axios";
import { toast } from "react-toastify";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
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
      colors,
      brands,
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
        images,
        color,
        brand,
        shipping,
        colors,
        brands,
      },
      config
    );
    console.log(data);
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
    toast.success(`Product Created`);
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
