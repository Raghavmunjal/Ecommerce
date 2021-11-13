import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Rating from "../Rating";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Actions/cartAction";
import { CART_DRAWER } from "../../Constants/cartConstant";
const { Meta } = Card;

const UserProductCard = ({ product }) => {
  const { title, description, images, slug, numReviews, rating, price } =
    product;

  const dispatch = useDispatch();
  const handleCart = () => {
    setTooltip("Added");
    dispatch(addToCart({ ...product, count: 1 }));
    dispatch({ type: CART_DRAWER, payload: true });
  };
  const [tooltip, setTooltip] = useState("Add to Cart");
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
          <Tooltip title={tooltip}>
            <span onClick={handleCart}>
              <ShoppingCartOutlined
                style={{ color: "hsl(211, 39%, 23%)", fontSize: "16px" }}
              />
              <br />
              Add to Cart
            </span>
          </Tooltip>,
        ]}
        style={{ marginTop: 16 }}
        className="product-card mb-3"
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 20)}...`}
        />

        <Rating value={rating} text={`${numReviews} reviews`} />
        <h4 className="mt-3">Rs. {price}</h4>
      </Card>
    </div>
  );
};

export default UserProductCard;
