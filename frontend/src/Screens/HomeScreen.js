import React, { useEffect } from "react";
import Jumbotron from "../Components/Jumbotron";
import NewArrivals from "../Components/home/NewArrivals";
import BestSellers from "../Components/home/BestSellers";
import TopRated from "../Components/home/TopRated";
import { Link } from "react-router-dom";
import { listCategories } from "../Actions/categoryAction";
import { listSubCategories } from "../Actions/subCategoryAction";
import { listBrands } from "../Actions/brandAction";
import { useDispatch } from "react-redux";
import Collections from "../Components/home/Collections";

const HomeScreen = () => {
  const text = [
    "Latest Products",
    "Top Rated Products",
    "Best Selling Products",
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listSubCategories());
    dispatch(listBrands());
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
      <BestSellers className="mb-5" />
      <TopRated className="mb-5" />
      <Collections />
      <NewArrivals className="mb-5" />
    </div>
  );
};

export default HomeScreen;
