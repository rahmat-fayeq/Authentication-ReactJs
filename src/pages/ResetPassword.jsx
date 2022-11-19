import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const onSubmit = async ({ password, confirm_password }) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/password-reset/",
        {
          password,
          password_confirm: confirm_password,
          token,
        }
      );

      if (res.status === 200) {
        alert(res.data);
        navigate("/login");
      }
    } catch (err) {
      alert(err.response.data);
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
        <h4>Reset Password</h4>
      </center>
      <hr style={{ border: "1px dashed white" }} />
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className="mb-3">
          <label htmlFor="confirm_password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirm_password"
            {...register("confirm_password", {
              required: "Confirm password is required",
              minLength: {
                value: 6,
                message: "Confirm password must be at least 6 chars",
              },
            })}
          />
          {errors.confirm_password && (
            <div className="text-danger">{errors.confirm_password.message}</div>
          )}
        </div>
        <button type="submit" className="btn btn-outline-success">
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
