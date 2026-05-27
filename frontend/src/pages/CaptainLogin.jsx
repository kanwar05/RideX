import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CapatinContext";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import PremiumNavbar from "../components/PremiumNavbar";
import {
  PremiumCard,
  PremiumInput,
  LoadingSpinner,
  Toast,
} from "../components/PremiumComponents";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

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
        setShowToast(true);
        setTimeout(() => navigate("/captain-home"), 1200);
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
        <PremiumNavbar userType="captain" />
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
          <PremiumCard className="space-y-6">
            <div className="md:hidden text-center mb-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Captain Sign In
              </h2>
              <p className="text-text-secondary">Start earning with RideX</p>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
                <i className="ri-error-warning-line text-xl text-red-500 flex-shrink-0 mt-0.5"></i>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={submitHandler} className="space-y-4">
              <PremiumInput
                label="Email Address"
                placeholder="you@example.com"
                icon={FaEnvelope}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />

              <PremiumInput
                label="Password"
                placeholder="••••••••"
                icon={FaLock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />

              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary-dark transition-smooth"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <span>Sign In as Captain</span>
                )}
              </button>

              <div className="relative flex items-center gap-4 py-4">
                <div className="flex-1 h-px bg-dark-700"></div>
                <span className="text-xs text-text-muted uppercase font-semibold">
                  Or
                </span>
                <div className="flex-1 h-px bg-dark-700"></div>
              </div>

              <button
                type="button"
                className="w-full rounded-lg py-3 bg-slate-800 text-white flex items-center justify-center gap-2"
              >
                <FcGoogle className="text-2xl" />
                <span>Continue with Google</span>
              </button>

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

            <p className="text-center text-text-muted text-xs mt-2 md:mt-6">
              By signing in, you agree to our{" "}
              <a href="#" className="text-primary hover:text-primary-dark">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:text-primary-dark">
                Privacy Policy
              </a>
            </p>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;
