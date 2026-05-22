import React from "react";

const LookingForDriver = (props) => {
  return (
    <div>
      <h5
        className="w-full flex  items-center justify-center text-3xl  text-lime-500"
        onClick={() => {
          props.setVehicleFound(false);
        }}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h2 className="text-2xl text-lime-500 mb-2 font-normal">Looking for Driver</h2>

      <div className="flex flex-col items-center  justify-between px-6 py-8 w-full  ">
        {props.vehicleType === "car" && (
          <img
            className="h-20 mb-4"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
          />
        )}
        {props.vehicleType === "moto" && (
          <img
            className="h-20 mb-4"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=896/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n"
          />
        )}
        {props.vehicleType === "auto" && (
          <img
            className="h-20 mb-4"
            src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
          />
        )}
        <div className="flex flex-col items-start justify-start w-full mt-7 mb-5">
          <div className="flex gap-5 items-center mb-5 w-full">
            <h3 className="text-2xl font-semibold ">
              <i className="text-lime-500 ri-map-pin-user-line"></i>
            </h3>
            <div className="w-full border-b border-lime-500/80  p-2">
              <h4 className="text-lg text-white/90 font-medium">{props.pickup}</h4>
             
            </div>
          </div>
          <div className="flex gap-5 items-center mb-5 w-full">
            <h3 className="text-2xl font-semibold ">
              <i className="text-lime-500 ri-map-pin-fill"></i>
            </h3>
            <div className="w-full border-b border-lime-500/80  p-2">
              <h4 className="text-lg text-white/90 font-medium">{props.destination}</h4>
              
            </div>
          </div>
          <div className="flex w-full gap-5 items-center mb-8 ">
            <h3 className="text-2xl font-semibold ">
              <i className="text-lime-500 ri-hand-coin-line"></i>
            </h3>
            <div className=" w-full border-b border-lime-500/80  p-2 ">
              <h4 className="text-xl text-white/90 font-medium">
                ₹{props.fare[props.vehicleType]}
              </h4>
              <p className="text-base text-gray-400">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
