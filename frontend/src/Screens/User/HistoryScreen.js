import React from "react";
import UserNav from "../../Components/nav/UserNav";

const HistoryScreen = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">history page</div>
      </div>
    </div>
  );
};

export default HistoryScreen;
