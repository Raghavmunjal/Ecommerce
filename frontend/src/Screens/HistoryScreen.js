import React from "react";
import SideNavbar from "../Components/nav/SideNavbar";

const HistoryScreen = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <SideNavbar />
        </div>
        <div className="col">history page</div>
      </div>
    </div>
  );
};

export default HistoryScreen;
