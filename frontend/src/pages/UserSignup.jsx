import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser,
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

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
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold mb-2">Sign Up as a User</h1>
            <label className="text-lg  mb-1 " htmlFor="email">
              What's Your Name
            </label>
            <div className="flex gap-4">
              <input
                className="bg-[#eeeeee] w-1/2 py-2 px-4 border-1 mb-3 rounded placeholder:text-base "
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                id="firstName"
                required
                placeholder="First Name"
              />
              <input
                className="bg-[#eeeeee] w-1/2 py-2 px-4 border-1 mb-3 rounded placeholder:text-base "
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
            <label className="text-lg  mb-1 " htmlFor="email">
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
            <label className="text-lg  mb-1 " htmlFor="password">
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
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/user-login" className="text-blue-600 ">
            Login as a User
          </Link>
        </p>
      </div>

      <div className="">
        <Link
          to="/captain-signup"
          className="bg-[#1A3263] w-full text-center text-white text-xl  py-2 px-4 rounded-lg flex items-center justify-center mt-6"
        >
          Signup as a Captain
        </Link>
      </div>
    </div>
  );
};

export default UserSignup;
