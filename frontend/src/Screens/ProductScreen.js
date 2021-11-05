import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  listProductsDetails,
  listRelatedProducts,
} from "../Actions/productAction";
import ProductDetails from "../Components/ProductDetails";
import UserProductCard from "../Components/cards/UserProductCard";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Constants/productConstant";

const ProductScreen = ({ match }) => {
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  const productRelated = useSelector((state) => state.productRelated);
  const { products: relatedProduct } = productRelated;

  const dispatch = useDispatch();

  const productSlug = match.params.slug;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successReview } = productReviewCreate;

  useEffect(() => {
    if (successReview) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductsDetails(productSlug));

    dispatch(listRelatedProducts(productSlug));
  }, [dispatch, productSlug, successReview]);

  return (
    <>
      <div className="container-fluid">
        <div className="row pt-4">
          <ProductDetails product={product} />
        </div>

        <div className="row products-container">
          <div className="col pt-5 pb-5 text-center">
            <h3>Related Products</h3>
            <div className="underline"></div>
            <div className="container">
              <div className="row pb-5">
                {relatedProduct.length ? (
                  relatedProduct.map((p) => (
                    <div key={p._id} className="col-md-4">
                      <UserProductCard product={p} />
                    </div>
                  ))
                ) : (
                  <div className="text-center col">
                    <p>No Products Found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
