import React from "react";
import UserNav from "../../Components/nav/UserNav";

const HistoryScreen = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-8 offset-1">
          <h3 style={{ textAlign: "center", marginTop: 55, color: "#001529" }}>
            User History
          </h3>
          <div className="underline"></div>
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;
