import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      userName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    });

    console.log("User Data:", {
      userName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div className="bg-white w-full flex flex-col ">
        <div className="text-4xl text-black mb-5 font-medium">Uber</div>
        <form
          className=""
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="flex flex-col mb-2 gap-2">
            <h1 className="text-xl font-semibold mb-2">Sign Up as a Captain</h1>
            <label className="text-lg mb-1 " htmlFor="email">
              What's Your Name
            </label>
            <div className="flex gap-4">
              <input
                className="bg-[#eeeeee] w-1/2 py-2 px-4 border-1 rounded placeholder:text-base "
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                id="firstName"
                required
                placeholder="First Name"
              />
              <input
                className="bg-[#eeeeee] w-1/2 py-2 px-4 border-1 rounded placeholder:text-base "
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                id="lastName"
                required
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg mb-1 " htmlFor="email">
              What's Your Email
            </label>
            <input
              className="bg-[#eeeeee] py-2 px-4 border-1 rounded placeholder:text-base "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
              placeholder="email@example.com"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4 ">
            <label className="text-lg mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="bg-[#eeeeee] py-2 px-4 border-1 rounded placeholder:text-base"
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
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600 ">
            Login as a captiain
          </Link>
        </p>
      </div>

      <div className="">
        <Link
          to="/user-login"
          className="bg-[#1A3263] w-full text-center text-white text-xl  py-2 px-4 rounded-lg flex items-center justify-center mt-6"
        >
          Login as a User
        </Link>
      </div>
    </div>
  );
};

export default CaptainSignup;
