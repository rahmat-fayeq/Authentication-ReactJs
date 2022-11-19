import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../tools/AuthSlice";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  let user;
  if (token) {
    user = jwt_decode(token?.access);
  }
  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(removeToken());
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark shadow"
      style={{ marginBottom: 30 }}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          JRF-React
          <img width={30} height={30} alt="logo" src="favicon.ico" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/news">
                News
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
          </ul>

          {!token ? (
            <NavLink className="btn btn-outline-info" to="/login">
              Login
            </NavLink>
          ) : (
            <>
              <NavLink
                className="btn btn-outline-warning"
                to={`/profile/${user?.user_id}`}
              >
                My Profile
              </NavLink>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button className="btn btn-outline-danger" onClick={handleLogOut}>
                LogOut
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
