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

  const navItems =
    userType === "captain"
      ? [
          { label: "Home", path: "/captain-home", icon: "ri-home-line" },
          { label: "Profile", path: "/captain-profile", icon: "ri-user-line" },
          {
            label: "Earnings",
            path: "/captain-earnings",
            icon: "ri-wallet-line",
          },
        ]
      : [
          { label: "Home", path: "/", icon: "ri-home-line" },
          { label: "Rides", path: "/rides", icon: "ri-ride-sharing-2-line" },
          { label: "Profile", path: "/profile", icon: "ri-user-line" },
        ];

  return (
    <>
      {/* Premium Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 p-2 ${isScrolled ? "glass-sm shadow-sm backdrop-blur-sm" : "bg-transparent"} transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer group transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/")}
            >
              <div className="block">
                <h1 className="text-2xl font-bold text-gradient-animated">
                  RideX
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
                      ? "text-primary"
                      : "text-text-muted hover:text-text-main"
                  }`}
                >
                  <i className={item.icon}></i>
                  <span className="text-sm font-medium">{item.label}</span>

            {/* Animated Active Indicator */}
            {isActive(item.path) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse-soft"></div>
                  )}

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>

            {/* Right Section - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  <button className="p-2.5 rounded-lg hover-lift text-text-muted hover:text-text-main transition-colors">
                    <i className="ri-notification-line text-lg"></i>
                  </button>
                  <button
                    onClick={() => navigate("/profile")}
                    className="p-2.5 rounded-lg glass-sm hover-lift text-text-muted hover:text-text-main transition-colors"
                  >
                    <FaUser className="text-lg" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/user-login")}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover-lift shadow-glow-md transition-all duration-300"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg glass-sm hover-lift text-text-main transition-all"
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
            <div className="md:hidden pb-4 animate-slide-up bg-blur-lg rounded-lg glass-lg text-black">
              <div className="space-y-2 py-4 border-t border-border">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-medium"
                        : "text-text-muted hover:text-text-main hover:bg-surface-hover"
                    }`}
                  >
                    <i className={`${item.icon} text-lg`}></i>
                    <span>{item.label}</span>
                  </button>
                ))}

                <div className="pt-2 border-t border-border">
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
                </div>
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
