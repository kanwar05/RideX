import React, { useState } from "react";
import slide1 from "../assets/rideximg/slide1.jpeg";
import { useNavigate } from "react-router-dom";
import PremiumNavbar from "../components/PremiumNavbar";
import { PiCarProfile } from "react-icons/pi";

import { CiUser } from "react-icons/ci";

const IntroSlide = () => {
  return (
    <div className="relative h-screen w-screen flex flex-col  p-6">
      <div>
        <PremiumNavbar />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="bg-gradient h-[20%] w-full rounded-xl p-4 flex items-center justify-center  ">
          <PiCarProfile className="text-7xl bg-transparent text-white" />
        </div>
        <div className="bg-gradient h-[20%] w-full rounded-xl p-4 flex items-center justify-center  ">
          <CiUser className="text-7xl text-white bg-transparent" />
        </div>
      </div>
    </div>
  );
};

export default IntroSlide;
