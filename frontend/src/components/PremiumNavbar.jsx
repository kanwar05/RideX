import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaCog } from "react-icons/fa";
import "remixicon/fonts/remixicon.css";

/**
 * Premium Navbar Component
 * - Glassmorphic design with backdrop blur
 * - Scroll-triggered blur effect
 * - Smooth mobile menu transitions
 * - Animated active indicators
 * - Premium hover states
 */
const PremiumNavbar = ({ userType = "user" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const isActive = (path) => location.pathname === path;

  const profilePath = userType === "captain" ? "/captain-profile" : "/profile";
  const navItems =
    userType === "captain"
      ? [
          { label: "Home", path: "/captain-home", icon: "ri-home-line" },
          { label: "Profile", path: "/captain-profile", icon: "ri-user-line" },
        ]
      : [
          { label: "Home", path: "/home", icon: "ri-home-line" },
          { label: "Profile", path: "/profile", icon: "ri-user-line" },
        ];

  return (
    <>
      {/* Premium Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 p-2 ${isScrolled ? "bg-slate-950/90 shadow-lg shadow-black/20 backdrop-blur-md border-b border-slate-800" : "bg-slate-900 backdrop-blur-sm"} transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer group transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/")}
            >
              <div className="block">
                <h1 className="text-2xl font-bold text-white">
                  Ride <span className="text-indigo-600">X</span>
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 relative group ${
                    isActive(item.path)
                      ? "bg-indigo-500/15 text-indigo-200"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <i className={item.icon}></i>
                  <span className="text-sm font-medium">{item.label}</span>

                  {/* Animated Active Indicator */}
                  {isActive(item.path) && (
                    <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-indigo-400 rounded-full"></div>
                  )}

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>

            {/* Right Section - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  <button className="p-2.5 rounded-lg text-slate-300 transition-colors hover:bg-white/10 hover:text-white">
                    <i className="ri-notification-line text-lg"></i>
                  </button>
                  <button
                    onClick={() => navigate(profilePath)}
                    className="p-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                  >
                    <FaUser className="text-lg" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/user-login")}
                  className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-500"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-indigo-700 bg-indigo-600 text-white transition-all hover:bg-indigo-400"
            >
              {mobileMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 rounded-2xl border border-slate-800 bg-slate-950 p-2 text-white shadow-2xl shadow-black/30">
              <div className="space-y-2 py-2">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-indigo-500/15 text-indigo-200 font-medium"
                        : "text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <i className={`${item.icon} text-lg`}></i>
                    <span>{item.label}</span>
                  </button>
                ))}

                {/* <div className="pt-2 border-t border-border">
                  {isLoggedIn ? (
                    <>
                      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-text-muted hover:text-text-main hover:bg-surface-hover transition-all">
                        <i className="ri-notification-line text-lg"></i>
                        <span>Notifications</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-text-muted hover:text-text-main hover:bg-surface-hover transition-all"
                      >
                        <FaUser className="text-lg" />
                        <span>Profile</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        navigate("/user-login");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover-lift transition-all"
                    >
                      Sign In
                    </button>
                  )}
                </div> */}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer */}
      {/* <div className="h-20 safe-area-top"></div> */}
    </>
  );
};

export default PremiumNavbar;
