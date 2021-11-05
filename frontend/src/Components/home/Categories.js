import React from "react";
import { Link } from "react-router-dom";

const Categories = ({ categories }) => {
  return (
    <div className="categories mb-5">
      {categories.map((c) => (
        <div key={c._id} className="category">
          <p>
            <Link to={`/product/category/${c.slug}`}>{c.name}</Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
