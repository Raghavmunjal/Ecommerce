import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import UserNav from "../../Components/nav/UserNav";
import { useSelector } from "react-redux";
import AdminNav from "../../Components/nav/AdminNav";

const UpdatePasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password updated");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error(error.message);
      });
  };

  const passwordUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            disabled={loading}
          />
          <button
            type="submit"
            className="btn btn-primary btn-raised my-3"
            disabled={password.length < 6 || loading}
          >
            Update Password
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="conatiner-fluid">
      <div className="row">
        <div className="col-md-2">
          {userInfo && userInfo.role === process.env.REACT_APP_CHECK_ADMIN ? (
            <AdminNav />
          ) : (
            <UserNav />
          )}
        </div>
        <div className="col-md-6 offset-md-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Password</h4>
          )}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordScreen;
