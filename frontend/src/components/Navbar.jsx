import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ props }) => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="flex flex-row w-full items-center justify-between cursor-pointer  ">
        <div className=" flex  flex-col  ">
          <h1 className="text-4xl  font-bold">
            Ride<span className=" text-lime-500">X</span>{" "}
          </h1>
        </div>
        <div className="  ">
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
