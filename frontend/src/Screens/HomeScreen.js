import React, { useEffect } from "react";
import Jumbotron from "../Components/Jumbotron";
import NewArrivals from "../Components/home/NewArrivals";
import BestSellers from "../Components/home/BestSellers";
import { Link } from "react-router-dom";
import { listCategories } from "../Actions/categoryAction";
import { useSelector, useDispatch } from "react-redux";

const HomeScreen = () => {
  const text = ["Latest Products", "New Products", "Best Selling Products"];

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-banner">
          <h1 className="font-weight-bold mt-3">
            Electro<span>.</span>
          </h1>

          <h2 className="mb-5 mt-3">
            <Jumbotron text={text} />
          </h2>

          <Link to="/" className="hero-btn">
            Shop Now
          </Link>
        </div>
      </div>
      <div className="categories mb-5">
        {categories.map((c) => (
          <div key={c._id} className="category">
            <p>{c.name}</p>
          </div>
        ))}
      </div>

      <NewArrivals className="mb-5" />

      <BestSellers className="mb-5" />
    </div>
  );
};

export default HomeScreen;
