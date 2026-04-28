import React from "react";

const LookingForDriver = (props) => {
  return (
    <div>
      <h5
        className="w-full flex  items-center justify-center text-3xl mb-2 text-gray-600"
        onClick={() => {
          props.setVehicleFound(false);
        }}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h2 className="text-3xl mb-2 font-medium">Looking for Driver</h2>

      <div className="flex flex-col items-center  justify-between px-6 py-8 w-full  ">
        <img
          className="h-24 mb-4"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
        />
        <div className="flex flex-col items-start justify-start w-full mt-7 mb-5">
          <div className="flex gap-5 items-center mb-5 w-full">
            <h3 className="text-2xl font-semibold ">
              <i className="ri-map-pin-user-line"></i>
            </h3>
            <div className="w-full border-b border-gray-500  p-2">
              <h4 className="text-xl font-medium">ISBT-17</h4>
              <p className="text-base text-gray-600">{props.pickup}</p>
            </div>
          </div>
          <div className="flex gap-5 items-center mb-5 w-full">
            <h3 className="text-2xl font-semibold ">
              <i className="ri-map-pin-fill"></i>
            </h3>
            <div className="w-full border-b border-gray-500  p-2">
              <h4 className="text-xl font-medium">Rose Garden</h4>
              <p className="text-base text-gray-600">{props.destination}</p>
            </div>
          </div>
          <div className="flex w-full gap-5 items-center mb-8 ">
            <h3 className="text-2xl font-semibold ">
              <i className="ri-hand-coin-line"></i>
            </h3>
            <div className=" w-full border-b border-gray-500  p-2 ">
              <h4 className="text-xl font-medium">
                ₹{props.fare[props.vehicleType]}
              </h4>
              <p className="text-base text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
