import React from "react";
import { List } from "antd";
import Rating from "./Rating";

const Reviews = ({ data }) => {
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item size="large">
            <ul>
              <li>
                <Rating value={item.rating} />
              </li>

              <li>
                <h6>{item.comment}</h6>
              </li>

              <li>
                <p>{item.name}</p>
              </li>
              <li>
                <p>{item.createdAt.substring(0, 10)}</p>
              </li>
            </ul>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Reviews;
