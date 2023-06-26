import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import RequireAuth from "./RequireAuth";
import Home from "./pages/Home/Home";
import { UserContext } from "./Context/userContext";
import { useEffect, useState } from "react";
import axios from "axios";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const config = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      axios
        .get("https://atg-social-media-backend.vercel.app/user", config)
        .then((res) => setUser(res.data));
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:email" element={<ResetPassword />} />
      </Routes>

      <ToastContainer />
    </UserContext.Provider>
  );
}

export default App;
