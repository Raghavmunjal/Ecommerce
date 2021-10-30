import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
const { Meta } = Card;

const UserProductCard = ({ product }) => {
  const { title, description, images, slug } = product;
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
            <EyeOutlined className="text-primary" /> <br /> View Product
          </Link>,
          <>
            <ShoppingCartOutlined className="text-danger" />
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
      </Card>
    </div>
  );
};

export default UserProductCard;
