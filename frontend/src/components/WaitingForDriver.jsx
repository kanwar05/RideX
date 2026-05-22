import React from "react";

const WaitingForDriver = ({ ride, vehicleType }) => {
  const captain = ride?.captain;

  return (
    
      <div className="flex flex-col items-center  justify-between p-6 w-full  ">
        <div className="flex items-center justify-between w-full bg-slate-800 border-1 border-white/10 p-4 rounded-xl ">
          <div className="flex flex-row items-center space-x-3">
            {vehicleType === "car" && (
              <img
                className="h-20 mb-4"
                src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
              />
            )}
            {vehicleType === "moto" && (
              <img
                className="h-20 mb-4"
                src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=896/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n"
              />
            )}
            {vehicleType === "auto" && (
              <img
                className="h-20 mb-4"
                src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
              />
            )}
          </div>
          <div className="flex flex-col gap-2 justify-end items-end">
            <h1 className="text-lg text-lime-500 font-semibold">
              {captain?.fullName?.firstName}
            </h1>
            <h1 className="text-sm text-white/80 font-semibold">{captain?.vehicle?.plate}</h1>
            <h4 className="text-sm text-white/80">{captain?.vehicle?.model || "Maruti Suzuki ALTO"}</h4>
            <h1 className="text-xl py-1 px-2 rounded-xl bg-lime-500 text-black mt-2  font-semibold">{ride?.otp}</h1>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start w-full mt-7 mb-5">
          <div className="flex gap-5 items-center mb-5 w-full">
            <h3 className="text-2xl text-lime-500 font-semibold ">
              <i className="ri-map-pin-user-line"></i>
            </h3>
            <div className="w-full border-b border-lime-500  p-2">
              <h4 className="text-lg text-lime-500 font-medium">Pick Up</h4>
              <p className="text-base text-gray-200">{ride?.pickup}</p>
            </div>
          </div>
          <div className="flex gap-5 items-center mb-5 w-full">
            <h3 className="text-2xl text-lime-500 font-semibold ">
              <i className="ri-map-pin-fill"></i>
            </h3>
            <div className="w-full border-b border-lime-500  p-2">
              <h4 className="text-lg text-lime-500 font-medium">Destination</h4>
              <p className="text-base text-gray-200">{ride?.destination}</p>
            </div>
          </div>
          <div className="flex w-full gap-5 items-center mb-8 ">
            <h3 className="text-2xl text-lime-500 font-semibold ">
              <i className="ri-hand-coin-line"></i>
            </h3>
            <div className=" w-full border-b border-lime-500  p-2 ">
              <h4 className="text-lg text-lime-500 font-medium">₹{ride?.fare}</h4>
              <p className="text-base text-gray-200">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default WaitingForDriver;
