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
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0">
        {/* Primary gradient orb */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl opacity-60 animate-pulse-soft" />

        {/* Secondary gradient orb */}
        <div
          className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl opacity-50 animate-pulse-soft"
          style={{ animationDelay: "1s" }}
        />

        {/* Accent gradient orb */}
        <div
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-t from-accent/15 to-transparent rounded-full blur-3xl opacity-40 animate-pulse-soft"
          style={{ animationDelay: "2s" }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 safe-area-top">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Badge */}
            <div className="inline-block">
              <div className="badge-premium flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Premium Ride Experience</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span>Your Journey,</span>
                <br />
                <span className="text-gradient-animated">Elevated</span>
              </h1>
              <p className="text-xl text-text-muted max-w-xl leading-relaxed">
                Experience premium ridesharing with real-time tracking,
                professional drivers, and AI-optimized routes.
              </p>
            </div>

            {/* CTA Buttons with staggered animation */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/user-login"
                className="group btn-premium flex items-center justify-center gap-3 text-lg px-8 py-4 rounded-lg"
              >
                <span>Get Started as Rider</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/captain-login"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-lg glass-lg hover-lift text-white font-medium transition-all"
              >
                <span>Drive with RideX</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stats */}
            <div className="pt-8 border-t border-border grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-3xl font-bold text-gradient-animated">
                  50K+
                </p>
                <p className="text-sm text-text-muted">Active Drivers</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-gradient-animated">1M+</p>
                <p className="text-sm text-text-muted">Rides Completed</p>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-gradient-animated">
                  4.9★
                </p>
                <p className="text-sm text-text-muted">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Cards */}
          <div className="hidden lg:flex items-center justify-center relative h-[600px]">
            {/* Floating Ride Card 1 */}
            <div
              className="absolute premium-card w-80 shadow-glow-lg animate-float-panel"
              style={{
                top: "0%",
                left: "10%",
                animationDelay: "0s",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-text-muted">Next Ride</p>
                  <p className="text-2xl font-bold text-primary">Premium</p>
                </div>
                <FaStar className="text-accent text-xl" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">From</p>
                    <p className="font-medium">Downtown Center</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">To</p>
                    <p className="font-medium">Airport Terminal</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex justify-between text-sm">
                <span className="text-text-muted">12 mins away</span>
                <span className="text-primary font-bold">$24.50</span>
              </div>
            </div>

            {/* Floating Ride Card 2 */}
            <div
              className="absolute premium-card w-80 shadow-glow-lg animate-float-panel"
              style={{
                bottom: "10%",
                right: "5%",
                animationDelay: "1s",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-text-muted">Driver Rating</p>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-accent" />
                    <span className="text-lg font-bold">4.98</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=driver1"
                    alt="Driver"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-xs text-text-muted">Tesla Model 3</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2 rounded-lg bg-primary/20 text-primary text-sm font-medium hover:bg-primary/30 transition-colors">
                  Message
                </button>
                <button className="flex-1 py-2 rounded-lg bg-secondary/20 text-secondary text-sm font-medium hover:bg-secondary/30 transition-colors">
                  Call
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse-soft" />
              <div
                className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-2xl animate-pulse-soft"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-text-muted">Scroll to explore</p>
          <i className="ri-arrow-down-line text-lg text-primary"></i>
        </div>
      </div>
    </div>
  );
};

export default PremiumHeroSection;
