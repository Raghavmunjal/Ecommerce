import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../LoadingToRedirect";
import axios from "axios";

const UserRoute = ({ children, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [ok, setOk] = useState(false);

  const checkToken = async (token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    return await axios.post("/api/users/isvalid", {}, config);
  };

  useEffect(() => {
    if (userInfo && userInfo.token) {
      checkToken(userInfo.token)
        .then((res) => {
          setOk(true);
        })
        .catch((error) => {
          console.log(error);
          setOk(false);
        });
    }
  }, [userInfo]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default UserRoute;
