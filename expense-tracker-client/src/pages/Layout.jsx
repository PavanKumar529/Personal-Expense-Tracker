// import React from "react";
// import SignUp from "../pages/Users/Register/SignUp";
// import SignIn from "../pages/Users/Login/SignIn";
import Home from "./Home/Home"
// import Dashboard from "../pages/Dashboard/Dashboard";
// import Profile from "../pages/Users/Profile/Profile";
import { Outlet } from "react-router-dom";


const Layout = () => {
  return (
    <div>
      <Home/>
      <Outlet />
    </div>
  );
};

export default Layout;
