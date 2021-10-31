import React from "react";
import AdminNav from "../../Components/nav/AdminNav";

const AdminDashBoardScreen = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8 offset-md-1">
          <h3 style={{ textAlign: "center", marginTop: 60, color: "#001529" }}>
            Admin DashBoard
          </h3>
          <div className="underline"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoardScreen;
