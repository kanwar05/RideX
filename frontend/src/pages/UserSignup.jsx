import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import PremiumNavbar from "../components/PremiumNavbar";
import {
  PremiumCard,
  PremiumInput,
  Toast,
  LoadingSpinner,
} from "../components/PremiumComponents";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
        setShowToast(true);
        setTimeout(() => navigate("/home"), 1500);
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
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-950 to-dark-950">
      <PremiumNavbar userType="user" />

      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 safe-area-bottom">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Ride<span className="text-gradient-animated">X</span>
            </h1>
            <p className="text-text-muted">Join millions of riders</p>
          </div>

          {/* Signup Card */}
          <PremiumCard className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Create Account</h2>

            {/* Error Toast */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex items-start gap-3 animate-slide-up">
                <i className="ri-error-warning-line text-xl text-red-500 flex-shrink-0 mt-0.5"></i>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={submitHandler} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">
                    First Name
                  </label>
                  <PremiumInput
                    type="text"
                    placeholder="John"
                    icon={FaUser}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">
                    Last Name
                  </label>
                  <PremiumInput
                    type="text"
                    placeholder="Doe"
                    icon={FaUser}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">
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
                <label className="block text-sm font-medium text-text-muted mb-2">
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
                <p className="text-xs text-text-muted mt-2">
                  Must be at least 6 characters
                </p>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start gap-3 py-2">
                <input
                  type="checkbox"
                  id="agreement"
                  required
                  className="w-4 h-4 mt-1 accent-primary rounded cursor-pointer"
                />
                <label
                  htmlFor="agreement"
                  className="text-xs sm:text-sm text-text-muted"
                >
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-premium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <i className="ri-arrow-right-line"></i>
                  </>
                )}
              </button>
            </form>

            <div className="divider-subtle"></div>

            {/* Google Signup */}
            <button
              type="button"
              className="w-full py-3 rounded-lg glass-lg hover-lift font-medium transition-all flex items-center justify-center gap-3"
            >
              <FcGoogle className="text-xl" />
              <span>Sign up with Google</span>
            </button>

            {/* Login Link */}
            <p className="text-center text-text-muted text-sm">
              Already have an account?{" "}
              <Link
                to="/user-login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </PremiumCard>

          {/* Footer */}
          <p className="text-center text-text-muted text-xs mt-6">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message="Account created! Redirecting..."
          type="success"
          autoClose={false}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default UserSignup;
