import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock } from "react-icons/fa";
import PremiumNavbar from "../components/PremiumNavbar";
import {
  PremiumCard,
  PremiumInput,
  Toast,
  LoadingSpinner,
} from "../components/PremiumComponents";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userData = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData,
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        setShowToast(true);
        setTimeout(() => navigate("/home"), 1500);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <PremiumNavbar userType="user" />

      <div className="flex items-center justify-center min-h-screen px-4 py-20 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl text-white font-bold mb-2">
              Ride<span className="text-indigo-300">X</span>
            </h1>
            <p className="text-slate-400">
              Premium ridesharing experience
            </p>
          </div>

          {/* Login Card */}
          <PremiumCard className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">
              Welcome Back
            </h2>

            {/* Error Toast */}
            {error && (
              <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                <i className="ri-error-warning-line text-xl text-red-500 flex-shrink-0 mt-0.5"></i>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={submitHandler} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email
                </label>
                <PremiumInput
                  type="email"
                  placeholder="your@email.com"
                  icon={FaEnvelope}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Password
                </label>
                <PremiumInput
                  type="password"
                  placeholder="••••••••"
                  icon={FaLock}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-indigo-300 hover:text-indigo-200 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-500 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <i className="ri-arrow-right-line"></i>
                  </>
                )}
              </button>
            </form>

            <div className="relative flex items-center gap-4 py-4">
              <div className="flex-1 h-px bg-slate-700"></div>
              <span className="text-xs text-white/60 uppercase font-semibold">
                Or
              </span>
              <div className="flex-1 h-px bg-slate-700"></div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="w-full py-3 rounded-xl border border-slate-700 bg-slate-900 font-medium transition hover:bg-slate-800 flex items-center justify-center gap-3"
            >
              <FcGoogle className="text-xl" />
              <span className="text-white/80">Continue with Google</span>
            </button>

            {/* Signup Link */}
            <p className="text-center text-white/80 text-sm">
              Don't have an account?{" "}
              <Link
                to="/user-signup"
                className="text-indigo-300 hover:text-indigo-200 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </PremiumCard>

          {/* Footer */}
          <p className="text-center text-white/80 text-xs mt-6">
            By signing in, you agree to our{" "}
            <a href="#" className="text-indigo-300 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-indigo-300 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message="Login successful! Redirecting..."
          type="success"
          autoClose={false}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default UserLogin;
