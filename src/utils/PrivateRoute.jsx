import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  let authenticated;
  if (token) {
    authenticated = true;
  } else {
    authenticated = false;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  } else {
    return children ? children : <Outlet />;
  }
};

export default PrivateRoute;
