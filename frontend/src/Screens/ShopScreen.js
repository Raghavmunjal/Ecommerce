import React from "react";

const ShopScreen = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <h4>Search/filter menu</h4>
        </div>
        <div className="col-md-9">
          <h3 style={{ marginTop: 60, color: "#001529" }}>Products</h3>
          <div
            style={{
              width: "4rem",
              height: "0.25rem",
              marginBottom: "1.25rem",
              background: "rgb(64, 169, 255)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ShopScreen;
