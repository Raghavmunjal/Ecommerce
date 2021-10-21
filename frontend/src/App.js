import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/Auth/LoginScreen";
import RegisterScreen from "./Screens/Auth/RegisterScreen";
import Header from "./Components/Header";
import ForgotPasswordScreen from "./Screens/Auth/ForgotPasswordScreen";
import RegisterCompleteScreen from "./Screens/Auth/RegisterCompleteScreen";

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
      </Switch>
    </Router>
  );
};

export default App;
