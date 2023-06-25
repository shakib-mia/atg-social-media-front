import React from "react";
import InputField from "../../components/InputField/InputField";
import Submit from "../Submit/Submit";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgetPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      email: e.target.email.value,
    };
    axios
      .post("http://localhost:5000/reset-password", body)
      .then(({ data }) => {
        console.log(data);
        if (data) {
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
          <h1 className="text-4xl font-medium">Reset Password</h1>
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
            name="email"
            id="email"
            placeholder="Email Address"
            type="text"
            label="Email Address"
          />
          <Submit value="Login" />
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
