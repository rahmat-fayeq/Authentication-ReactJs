import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const handleRegister = async (data) => {
    const { fname, lname, email, password, phone, dob, gender } = data;
    try {
      const res = await axios.post(`http://127.0.0.1:8000/api/register/`, {
        first_name: fname,
        last_name: lname,
        email,
        password,
        phone,
        dob,
        gender,
      });
      if (res.status === 201) {
        alert("Your account created, please login !");
        navigate("/login");
      }
    } catch (err) {
      if (err.response.data.email) {
        setErrorMessages(err.response.data.email);
      } else {
        console.log(err);
      }
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
      {errorMessages &&
        errorMessages.map((err) => (
          <p className="bg-danger text-light p-3 rounded">{err}</p>
        ))}

      <center>
        <h4>Registration Form</h4>
      </center>
      <hr style={{ border: "1px dashed white" }} />
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label htmlFor="name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fname"
              placeholder="Alexander"
              {...register("fname")}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label htmlFor="name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lname"
              placeholder="Evanvich"
              {...register("lname")}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="alex@yahoo.com"
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
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Mobile Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="+937993344550"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">
            Date of birth
          </label>
          <input type="date" className="form-control" id="dob" />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <input type="radio" id="M" value="M" name="gender" />
          Male&nbsp;&nbsp;
          <input type="radio" id="F" value="F" name="gender" />
          Female&nbsp;&nbsp;
          <input type="radio" id="O" value="O" name="gender" />
          Other
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary col-md-4">
            Create Account
          </button>
          <p>
            Already have account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
