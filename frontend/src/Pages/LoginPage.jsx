import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserStore from "../ZustState/User";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUserRole = useUserStore((state) => state.setUserRole);
  const setUserName = useUserStore((state) => state.setUserName);


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in all the fields");
      return;
    }

    try {
      const loginData = { username, password };
      const response = await axios.post(
        "http://localhost:9000/user/login",
        loginData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const userInfo = response.data;
        console.log("user info is: ", userInfo.user.username);
        setUserName(userInfo.user.username);
        setUserRole(userInfo.user.role);
        console.log("Login successful");
        alert("Login Successful");
        navigate("/home");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.log("Error during login: ", error.message);
      alert("Login Failed");
    }
  };

  return (
    <div className="container mt-24 mx-auto px-12 py-4">
      <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
        LOGIN
      </h1>
      <form onSubmit={handleLogin}>
        <div>
          <label className="text-white block mb-2 text-2xl font-medium my-2">
            Username
          </label>
          <input
            type="text"
            className="bg-gray-200 border border-[#33353F] placeholder-black text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-6"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="text-white block mb-2 text-2xl font-medium my-2">
            Password
          </label>
          <input
            type="password"
            className="bg-gray-200 border border-[#33353F] placeholder-black text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-6"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-gradient-to-r from-blue-500 to-green-500  hover:from-blue-600 hover:to-green-600 font-medium py-2.5 px-5 rounded-lg w-48 h-12 border border-gray-300 my-5"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
