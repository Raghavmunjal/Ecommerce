import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => {
  return (
    <>
      <nav style={{ marginTop: 55 }}>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/user/history" className="nav-link">
              <h4 className="text-info">History</h4>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/wishlist" className="nav-link">
              <h4 className="text-info">Wishlist</h4>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/update/password" className="nav-link">
              <h4 className="text-info">Password</h4>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default UserNav;
