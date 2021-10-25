import React from "react";
import AdminNav from "../../Components/nav/AdminNav";

const AdminDashBoardScreen = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">Admin dashboard</div>
      </div>
    </div>
  );
};

export default AdminDashBoardScreen;
