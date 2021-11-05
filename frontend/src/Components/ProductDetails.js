import React, { useState, useEffect } from "react";
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
import {
  createProductReview,
  listProductsDetails,
} from "../Actions/productAction";
import { useHistory, useParams } from "react-router-dom";

const { TabPane } = Tabs;

const ProductDetails = () => {
  const [visible, setVisible] = useState(false);

  const history = useHistory();
  const params = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductsDetails(params.slug));
  }, [dispatch, params]);

  const { title, images, description, numReviews, rating } = product;

  const [rateValue, setRateValue] = useState(0);
  const [comment, setComment] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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
      history.push({
        pathname: "/login",
        state: { from: `/product/${params.slug}` },
      });
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
        {numReviews !== 0 && (
          <div className="row mt-5">
            <div className="col">
              <h2>Reviews</h2>
              <Reviews />
            </div>
          </div>
        )}
      </div>
      <div className="col-md-5 mt-5">
        <h1 className="p-3">{title}</h1>

        <div className="text-center pt-1 pb-3">
          {rating > 0 ? (
            <Rating value={rating} text={`(${numReviews})`} />
          ) : (
            <div className="text-center pt-1 pb-3 text-secondary">
              No Rating Yet
            </div>
          )}
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
        okButtonProps={{ disabled: comment.length === 0 }}
        onCancel={() => setVisible(false)}
      >
        <AddReviewForm setRateValue={setRateValue} setComment={setComment} />
      </Modal>
    </>
  );
};

export default ProductDetails;
