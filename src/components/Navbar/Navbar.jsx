import React from "react";
import { UserContext } from "../../Context/userContext";

const Navbar = () => {
  return (
    <UserContext.Consumer>
      {({ username }) => (
        <div className="flex justify-between px-5 py-3">
          <h2 className="text-xl font-medium">Logo</h2>
          {username ? (
            <div className="flex gap-2 items-center">
              <span className="capitalize">
                {username.split("-").join(" ")}
              </span>
              <button
                className="bg-red-800 text-white px-2 py-1 cursor-pointer rounded"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            "loading..."
          )}
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default Navbar;
