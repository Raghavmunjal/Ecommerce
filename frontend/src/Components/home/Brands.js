import React from "react";
import { Link } from "react-router-dom";

const Brands = ({ brands }) => {
  return (
    <div className="container mb-5 mt-4">
      <h2
        className="text-center font-weight-bold p-3 mb-3 mt-2"
        style={{ color: "rgb(0, 21, 41)", textTransform: "uppercase" }}
      >
        Bra<span style={{ color: "#40a9ff" }}>nds</span>
      </h2>

      <div className="row">
        {brands.map((c) => (
          <div
            key={c._id}
            className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
          >
            <p className="mt-2">
              <Link
                to={`/product/brand/${c.slug}`}
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

export default Brands;
