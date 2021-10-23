import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserRoute from "./Components/protectedRoute/UserRoute";
import AdminRoute from "./Components/protectedRoute/AdminRoute";

import UpdatePasswordScreen from "./Screens/Auth/UpdatePasswordScreen";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/Auth/LoginScreen";
import RegisterScreen from "./Screens/Auth/RegisterScreen";
import HistoryScreen from "./Screens/HistoryScreen";
import AdminDashBoardScreen from "./Screens/AdminDashBoardScreen";
import ForgotPasswordScreen from "./Screens/Auth/ForgotPasswordScreen";
import RegisterCompleteScreen from "./Screens/Auth/RegisterCompleteScreen";
import WishlistScreen from "./Screens/WishlistScreen";

import Header from "./Components/nav/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <UserRoute exact path="/user/history" component={HistoryScreen} />
        <UserRoute
          exact
          path="/user/update/password"
          component={UpdatePasswordScreen}
        />
        <UserRoute exact path="/user/wishlist" component={WishlistScreen} />
        <AdminRoute
          exact
          path="/admin/dashboard"
          component={AdminDashBoardScreen}
        />
        <Route
          exact
          path="/register/complete"
          component={RegisterCompleteScreen}
        />
        <Route exact path="/forgot/password" component={ForgotPasswordScreen} />
      </Switch>
    </Router>
  );
};

export default App;
