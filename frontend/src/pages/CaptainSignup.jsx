import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CapatinContext";
import axios from "axios";
import PremiumNavbar from "../components/PremiumNavbar";
import {
  PremiumCard,
  PremiumInput,
  LoadingSpinner,
} from "../components/PremiumComponents";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const captainData = {
        fullName: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        },
        email: email.trim(),
        password,
        vehicle: {
          vehicleType,
          color: vehicleColor.trim(),
          plate: vehiclePlate.trim(),
          capacity: Number(vehicleCapacity),
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
    } catch (err) {
        console.log("Signup error:", err.response?.data);

      const apiErrors = err.response?.data?.errors;

      if (apiErrors && apiErrors.length > 0) {
        setError(apiErrors[0].msg);
      } else {
        setError(
          err.response?.data?.message || "Signup failed. Please try again.",
        );
      }
    } finally {
      setLoading(false);

      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setVehicleColor("");
      setVehiclePlate("");
      setVehicleCapacity("");
      setVehicleType("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Navbar */}
      <div className="sticky top-0 z-40">
        <PremiumNavbar userType="captain" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-8 py-8 md:py-0">
        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center pr-8">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-5xl font-bold text-white">Become a Driver</h1>

            <p className="text-xl text-slate-400">
              Start earning with flexible schedules
            </p>
          </div>
        </div>

        {/* Signup Form */}
        <div className="w-full md:w-1/2 max-w-md">
          <PremiumCard className="space-y-5">
            <div className="md:hidden text-center mb-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Join as Captain
              </h2>
              <p className="text-slate-400">Create your driver account</p>
            </div>

            {error && (
              <div className="bg-red-950/40 border border-red-500/50 rounded-xl p-4 flex items-start gap-3">
                <i className="ri-error-warning-line text-xl text-red-500 flex-shrink-0 mt-0.5"></i>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={submitHandler} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <PremiumInput
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />

                <PremiumInput
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <PremiumInput
                label="Email Address"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />

              <PremiumInput
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />

              <div className="pt-4 space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Vehicle Information
                </h3>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Vehicle Type
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400 transition"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    required
                  >
                    <option value="">Select vehicle type</option>
                    <option value="car">Car</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="auto">Auto Rickshaw</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <PremiumInput
                    placeholder="Color (e.g., White)"
                    value={vehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
                    required
                  />

                  <PremiumInput
                    placeholder="Plate Number"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Passenger Capacity
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-400 transition"
                    value={vehicleCapacity}
                    onChange={(e) => setVehicleCapacity(e.target.value)}
                    required
                  >
                    <option value="">Select capacity</option>
                    <option value="1">1 Passenger</option>
                    <option value="4">4 Passengers</option>
                    <option value="5">5 Passengers</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input
                  type="checkbox"
                  id="agreement"
                  required
                  className="w-5 h-5 mt-1 accent-indigo-500 rounded"
                />
                <label
                  htmlFor="agreement"
                  className="text-xs sm:text-sm text-slate-400"
                >
                  I agree to the{" "}
                  <a href="#" className="text-indigo-300 hover:text-indigo-200">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-indigo-300 hover:text-indigo-200">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl py-3 bg-indigo-600 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed mt-2 shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-500"
              >
                {loading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <span>Create Captain Account</span>
                )}
              </button>

              <p className="text-center text-slate-400 text-sm">
                Already have an account?{" "}
                <Link
                  to="/captain-login"
                  className="text-indigo-300 hover:text-indigo-200 font-semibold transition"
                >
                  Sign In
                </Link>
              </p>

              <div className="relative flex items-center gap-4 py-4">
                <div className="flex-1 h-px bg-slate-700"></div>
                <span className="text-xs text-slate-500 uppercase font-semibold">
                  Or
                </span>
                <div className="flex-1 h-px bg-slate-700"></div>
              </div>

              <Link
                to="/user-signup"
                className="w-full rounded-xl py-3 border border-slate-700 bg-slate-900 text-white flex items-center justify-center transition hover:bg-slate-800"
              >
                Sign up as a Rider instead
              </Link>
            </form>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
