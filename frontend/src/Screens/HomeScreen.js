import React, { useEffect } from "react";
import { listProducts } from "../Actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import UserProductCard from "../Components/UserProductCard";
import Jumbotron from "../Components/Jumbotron";

const HomeScreen = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading: loadingList, products } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts("all", pageNumber, 3));
  }, [dispatch, pageNumber]);

  const text = ["Latest Products", "New Products", "Best Selling Products"];

  return (
    <>
      <div className="jumbotron text-center jumbo">
        <h1 style={{ color: "white" }} className="font-weight-bold">
          Electro<span style={{ color: "#40a9ff" }}>.</span>
        </h1>
        <h4 style={{ color: "#40a9ff" }}>
          <Jumbotron text={text} />
        </h4>
      </div>
      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4">
              <UserProductCard product={product} loading={loadingList} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
