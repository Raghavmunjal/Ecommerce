import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <>
      <nav style={{ marginTop: 55 }}>
        <ul className="nav flex-column">
          <li className="nav-item ">
            <Link to="/admin/dashboard" className="nav-link">
              <h4 className="text-info">Dashboard</h4>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/product" className="nav-link">
              <h4 className="text-info">Product</h4>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/products" className="nav-link">
              <h4 className="text-info">Products</h4>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/category" className="nav-link">
              <h4 className="text-info">Category</h4>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/subcategory" className="nav-link">
              <h4 className="text-info">Sub Category</h4>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/brand" className="nav-link">
              <h4 className="text-info">Brand</h4>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/coupon" className="nav-link">
              <h4 className="text-info">Coupon</h4>
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

export default AdminNav;
