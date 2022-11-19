import React from "react";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";

const Home = () => {
  const { token } = useSelector((state) => state.auth);
  let user;
  if (token) {
    user = jwt_decode(token?.access);
  }

  return (
    <div className="container">
      <h3>Dashboard</h3>
      {token ? (
        <p>Welcome, {user.email} </p>
      ) : (
        <p>Please login to access the resouce !</p>
      )}
    </div>
  );
};

export default Home;
