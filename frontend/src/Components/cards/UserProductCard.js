import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Rating from "../Rating";
const { Meta } = Card;

const UserProductCard = ({ product }) => {
  const { title, description, images, slug, numReviews, rating } = product;
  return (
    <div className="products">
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : ""}
            alt="product"
            style={{ height: "150px", objectFit: "cover" }}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined style={{ color: "#40a9ff", fontSize: "16px" }} />
            <br /> View Product
          </Link>,
          <>
            <ShoppingCartOutlined
              style={{ color: "hsl(211, 39%, 23%)", fontSize: "16px" }}
            />
            <br />
            Add to Cart
          </>,
        ]}
        style={{ marginTop: 16 }}
        className="product-card"
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 20)}...`}
        />
        <Rating value={rating} text={`${numReviews} reviews`} />
      </Card>
    </div>
  );
};

export default UserProductCard;
