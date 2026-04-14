import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CapatinContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        vehicleType: vehicleType,
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData,
    );

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
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

          <div className="flex flex-col gap-2 mt-4">
            <label className="text-lg mb-1">Vehicle Information</label>
            <div className="flex gap-4">
              <select
                className="bg-[#eeeeee]  w-1/2 py-2 px-4 border-1 rounded placeholder:text-base"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                required
              >
                <option value="">Vehicle Type</option>
                <option value="car">Car</option>
                <option value="moto">Moto</option>
                <option value="auto">Auto</option>
              </select>

              <input
                className="bg-[#eeeeee] w-1/2 py-2 px-4 border-1 rounded placeholder:text-base"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                type="text"
                placeholder="Vehicle Color"
                required
              />
            </div>
            <div className="flex gap-4">
              <input
                className="bg-[#eeeeee] w-1/2 py-2 px-4 border-1 rounded placeholder:text-base"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                type="text"
                placeholder="Vehicle Plate"
                required
              />
              <input
                className="bg-[#eeeeee] w-1/2 py-2 px-4 border-1 rounded placeholder:text-base"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                type="number"
                placeholder="Vehicle Capacity"
                required
              />
            </div>
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
