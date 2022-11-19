import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToken } from "../tools/AuthSlice";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const onSubmit = async ({ email }) => {
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/password-forgot/`,
        {
          email,
        }
      );
      if (res.status === 200) {
        setMessage(res.data.message);
        setUrl(res.data.url);
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
      {message && (
        <p className="bg-success text-light p-3 rounded">{message}</p>
      )}
      {url && <p className="bg-danger text-light p-3 rounded">{url}</p>}
      <center>
        <h4>Forgot Password</h4>
      </center>
      <hr style={{ border: "1px dashed white" }} />
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary col-md-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
