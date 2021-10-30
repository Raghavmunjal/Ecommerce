import React from "react";
import UserNav from "../../Components/nav/UserNav";

const WishlistScreen = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-8 offset-1">
          <h3 style={{ textAlign: "center", marginTop: 55, color: "#001529" }}>
            Wishlist
          </h3>
          <div className="underline"></div>
        </div>
      </div>
    </div>
  );
};

export default WishlistScreen;
