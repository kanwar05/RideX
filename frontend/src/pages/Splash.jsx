import React, { useEffect } from "react";
import splashimg from "../assets/rideximg/splashimg.jpeg";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/start"), 2500);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 text-white flex flex-col md:flex-row">
      <div className="relative z-10 flex flex-col items-center justify-center h-1/3 md:h-full md:w-1/2 px-6 text-center">
        <h1 className="text-7xl md:text-9xl font-bold tracking-tight">
          Ride <span className="text-indigo-300">X</span>{" "}
        </h1>
        <p className="mt-3 text-lg md:text-3xl text-slate-300">Your Ride, Your Way</p>
      </div>
      <div className="absolute bottom-0 flex flex-col items-center justify-end h-2/3 md:h-full md:w-1/2 md:right-0">
        <img className="h-full w-screen object-cover opacity-80 md:h-full" src={splashimg} />
      </div>
    </div>
  );
};

export default Splash;
