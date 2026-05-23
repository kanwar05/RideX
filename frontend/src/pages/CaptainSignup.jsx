import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CapatinContext";
import axios from "axios";
import Navbar from "../components/Navbar";

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
          firstName,
          lastName,
        },
        email,
        password,
        vehicle: {
          vehicleType,
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
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again.",
      );
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
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-950 to-dark-950 flex flex-col">
      {/* Navbar */}
      <div className="safe-area-inset sticky top-0 z-40 bg-dark-950/80 backdrop-blur-sm border-b border-dark-700">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-8 py-8 md:py-0">
        {/* Left Side */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center pr-8">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-5xl font-bold text-white">Become a Driver</h1>

            <p className="text-xl text-text-secondary">
              Start earning with flexible schedules
            </p>
          </div>
        </div>

        {/* Signup Form */}
        <div className="w-full md:w-1/2 max-w-md">
          <form onSubmit={submitHandler} className="space-y-5">
            {/* Mobile Header */}
            <div className="md:hidden text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Join as Captain
              </h2>

              <p className="text-text-secondary">Create your driver account</p>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
                <i className="ri-error-warning-line text-xl text-red-500 flex-shrink-0 mt-0.5"></i>

                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                Full Name
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative flex items-center">
                  <i className="ri-user-3-line absolute left-4 text-lg text-primary"></i>

                  <input
                    className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    required
                    placeholder="First name"
                  />
                </div>

                <div className="relative flex items-center">
                  <i className="ri-user-3-line absolute left-4 text-lg text-primary"></i>

                  <input
                    className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    required
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                Email Address
              </label>

              <div className="relative flex items-center">
                <i className="ri-mail-open-line absolute left-4 text-lg text-primary"></i>

                <input
                  className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                Password
              </label>

              <div className="relative flex items-center">
                <i className="ri-lock-2-line absolute left-4 text-lg text-primary"></i>

                <input
                  className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  placeholder="••••••••"
                />
              </div>

              <p className="text-xs text-text-muted">
                Must be at least 6 characters
              </p>
            </div>

            {/* Vehicle Section */}
            <div className="pt-4 space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Vehicle Information
              </h3>

              {/* Vehicle Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-primary">
                  Vehicle Type
                </label>

                <select
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  required
                >
                  <option value="">Select vehicle type</option>
                  <option value="car">Car</option>
                  <option value="moto">Motorcycle</option>
                  <option value="auto">Auto Rickshaw</option>
                </select>
              </div>

              {/* Color + Plate */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-primary">
                    Color
                  </label>

                  <input
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
                    value={vehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
                    type="text"
                    placeholder="e.g., White"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-primary">
                    Plate Number
                  </label>

                  <input
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth uppercase"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    type="text"
                    placeholder="AB12CD1234"
                    required
                  />
                </div>
              </div>

              {/* Capacity */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-primary">
                  Passenger Capacity
                </label>

                <select
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
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

            {/* Terms */}
            <div className="flex items-start gap-3 py-2">
              <input
                type="checkbox"
                id="agreement"
                required
                className="w-5 h-5 mt-1 accent-primary rounded"
              />

              <label
                htmlFor="agreement"
                className="text-xs sm:text-sm text-text-secondary"
              >
                I agree to the{" "}
                <a href="#" className="text-primary hover:text-primary-dark">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:text-primary-dark">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3 text-base font-semibold disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  Creating Account...
                </>
              ) : (
                <>
                  <span>Create Captain Account</span>
                  <i className="ri-arrow-right-line"></i>
                </>
              )}
            </button>

            {/* Login */}
            <p className="text-center text-text-secondary text-sm">
              Already have an account?{" "}
              <Link
                to="/captain-login"
                className="text-primary hover:text-primary-dark font-semibold transition-smooth"
              >
                Sign In
              </Link>
            </p>

            {/* Divider */}
            <div className="relative flex items-center gap-4 py-4">
              <div className="flex-1 h-px bg-dark-700"></div>

              <span className="text-xs text-text-muted uppercase font-semibold">
                Or
              </span>

              <div className="flex-1 h-px bg-dark-700"></div>
            </div>

            {/* Rider Signup */}
            <Link
              to="/user-signup"
              className="btn btn-secondary w-full py-3 text-base font-semibold flex items-center justify-center"
            >
              Sign up as a Rider instead
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
