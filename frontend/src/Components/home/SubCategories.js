import React from "react";
import { Link } from "react-router-dom";

const SubCategories = ({ subCategories }) => {
  return (
    <div className="container">
      <h2
        className="text-center font-weight-bold p-3 mb-3 mt-2"
        style={{ color: "rgb(0, 21, 41)", textTransform: "uppercase" }}
      >
        Sub <span style={{ color: "#40a9ff" }}>Catgeories</span>
      </h2>

      <div className="row">
        {subCategories.map((c) => (
          <div
            key={c._id}
            className="col btn btn-outlined-primary btn-block btn-raised m-3"
          >
            <p className="mt-2">
              <Link
                to={`/product/subcategory/${c.slug}`}
                style={{ color: "rgb(0,21,41)" }}
              >
                {c.name}
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategories;
