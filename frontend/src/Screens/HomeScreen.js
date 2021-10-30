import React, { useEffect } from "react";
import { listProducts } from "../Actions/productAction";
import { listCategories } from "../Actions/categoryAction";
import { useSelector, useDispatch } from "react-redux";
import UserProductCard from "../Components/UserProductCard";
import Jumbotron from "../Components/Jumbotron";
import LoadingCard from "../Components/LoadingCard";

const HomeScreen = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading: loadingList, products } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts("all", pageNumber, 3));
    dispatch(listCategories());
  }, [dispatch, pageNumber]);

  const text = ["Latest Products", "New Products", "Best Selling Products"];

  return (
    <>
      <div className="jumbotron text-center jumbo">
        <div className="row">
          {categories.length > 0 &&
            categories.map((c) => (
              <ul className="col mb-5" key={c._id}>
                <li className="abc">
                  <p style={{ color: "#fff" }}>{c.name}</p>
                </li>
              </ul>
            ))}
        </div>
        <h1 style={{ color: "white" }} className="font-weight-bold mt-5">
          Electro<span style={{ color: "#40a9ff" }}>.</span>
        </h1>
        <h4 style={{ color: "#40a9ff", fontSize: "20px" }} className="mb-5">
          <Jumbotron text={text} />
        </h4>
      </div>

      <div className="container">
        <h2
          className="text-center p-3 mt-5 mb-5"
          style={{ color: "rgb(0, 21, 41)" }}
        >
          Latest <span style={{ color: "#40a9ff" }}>Products</span>
        </h2>

        {loadingList ? (
          <LoadingCard count={6} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <UserProductCard product={product} loading={loadingList} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeScreen;
