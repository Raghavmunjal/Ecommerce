import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Protected Route
import UserRoute from "./Components/protectedRoute/UserRoute";
import AdminRoute from "./Components/protectedRoute/AdminRoute";

import HomeScreen from "./Screens/HomeScreen";

// Auth Screens
import LoginScreen from "./Screens/Auth/LoginScreen";
import ForgotPasswordScreen from "./Screens/Auth/ForgotPasswordScreen";
import RegisterCompleteScreen from "./Screens/Auth/RegisterCompleteScreen";
import RegisterScreen from "./Screens/Auth/RegisterScreen";
import UpdatePasswordScreen from "./Screens/Auth/UpdatePasswordScreen";

// Admin Screens
import AdminDashBoardScreen from "./Screens/Admin/AdminDashBoardScreen";
import CreateCategoryScreen from "./Screens/Admin/category/CreateCategoryScreen";
import EditCategoryScreen from "./Screens/Admin/category/EditCategoryScreen";

// User Screens
import WishlistScreen from "./Screens/User/WishlistScreen";
import HistoryScreen from "./Screens/User/HistoryScreen";

// Components
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
        <Route
          exact
          path="/register/complete"
          component={RegisterCompleteScreen}
        />
        <Route exact path="/forgot/password" component={ForgotPasswordScreen} />
        <AdminRoute
          exact
          path="/admin/dashboard"
          component={AdminDashBoardScreen}
        />
        <AdminRoute
          exact
          path="/admin/category"
          component={CreateCategoryScreen}
        />
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={EditCategoryScreen}
        />
        <UserRoute exact path="/user/history" component={HistoryScreen} />
        <UserRoute
          exact
          path="/user/update/password"
          component={UpdatePasswordScreen}
        />
        <UserRoute exact path="/user/wishlist" component={WishlistScreen} />
      </Switch>
    </Router>
  );
};

export default App;
