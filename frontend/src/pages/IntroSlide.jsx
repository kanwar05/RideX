import React, { useState } from "react";
import slide1 from "../assets/rideximg/slide1.jpeg";
import { useNavigate } from "react-router-dom";
import PremiumNavbar from "../components/PremiumNavbar";
import { PiCarProfile } from "react-icons/pi";

import { CiUser } from "react-icons/ci";
import { PremiumCard } from "../components/PremiumComponents";

const IntroSlide = () => {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen w-screen flex flex-col  p-6 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-950">
      <div>
        <PremiumNavbar />
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12">
        <div
          onClick={() => {
            navigate("/captain-login");
          }}
        >
          <PremiumCard className="flex flex-col items-center gap-4 h-30 w-72 cursor-pointer">
            <PiCarProfile className="text-7xl bg-transparent text-white" />
            <h1 className="text-xl  font-normal text-gradient-animated">
              Driver
            </h1>
          </PremiumCard>
        </div>

        <div
          onClick={() => {
            navigate("/user-login");
          }}
        >
          <PremiumCard className="flex flex-col items-center gap-4 h-30 w-72 cursor-pointer">
            <CiUser className="text-7xl text-white text-bold bg-transparent" />
            <h1 className="text-xl font-normal text-gradient-animated">
              Rider
            </h1>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
};

export default IntroSlide;
