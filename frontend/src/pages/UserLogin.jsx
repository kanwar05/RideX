import React from "react";
import { Form, Link } from "react-router-dom";

const UserLogin = () => {
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div className="bg-white w-full flex flex-col ">
        <div className="text-4xl text-black mb-5 font-medium">Uber</div>
        <form className="">
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold mb-2 " htmlFor="email">
              What's Your Email
            </label>
            <input
              className="bg-[#eeeeee] py-2 px-4 border-1 mb-3 rounded placeholder:text-base "
              type="email"
              id="email"
              required
              placeholder="email@example.com"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-xl font-semibold mb-2 " htmlFor="password">
              Password
            </label>
            <input
              className="bg-[#eeeeee] py-2 px-4 border-1 mb-3 rounded placeholder:text-base"
              type="password"
              id="password"
              required
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-black w-full text-center text-white text-xl mb-3 py-2 px-4 rounded-lg flex items-center justify-center mt-6"
          >
            Login
          </button>
        </form>
        <p className="text-center">
          New here?{" "}
          <Link to="/user-signup" className="text-blue-600 ">
            Create new account
          </Link>
        </p>
      </div>

      <div className="">
        <button className="bg-[#276EF1] w-full text-center text-white text-xl  py-2 px-4 rounded-lg flex items-center justify-center mt-6">
          Login as a captain
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
