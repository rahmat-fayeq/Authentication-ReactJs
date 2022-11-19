import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToken } from "../tools/AuthSlice";
import { useForm } from "react-hook-form";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const handleLogin = async ({ email, password }) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/token/`, {
        email,
        password,
      });
      if (res.status === 200) {
        dispatch(addToken(res.data));
        navigate("/news");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="container shadow"
      style={{
        backgroundColor: "lightBlue",
        color: "white",
        padding: 40,
        borderRadius: 7,
        width: "500px",
      }}
    >
      <center>
        <h4>Login Form</h4>
      </center>
      <hr style={{ border: "1px dashed white" }} />
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="user@user.com"
            id="form"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Email must be valid",
              },
            })}
          />
          {errors.email && (
            <div className="text-danger">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 chars",
              },
            })}
          />
          {errors.password && (
            <div className="text-danger">{errors.password.message}</div>
          )}
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary col-md-2">
            Login
          </button>
          <p>
            <Link to="/forgot-password">Forgot Password</Link>
          </p>
          <p>
            Don't have account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
