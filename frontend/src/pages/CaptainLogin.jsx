import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CapatinContext";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import Navbar from "../components/Navbar";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const captainData = { email: email, password: password };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captainData,
      );

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
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
            <h1 className="text-5xl font-bold text-white">Drive with RideX</h1>
            <p className="text-xl text-text-secondary">
              Earn money by driving on your own schedule
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 max-w-md">
          <form onSubmit={submitHandler} className="space-y-6">
            {/* Header */}
            <div className="md:hidden text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Captain Sign In
              </h2>
              <p className="text-text-secondary">Start earning with RideX</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
                <i className="ri-error-warning-line text-xl text-red-500 flex-shrink-0 mt-0.5"></i>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

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
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-primary hover:text-primary-dark transition-smooth"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3 text-base font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  Signing in...
                </>
              ) : (
                <>
                  <span>Sign In as Captain</span>
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

            {/* Google Login */}
            <button
              type="button"
              className="btn btn-secondary w-full py-3 gap-2 text-base font-semibold"
            >
              <FcGoogle className="text-2xl" />
              <span>Continue with Google</span>
            </button>

            {/* Signup Link */}
            <p className="text-center text-text-secondary text-sm">
              Don't have an account?{" "}
              <Link
                to="/captain-signup"
                className="text-primary hover:text-primary-dark font-semibold transition-smooth"
              >
                Sign up
              </Link>
            </p>
          </form>

          {/* Terms */}
          <p className="text-center text-text-muted text-xs mt-8 md:mt-6">
            By signing in, you agree to our{" "}
            <a href="#" className="text-primary hover:text-primary-dark">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:text-primary-dark">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;
