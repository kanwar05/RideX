import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen relative">
      <Link
        to="/riding"
        className="fixed h-10 w-10 bg-white text-center p-1 rounded-full  right-2 top-2 cursor-pointer "
      >
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>
      <div className="h-1/2 w-full">
        <img
          className=" w-full h-full object-fit"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>
      <div className="h-1/2 w-full">
        <div className="flex flex-col items-center  justify-between px-6 py-8 w-full  ">
          <img
            className="h-24 mb-4"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
          />
          <div className="flex flex-col items-start justify-start w-full mt-4 mb-2">
            <div className="flex gap-5 items-center mb-2 w-full">
              <h3 className="text-2xl font-semibold ">
                <i className="ri-map-pin-fill"></i>
              </h3>
              <div className="w-full border-b border-gray-500  p-2">
                <h4 className="text-xl font-medium">Rose Garden</h4>
                <p className="text-base text-gray-600">Sector-16, Chandigarh</p>
              </div>
            </div>
            <div className="flex w-full gap-5 items-center mb-4 ">
              <h3 className="text-2xl font-semibold ">
                <i className="ri-hand-coin-line"></i>
              </h3>
              <div className=" w-full border-b border-gray-500  p-2 ">
                <h4 className="text-xl font-medium">₹ 193.57</h4>
                <p className="text-base text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>

          <button className="bg-black w-3/4 text-white text-xl py-3 px-6 rounded-full hover:bg-gray-800 ">
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
