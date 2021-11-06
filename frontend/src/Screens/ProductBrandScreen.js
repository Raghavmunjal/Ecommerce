import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listBrandProducts } from "../Actions/productAction";
import UserProductCard from "../Components/cards/UserProductCard";
import LoadingCard from "../Components/cards/LoadingCard";
import { Pagination } from "antd";

const ProductBrandScreen = ({ match }) => {
  const productBrandList = useSelector((state) => state.productBrandList);
  const { products, page, pages, loading } = productBrandList;

  const [pageNumber, setPageNumber] = useState(page ? page : 1);
  const productSlug = match.params.slug;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listBrandProducts(productSlug, pageNumber));
  }, [match, productSlug, dispatch, pageNumber]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3 style={{ textAlign: "center", marginTop: 60, color: "#001529" }}>
            {productSlug}
          </h3>
          <div className="underline"></div>
        </div>
      </div>
      {loading ? (
        <LoadingCard count={3} />
      ) : (
        <div className="row">
          {products.length &&
            products.map((p) => (
              <div className="col-md-4" key={p._id}>
                <UserProductCard product={p} />
              </div>
            ))}
        </div>
      )}

      {products && products.length > 0 && (
        <div className="row">
          <nav className="col-md-4 offset-md-4 text-center pt-2 p-3 mb-3">
            <Pagination
              defaultCurrent={pageNumber}
              total={pages * 10}
              onChange={(value) => setPageNumber(value)}
            />
          </nav>
        </div>
      )}
    </div>
  );
};

export default ProductBrandScreen;
