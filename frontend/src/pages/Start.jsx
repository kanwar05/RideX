import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const Start = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-dark-900 via-dark-950 to-dark-950 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
      </div>

      <div className="relative flex flex-col justify-between min-h-screen px-4 sm:px-6 py-8 sm:py-12 md:px-8">
        {/* Header */}
        <div className="flex items-center justify-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Ride<span className="text-primary">X</span>
          </h1>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center md:hidden w-full py-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Go Anywhere
            </h2>
            <p className="text-text-secondary text-lg sm:text-xl">
              Your ride awaits. Get started now.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full space-y-4 pb-safe">
          <div className="space-y-3 md:space-y-4">
            <Link
              to="/user-login"
              className="btn btn-primary w-full justify-center gap-3 text-base sm:text-lg py-3 sm:py-4"
            >
              <span>Get Started as Rider</span>
              <FaArrowRight className="text-lg" />
            </Link>

            <Link
              to="/captain-login"
              className="btn btn-secondary w-full justify-center gap-3 text-base sm:text-lg py-3 sm:py-4"
            >
              <span>Drive with RideX</span>
              <FaArrowRight className="text-lg" />
            </Link>
          </div>

          <p className="text-center text-text-muted text-xs sm:text-sm py-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Desktop Hero Section */}
        <div className="hidden md:flex absolute inset-0 items-center justify-end overflow-hidden pointer-events-none">
          <div className="w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Start;
