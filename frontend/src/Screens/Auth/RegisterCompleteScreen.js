import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { registerComplete } from "../../Actions/userActions";
import { MailOutlined } from "@ant-design/icons";

const RegisterCompleteScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = userInfo
    ? userInfo.role === process.env.REACT_APP_CHECK_ADMIN
      ? "/admin/dashboard"
      : "/user/history"
    : "/";

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (userInfo) {
      history.push(redirect);
    }
  }, [error, history, userInfo, redirect]);

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password is required 👈");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long 👈");
      return;
    }

    dispatch(registerComplete(email, password));
  };

  const completeRegistrationForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            placeholder="Enter Password"
          />
        </div>

        <Button
          onClick={handleSubmit}
          type="primary"
          className="mb-3"
          block
          shape="round"
          icon={<MailOutlined />}
          size="large"
          disabled={!email || password.length < 6}
        >
          Sign up with Email/Password
        </Button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Sign Up</h4>
          )}
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterCompleteScreen;
