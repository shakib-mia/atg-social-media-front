import axios from "axios";
import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import { Link, useNavigate } from "react-router-dom";
import Submit from "../Submit/Submit";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    axios
      .post("https://atg-social-media-backend.vercel.app/login", body)
      .then(({ data }) => {
        //   console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          // window.history.back();
          navigate("/");
          window.location.reload();
          setError("");
        }

        if (data.message === "Wrong Credentials") {
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
          <h1 className="text-4xl font-medium">Login</h1>
          <div className="text-base">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-[#2B52DD] underline hover:no-underline"
            >
              Sign up
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
            name="password"
            id="password"
            placeholder="Password"
            type="password"
            label="Password"
          />
          {error && <p className="w-full text-red-600">{error}</p>}
          <Submit value="Login" />

          <Link
            to="/forget-password"
            className="text-center text-[#2B52DD] uppercase font-semibold tracking-wide"
          >
            Forget Password
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
