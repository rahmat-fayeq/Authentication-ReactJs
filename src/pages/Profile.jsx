import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeToken } from "../tools/AuthSlice";
import useAxios from "../utils/useAxios";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const api = useAxios();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const onSubmit = async ({ password, confirm_password }) => {
    try {
      const { status, data } = await api.put(`/api/user/reset-password/${id}`, {
        password,
        password_confirm: confirm_password,
      });
      if (status === 200) {
        alert(data);
        navigate("/");
      } else {
        dispatch(removeToken());
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
        <h4>Change Password</h4>
      </center>
      <hr style={{ border: "1px dashed white" }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            New Password
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
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Profile;
