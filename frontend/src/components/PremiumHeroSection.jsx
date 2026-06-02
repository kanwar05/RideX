import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaMapMarkerAlt, FaClock, FaStar } from "react-icons/fa";
import "remixicon/fonts/remixicon.css";

/**
 * Premium Hero Section Component
 * - Animated gradient background overlays
 * - Floating ride cards with parallax
 * - Premium glassmorphism panels
 * - Staggered entrance animations
 * - Strong CTA hierarchy
 */
const PremiumHeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden text-white">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0">
        {/* Primary gradient orb */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl opacity-60 animate-pulse" />

        {/* Secondary gradient orb */}
        <div
          className="absolute top-1/3 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl opacity-50 animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Accent gradient orb */}
        <div
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl opacity-40 animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-block">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-700">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-200">
                  Premium Ride Experience
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-white">
                <span>Your Journey,</span>
                <br />
                <span className="text-indigo-300">
                  Elevated
                </span>
              </h1>
              <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
                Experience premium ridesharing with real-time tracking,
                professional drivers, and AI-optimized routes for your
                convenience.
              </p>
            </div>

            {/* CTA Buttons with staggered animation */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/user-login"
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold text-lg transition hover:bg-indigo-500 active:scale-[0.99] shadow-lg shadow-indigo-950/30"
              >
                <span>Get Started as Rider</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/captain-login"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-slate-700 bg-slate-900 text-slate-100 font-semibold text-lg hover:bg-slate-800 transition active:scale-[0.99]"
              >
                <span>Drive with RideX</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stats */}
            <div className="pt-8 border-t border-gray-700 grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-3xl font-bold text-indigo-300">
                  50K+
                </p>
                <p className="text-sm text-gray-400">Active Drivers</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-emerald-300">
                  1M+
                </p>
                <p className="text-sm text-gray-400">Rides Completed</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-amber-300">
                  4.9★
                </p>
                <p className="text-sm text-gray-400">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Cards */}
          <div className="hidden lg:flex items-center justify-center relative h-[600px]">
            {/* Floating Ride Card 1 */}
            <div
              className="absolute w-80 rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl shadow-black/30 transition hover:-translate-y-1"
              style={{
                top: "0%",
                left: "10%",
                animationDelay: "0s",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-400 font-medium">NEXT RIDE</p>
                  <p className="text-2xl font-bold text-indigo-300">
                    Premium
                  </p>
                </div>
                <FaStar className="text-yellow-400 text-xl" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">From</p>
                    <p className="font-medium text-white">Downtown Center</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">To</p>
                    <p className="font-medium text-white">Airport Terminal</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between text-sm">
                <span className="text-gray-400">12 mins away</span>
                <span className="text-emerald-300 font-bold">$24.50</span>
              </div>
            </div>

            {/* Floating Ride Card 2 */}
            <div
              className="absolute w-80 rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl shadow-black/30 transition hover:-translate-y-1"
              style={{
                bottom: "10%",
                right: "5%",
                animationDelay: "1s",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-400 font-medium">
                    DRIVER RATING
                  </p>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-400" />
                    <span className="text-lg font-bold text-white">4.98</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=driver1"
                    alt="Driver"
                    className="w-12 h-12 rounded-full border-2 border-purple-500"
                  />
                  <div>
                    <p className="font-medium text-white">Sarah Johnson</p>
                    <p className="text-xs text-gray-400">Tesla Model 3</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2 rounded-lg bg-indigo-500/15 text-indigo-200 text-sm font-medium hover:bg-indigo-500/25 transition-colors border border-indigo-500/30">
                  Message
                </button>
                <button className="flex-1 py-2 rounded-lg bg-emerald-500/15 text-emerald-200 text-sm font-medium hover:bg-emerald-500/25 transition-colors border border-emerald-500/30">
                  Call
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
              <div
                className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-gray-400">Scroll to explore</p>
          <i className="ri-arrow-down-line text-lg text-indigo-300"></i>
        </div>
      </div>
    </div>
  );
};

export default PremiumHeroSection;
