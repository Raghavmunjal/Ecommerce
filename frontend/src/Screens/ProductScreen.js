import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProductsDetails } from "../Actions/productAction";
import ProductDetails from "../Components/ProductDetails";
import { Divider } from "antd";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Constants/productConstant";

const ProductScreen = ({ match, history }) => {
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  const dispatch = useDispatch();

  const productSlug = match.params.slug;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successReview } = productReviewCreate;

  useEffect(() => {
    if (successReview) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductsDetails(productSlug));
  }, [dispatch, productSlug, successReview]);

  return (
    <>
      <div className="container-fluid">
        <div className="row pt-4">
          <ProductDetails product={product} history={history} />
        </div>

        <div className="row">
          <Divider />
          <div className="col pt-5 pb-5 text-center">
            <h3>Related Products</h3>
            <div className="underline"></div>
          </div>
          <Divider />
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
