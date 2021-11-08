import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";

import SearchForm from "../forms/SearchForm";

import { useDispatch, useSelector } from "react-redux";

import { useHistory, Link } from "react-router-dom";

import { logout } from "../../Actions/userActions";

import { listCategories } from "../../Actions/categoryAction";
import { listSubCategories } from "../../Actions/subCategoryAction";
import { listBrands } from "../../Actions/brandAction";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("Home");

  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const subCategoryList = useSelector((state) => state.subCategoryList);
  const { subCategories } = subCategoryList;

  const brandList = useSelector((state) => state.brandList);
  const { brands } = brandList;

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listSubCategories());
    dispatch(listBrands());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      theme="dark"
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
      }}
    >
      <Item key="Home" icon={<AppstoreOutlined />}>
        <Link to="/">
          {userInfo ? <span>Home</span> : <span>Electro</span>}
        </Link>
      </Item>

      <SubMenu icon={<DownCircleOutlined />} title="Items" key="items">
        <SubMenu key="category" title="Categories">
          {categories &&
            categories.length > 0 &&
            categories.map((c) => {
              return (
                <Item key={c._id}>
                  <Link to={`/product/category/${c.slug}`}>{c.name}</Link>
                </Item>
              );
            })}
        </SubMenu>
        <SubMenu key="subcategory" title="Subcategories">
          {subCategories &&
            subCategories.length > 0 &&
            subCategories.map((c) => {
              return (
                <Item key={c._id}>
                  <Link to={`/product/subcategory/${c.slug}`}>{c.name}</Link>
                </Item>
              );
            })}
        </SubMenu>
        <SubMenu key="brand" title="Brands">
          {brands &&
            brands.length > 0 &&
            brands.map((c) => {
              return (
                <Item key={c._id}>
                  <Link to={`/product/brand/${c.slug}`}>{c.name}</Link>
                </Item>
              );
            })}
        </SubMenu>
      </SubMenu>

      <Item key="Shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>

      {userInfo && (
        <SubMenu
          icon={<SettingOutlined />}
          title={userInfo && userInfo.email.split("@")[0]}
          className="float-right"
        >
          {userInfo && userInfo.role === process.env.REACT_APP_CHECK_ADMIN && (
            <Item key="Dashboard">
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          {userInfo && userInfo.role === "customer" && (
            <Item key="Dashboard">
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}

          <Item icon={<LogoutOutlined />} onClick={logoutHandler}>
            Logout
          </Item>
        </SubMenu>
      )}

      {!userInfo && (
        <Item key="Register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!userInfo && (
        <Item key="Login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}

      <span className="float-right p-1">
        <SearchForm />
      </span>
    </Menu>
  );
};

export default Header;
