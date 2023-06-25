import React from "react";
import { Link, useLocation } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import Submit from "../Submit/Submit";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const location = useLocation();

  const email = location.pathname.split("/")[2];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.password.value.length >= 5) {
      if (e.target.password.value === e.target["reenter-password"].value) {
        const body = {
          email,
          password: e.target.password.value,
        };

        axios
          .post("http://localhost:5000/confirm-reset-password", body)
          .then((res) => {
            if (res.data.acknowledged) {
              if (res.data.modifiedCount) {
                toast.success("Password updated successfully!");
              } else {
                toast.warn("Password remains same");
              }
            }
          });
      }
    }
    // console.log();
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
            name="password"
            id="password"
            placeholder="Enter Password"
            type="password"
            label="Enter Password"
          />

          <InputField
            name="reenter-password"
            id="reenter-password"
            placeholder="Reenter Password"
            type="password"
            label="Reenter Password"
          />

          <Submit value="Login" />
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
