import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import { Link } from "react-router-dom";
import Submit from "../Submit/Submit";
import axios from "axios";

const Register = () => {
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
    };

    axios
      .post("https://atg-social-media-backend.vercel.app/register", body)
      .then(({ data }) => {
        //   console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.reload();
          setError("");
        }

        if (data.type === "error") {
          setError(data.message);
        }
      });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-1/2 mx-auto shadow-xl rounded-[22px] p-10"
      >
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-4xl font-medium">Sign Up</h1>
          <div className="text-base">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#2B52DD] underline hover:no-underline"
            >
              Log In
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <InputField
            name="username"
            id="username"
            placeholder="User Name"
            type="text"
            label="User Name"
          />

          <InputField
            name="email"
            id="email"
            placeholder="Enter Your Email Address Here"
            type="email"
            label="Email Address"
          />

          <InputField
            name="password"
            id="password"
            placeholder="Password"
            type="password"
            label="Password"
          />
          {error && <p className="w-full text-red-600 capitalize">{error}</p>}
          <Submit value="Sign up" />
        </div>
      </form>
    </div>
  );
};

export default Register;
