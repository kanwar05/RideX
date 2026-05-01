import React, { useEffect } from "react";
import splashimg from "../assets/rideximg/splashimg.jpeg";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/intro-slide"), 2500);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black text-white flex flex-col  ">
      <div className="flex flex-col items-center justify-center h-1/3">
        <h1 className="text-7xl font-bold">
          Ride <span className="text-lime-400">X</span>{" "}
        </h1>
        <p className="mt-3 text-gray-400">Your Ride, Your Way</p>
      </div>
      <div className="absolute bottom-0 flex flex-col items-center justify-start h-2/3">
        <img className=" h-full w-screen " src={splashimg} />
      </div>
    </div>
  );
};

export default Splash;
