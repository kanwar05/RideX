import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({ email: email, password: password });
    console.log("Captain Data:", { email: email, password: password });
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div className="bg-white w-full flex flex-col ">
        <div className="text-4xl text-black mb-5 font-medium">Uber</div>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className=""
        >
          <div className="flex flex-col gap-2">
            <label className="text-xl font-semibold mb-2 " htmlFor="email">
              What's Your Email
            </label>
            <input
              className="bg-[#eeeeee] py-2 px-4 border-1 mb-3 rounded placeholder:text-base "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          Join new fleet?{" "}
          <Link to="/captain-signup" className="text-blue-600 ">
            Register as a Captain
          </Link>
        </p>
      </div>

      <div className="">
        <Link
          to="/user-login"
          className="bg-[#E37434] w-full text-center text-white text-xl  py-2 px-4 rounded-lg flex items-center justify-center mt-6"
        >
          Login as a User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
