import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Meta from "../../Components/Meta";

const RegisterScreen = ({ history }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration 👌`
    );

    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const redirect = userInfo
    ? userInfo.role === process.env.REACT_APP_CHECK_ADMIN
      ? "/admin/dashboard"
      : "/user/history"
    : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const registerForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            placeholder="Enter Email"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-info btn-raised my-2"
          disabled={!email}
        >
          Register
        </button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <Meta title="Electro: Register" />
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3 style={{ marginTop: 20, color: "#001529" }}>Register</h3>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
