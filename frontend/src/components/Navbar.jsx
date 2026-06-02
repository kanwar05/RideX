import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ props }) => {
  const navigate = useNavigate();

  return (
    <nav className="p-2 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer transition hover:opacity-80"
          onClick={() => navigate("/")}
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Ride<span className="text-indigo-300">X</span>
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Menu can be added here for future expansion */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
