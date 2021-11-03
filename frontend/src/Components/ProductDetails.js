import React, { useState } from "react";
import { Card, Tabs, Modal } from "antd";
import { Link } from "react-router-dom";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Laptop from "../images/l2.jpg";
import ProductCardItems from "./ProductCardItems";
import Reviews from "./Reviews";
import Rating from "./Rating";
import AddReviewForm from "./forms/AddReviewForm";
import { useDispatch, useSelector } from "react-redux";
import { createProductReview } from "../Actions/productAction";

const { TabPane } = Tabs;

const ProductDetails = ({ product, history }) => {
  // const data = [
  //   {
  //     comment: "Amazing Headphone",
  //     date: "2021-02-11",
  //     user: "Raghav",
  //     value: 2,
  //   },
  //   {
  //     comment: "Amazing Headphone",
  //     date: "2021-02-11",
  //     user: "Raghav",
  //     value: 4,
  //   },
  //   {
  //     comment: "Amazing Headphone",
  //     date: "2021-02-11",
  //     user: "Raghav",
  //     value: 5,
  //   },
  //   {
  //     comment: "Amazing Headphone",
  //     date: "2021-02-11",
  //     user: "Raghav",
  //     value: 3,
  //   },
  //   {
  //     comment: "Amazing Headphone",
  //     date: "2021-02-11",
  //     user: "Raghav",
  //     value: 2,
  //   },
  //   {
  //     comment: "Amazing Headphone",
  //     date: "2021-02-11",
  //     user: "Raghav",
  //     value: 4,
  //   },
  //   {
  //     comment: "Amazing Headphone",
  //     date: "2021-02-11",
  //     user: "Raghav",
  //     value: 5,
  //   },
  //   {
  //     comment: "Amazing Headphone",
  //     date: "2021-02-11",
  //     user: "Raghav",
  //     value: 2,
  //   },
  //   {
  //     comment: "Amazing Headphone",
  //     date: "2021-02-11",
  //     user: "Raghav",
  //     value: 4,
  //   },
  //   {
  //     comment: "Amazing Headphone",
  //     date: "2021-02-11",
  //     user: "Raghav",
  //     value: 5,
  //   },
  //   {
  //     comment: "Amazing Headphone",
  //     date: "2021-02-11",
  //     user: "Raghav",
  //     value: 2,
  //   },
  //   {
  //     comment: "Amazing Headphone",
  //     date: "2021-02-11",
  //     user: "Raghav",
  //     value: 4,
  //   },
  //   {
  //     comment: "Amazing Headphone",
  //     date: "2021-02-11",
  //     user: "Raghav",
  //     value: 5,
  //   },
  //   {
  //     comment: "Amazing Headphone",
  //     date: "2021-02-11",
  //     user: "Raghav",
  //     value: 2,
  //   },
  //   {
  //     comment: "Amazing Headphone",
  //     date: "2021-02-11",
  //     user: "Raghav",
  //     value: 4,
  //   },
  //   {
  //     comment: "Amazing Headphone",
  //     date: "2021-02-11",
  //     user: "Raghav",
  //     value: 5,
  //   },
  // ];

  const [visible, setVisible] = useState(false);
  const { title, images, description, numReviews, rating, reviews } = product;

  const [rateValue, setRateValue] = useState(0);
  const [comment, setComment] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const handleOk = () => {
    dispatch(createProductReview(product._id, { rateValue, comment }));
    setComment("");
    setRateValue(0);
    setVisible(false);
  };

  const handleModal = () => {
    if (userInfo && userInfo.token) {
      setVisible(true);
    } else {
      history.push("/login");
    }
  };

  return (
    <>
      <div className="col-md-7 mt-5">
        {images && images.length > 0 ? (
          <Carousel autoplay showArrows={true} infiniteLoop>
            {images &&
              images.map((i) => <img src={i.url} key={i.public_id} alt="" />)}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={Laptop}
                alt="product"
                style={{ height: "450px", objectFit: "cover" }}
              />
            }
          ></Card>
        )}
        <Tabs className="p-1">
          <TabPane tab="Description" key="1">
            {description}
          </TabPane>
          <TabPane tab="More" key="2">
            <p>Call us on xxxx-xxx-xxx to learn more about this product.</p>
          </TabPane>
        </Tabs>
        <div className="row mt-5">
          <div className="col">
            <h2>Reviews</h2>

            {numReviews === 0 ? <p>No reviews</p> : <Reviews data={reviews} />}
          </div>
        </div>
      </div>
      <div className="col-md-5 mt-5">
        <h1 className="p-3">{title}</h1>

        <div className="mb-3 text-center">
          <Rating value={rating} text={`(${numReviews})`} />
        </div>

        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-primary" />
              <br />
              Add to Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-danger" />
              <br />
              Add to Wishlist
            </Link>,
            <div onClick={handleModal}>
              <StarOutlined className="text-info" />
              <br />
              {userInfo && userInfo.token
                ? "Leave Rating"
                : "Login to Leave Rating"}
            </div>,
          ]}
        >
          <ProductCardItems product={product} />
        </Card>
      </div>
      <Modal
        title="Write A Review"
        centered
        visible={visible}
        onOk={handleOk}
        okText="Add Review"
        cancelText="Cancel"
        okButtonProps={{ disabled: !comment }}
        onCancel={() => setVisible(false)}
      >
        <AddReviewForm setRateValue={setRateValue} setComment={setComment} />
      </Modal>
    </>
  );
};

export default ProductDetails;
