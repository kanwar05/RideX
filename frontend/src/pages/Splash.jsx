import React, { useEffect } from "react";
import splashimg from "../assets/rideximg/splashimg.jpeg";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/intro-slide"), 2500);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black text-white flex flex-col md:flex-row  ">
      <div className="flex flex-col items-center justify-center h-1/3 md:h-full md:w-1/2  ">
        <h1 className="text-7xl md:text-9xl font-bold">
          Ride <span className=" text-lime-400">X</span>{" "}
        </h1>
        <p className="mt-3 md:text-3xl text-gray-400">Your Ride, Your Way</p>
      </div>
      <div className="absolute bottom-0 flex flex-col items-center justify-center h-2/3  md:h-full md:w-1/2 md:right-0  ">
        <img className="h-full md:h-1/2 w-screen " src={splashimg} />
      </div>
    </div>
  );
};

export default Splash;
