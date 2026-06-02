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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Navbar */}
      <div className="sticky top-0 z-40">
        <PremiumNavbar userType="captain" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-8 py-8 md:py-0">
        {/* Left Side - Desktop Hero */}
        <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center pr-8">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-5xl font-bold text-white">
              Drive with RideX
            </h1>
            <p className="text-xl text-slate-400">
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
              <p className="text-white/80">Start earning with RideX</p>
            </div>

            {error && (
              <div className="bg-red-950/40 border border-red-500/50 rounded-xl p-4 flex items-start gap-3">
                <i className="ri-error-warning-line text-xl text-red-500 flex-shrink-0 mt-0.5"></i>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email
                </label>
                <PremiumInput
                  placeholder="you@example.com"
                  icon={FaEnvelope}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Password
                </label>

                <PremiumInput
                  placeholder="••••••••"
                  icon={FaLock}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
              </div>

              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-indigo-300 hover:text-indigo-200 transition"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-500 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <span>Sign In as Captain</span>
                )}
              </button>

              <div className="relative flex items-center gap-4 py-4">
                <div className="flex-1 h-px bg-slate-700"></div>
                <span className="text-xs text-white/60 uppercase font-semibold">
                  Or
                </span>
                <div className="flex-1 h-px bg-slate-700"></div>
              </div>

              <button
                type="button"
                className="w-full py-3 rounded-xl border border-slate-700 bg-slate-900 font-medium transition hover:bg-slate-800 flex items-center justify-center gap-3"
              >
                <FcGoogle className="text-2xl" />
                <span className="text-white/80">Continue with Google</span>
              </button>

              <p className="text-center text-white/80 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/captain-signup"
                  className="text-indigo-300 font-semibold transition hover:text-indigo-200"
                >
                  Sign up
                </Link>
              </p>
            </form>

            <p className="text-center text-white/80 text-xs mt-2 md:mt-6">
              By signing in, you agree to our{" "}
              <a href="#" className="text-indigo-300">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-indigo-300">
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
