import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import POSLogo from "../assets/images/iTech-Logo-Home.png";
import useUserStore from "../ZustState/User";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = useUserStore((state) => state.userRole);

  return (
    <div className="flex justify-between items-center py-1 px-11 bg-white">
      <h1 className="text-black text-xs text-center font-extrabold leading-7">
        <img
          src={POSLogo}
          alt="POS-Logo"
          height="100px"
          width="100px"
          className="ml-5 mt-2"
        />
        Complete POS Solution
      </h1>
      {/* Conditionally render Admin button */}
      {userRole === "admin" && (
        <div className="flex items-center">
          <button
            onClick={() => navigate("/MainPOS")}
            className={`text-blue-700 no-underline text-lg font-medium mx-4 ${
              location.pathname === "/MainPOS" || location.pathname === "/"
                ? "text-red-800"
                : ""
            }`}
          >
            Main-POS
          </button>

          <button
            onClick={() => navigate("/adminPage")}
            className={`text-blue-700 no-underline text-lg font-medium mx-4 ${
              location.pathname === "/adminPage" ? "text-red-800" : ""
            }`}
          >
            Admin
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
