import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData,
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="relative p-7 flex flex-col h-screen md:w-1/2 md:justify-center md:items-center">
      <div onClick={() => navigate("/intro-slide")} className="">
        <div className="absolute top-8 flex items-center justify-center">
          <i className="text-2xl font-bold ri-arrow-left-long-line"></i>
        </div>
        <div className="flex flex-col items-center justify-center  ">
          <h1 className="text-4xl  font-bold">
            Ride<span className=" text-lime-500">X</span>{" "}
          </h1>
        </div>
      </div>
      <div className="bg-white w-full flex flex-col items-center justify-center pt-12 ">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="text-lg  text-gray-500">Login to continue your rides</p>
        </div>

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="w-full"
        >
          <div className="flex flex-row  bg-[#eeeeee] gap-3 mt-12 mb-4 py-3 px-4 border-1 border-gray-500 mb-3 rounded-xl">
            {/* <label className="text-xl font-semibold mb-2 " htmlFor="email">
              What's Your Email
            </label> */}
            <i className="text-xl font-medium ri-mail-open-line"></i>
            <input
              className="outline-none placeholder:text-base "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
              placeholder="Email"
            />
          </div>
          <div className="flex flex-row bg-[#eeeeee] gap-3 py-3 px-4 border-1 border-gray-500 mb-3 rounded-xl">
            {/* <label className="text-xl font-semibold mb-2 " htmlFor="password">
              Password
            </label> */}
            <i className="text-xl font-medium ri-lock-2-line"></i>
            <input
              className="outline-none placeholder:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
              placeholder="Password"
            />
          </div>
          <div className="flex items-end justify-end">
            <p className="text-lime-500 text-xl">Forgot Password?</p>
          </div>
          <button
            type="submit"
            className="bg-black w-full text-center text-white text-xl mb-3 py-3 px-4 rounded-xl flex items-center justify-center mt-6"
          >
            Login
          </button>
        </form>
      </div>

      <div className="flex flex-row justify-center items-center mt-8">
        <div className="border border-gray-500 w-1/4"></div>
        <p className="w-2/4 text-center text-gray-500">or continue with</p>
        <div className="border border-gray-500 w-1/4"></div>
      </div>

      <div className="flex flex-row justify-evenly items-center  mt-8 w-full">
        <img
          className="border border-gray-500 rounded-xl h-15 w-20"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrypkO6dd007XYmaqp2snVjTWdQJNx3Gpcug&s"
        />
        <img
          className="border border-gray-500 rounded-xl h-15 w-20"
          src="https://sp-ao.shortpixel.ai/client/to_webp,q_lossless,ret_img,w_1080,h_675/https://graphicdesignergeeks.com/wp-content/uploads/2024/03/Audi-Featured-Image-1080x628.jpg"
        />

        <img
          className="border border-gray-500 rounded-xl h-15 w-20"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNCd-P99Pf0eFEqOKzLoyQAUye0V9_COPD7w&s"
        />
      </div>

      <div className="mt-8">
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/user-signup" className="text-lime-500 font-semibold ">
            Sign up
          </Link>
        </p>
      </div>

      {/* <div className="">
        <Link
          to="/captain-login"
          className="bg-[#1A3263] w-full text-center text-white text-xl  py-2 px-4 rounded-lg flex items-center justify-center mt-6"
        >
          Login as a Captain
        </Link>
      </div> */}
    </div>
  );
};

export default UserLogin;
