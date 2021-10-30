import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Meta } = Card;

const ProductCard = ({ product, loading, handleDelete }) => {
  const { title, description, images } = product;
  return (
    <>
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : ""}
            alt="product"
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/admin/product/${product.slug}`}>
            <EditOutlined className="text-primary" />
          </Link>,
          <DeleteOutlined
            className="text-danger"
            onClick={() => handleDelete(product.slug)}
          />,
        ]}
        style={{ marginTop: 16 }}
        className="product-card"
        loading={loading}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 20)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
