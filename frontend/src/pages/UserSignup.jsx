import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import Navbar from "../components/Navbar";
import { FcGoogle } from "react-icons/fc";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
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
        {/* Left Side - Desktop Hero */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center pr-8">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-5xl font-bold text-white">Join RideX</h1>
            <p className="text-xl text-text-secondary">
              Create an account and start booking rides today
            </p>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full md:w-1/2 max-w-md">
          <form onSubmit={submitHandler} className="space-y-5">
            {/* Header */}
            <div className="md:hidden text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Create Account
              </h2>
              <p className="text-text-secondary">Join millions of riders</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
                <i className="ri-error-warning-line text-xl text-red-500 flex-shrink-0 mt-0.5"></i>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-text-primary"
                >
                  First Name
                </label>
                <div className="relative flex items-center">
                  <i className="ri-user-3-line absolute left-4 text-lg text-primary"></i>
                  <input
                    className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    id="firstname"
                    required
                    placeholder="John"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-text-primary"
                >
                  Last Name
                </label>
                <div className="relative flex items-center">
                  <i className="ri-user-3-line absolute left-4 text-lg text-primary"></i>
                  <input
                    className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    id="lastname"
                    required
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary"
              >
                Email Address
              </label>
              <div className="relative flex items-center">
                <i className="ri-mail-open-line absolute left-4 text-lg text-primary"></i>
                <input
                  className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  required
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-primary"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <i className="ri-lock-2-line absolute left-4 text-lg text-primary"></i>
                <input
                  className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-smooth"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  required
                  placeholder="••••••••"
                />
              </div>
              <p className="text-xs text-text-muted">
                Must be at least 6 characters
              </p>
            </div>

            {/* Agreement */}
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

            {/* Signup Button */}
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
                  <span>Create Account</span>
                  <i className="ri-arrow-right-line"></i>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center gap-4 py-4">
              <div className="flex-1 h-px bg-dark-700"></div>
              <span className="text-xs text-text-muted uppercase font-semibold">
                Or
              </span>
              <div className="flex-1 h-px bg-dark-700"></div>
            </div>

            {/* Google Signup */}
            <button
              type="button"
              className="btn btn-secondary w-full py-3 gap-2 text-base font-semibold"
            >
              <FcGoogle className="text-2xl" />
              <span>Sign up with Google</span>
            </button>

            {/* Login Link */}
            <p className="text-center text-text-secondary text-sm">
              Already have an account?{" "}
              <Link
                to="/user-login"
                className="text-primary hover:text-primary-dark font-semibold transition-smooth"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
