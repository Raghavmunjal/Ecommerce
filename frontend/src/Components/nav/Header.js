import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";

import { useHistory, Link } from "react-router-dom";

import { logout } from "../../Actions/userActions";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("Home");

  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleClick = (e) => {
    setCurrent(e.key);
  };

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
        <Link to="/">Home</Link>
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
    </Menu>
  );
};

export default Header;
