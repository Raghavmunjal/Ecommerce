import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { Meta } = Card;

const ProductCard = ({ product, loading, handleDelete }) => {
  const { title, description, images } = product;
  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : ""}
          alt="product"
          style={{ height: "150px", objectFit: "cover" }}
        />
      }
      actions={[
        <EditOutlined className="text-primary" />,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleDelete(product.slug)}
        />,
      ]}
      style={{ width: 300, marginTop: 16 }}
      loading={loading}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 20)}...`}
      />
    </Card>
  );
};

export default ProductCard;
