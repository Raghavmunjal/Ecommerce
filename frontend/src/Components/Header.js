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

import { logout } from "../Actions/userActions";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("Home");

  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="Home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      {userLogin && (
        <SubMenu
          icon={<SettingOutlined />}
          title={userLogin && userLogin.email.split("@")[0]}
          className="float-right"
        >
          <Item key="Dashboard">Dashboard</Item>
          <Item key="Profile">Profile</Item>
          <Item icon={<LogoutOutlined />} onClick={logoutHandler}>
            Logout
          </Item>
        </SubMenu>
      )}

      {!userLogin && (
        <Item key="Register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!userLogin && (
        <Item key="Login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}
    </Menu>
  );
};

export default Header;
