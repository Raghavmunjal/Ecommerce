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
import { Carousel } from "antd";
import Laptop from "../images/l2.jpg";
import Watch from "../images/w1.jpg";
import Mobile from "../images/m1.jpg";

const HomeScreen = () => {
  const text = ["Latest Products", "New Products", "Best Selling Products"];

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
      <Collections />
      <TopRated className="mb-5" />

      <div>
        <div className="section-center offers">
          <div className="offer-info">
            <div className="offer-title">
              <h2 className="font-weight-bold">60% OFF</h2>
              <h3 className="display-4">On Top Products</h3>
            </div>
            <p className="offer-text">
              Offer is valid for limited time period and it is valid on selected
              products T&C applied
            </p>

            <Link to="/" className="offer-btn mt-2">
              Buy Now
            </Link>
          </div>

          <div className="offer-inventory">
            <Carousel autoplay effect="fade" dotPosition="right">
              <div>
                <img src={Laptop} alt="sp2" className="offer-img" />
                <h3 className="product-title">Macbook Pro 2021</h3>
              </div>
              <div>
                <img src={Mobile} alt="sp2" className="offer-img" />
                <h3 className="product-title">Iphone 13 Max</h3>
              </div>
              <div>
                <img src={Watch} alt="sp2" className="offer-img" />
                <h3 className="product-title">ColorFitbit Pro</h3>
              </div>
            </Carousel>
          </div>
        </div>
      </div>

      <NewArrivals className="mb-5" />

      <BestSellers className="mb-5" />
    </div>
  );
};

export default HomeScreen;
