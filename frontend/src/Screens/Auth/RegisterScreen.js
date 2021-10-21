import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

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

  //const userLogin = useSelector((state) => state.userLogin);
  const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));

  useEffect(() => {
    // (userLogin && userLogin.token) history.push("/");
    if (userInfo && userInfo.token) history.push("/");
  }, [userInfo]);

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
          />
        </div>
        <button type="submit" className="btn btn-raised my-2" disabled={!email}>
          Register
        </button>
      </form>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
