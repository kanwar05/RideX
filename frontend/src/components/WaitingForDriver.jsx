import React from "react";

const WaitingForDriver = ({ ride }) => {
  const captain = ride?.captain;

  return (
    <div>
      <div className="flex flex-col items-center  justify-between px-6 py-8 w-full  ">
        <div className="flex items-center justify-between w-full border-2 border-yellow-500 p-4 rounded-xl ">
          <div className="flex flex-row items-center space-x-3">
            <img
              className="h-15 w-20 mb-4"
              src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
            />
          </div>
          <div className="flex flex-col justify-end items-end">
            <h1 className="text-lg font-semibold">
              {captain?.fullName?.firstName}
            </h1>
            <h1 className="text-xl font-semibold">{captain?.vehicle?.plate}</h1>
            <h4 className="text-lg ">Maruti Suzuki ALTO</h4>
            <h1 className="text-lg font-semibold">{ride?.otp}</h1>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start w-full mt-7 mb-5">
          <div className="flex gap-5 items-center mb-5 w-full">
            <h3 className="text-2xl font-semibold ">
              <i className="ri-map-pin-user-line"></i>
            </h3>
            <div className="w-full border-b border-gray-500  p-2">
              <h4 className="text-xl font-medium">ISBT-17</h4>
              <p className="text-base text-gray-600">{ride?.pickup}</p>
            </div>
          </div>
          <div className="flex gap-5 items-center mb-5 w-full">
            <h3 className="text-2xl font-semibold ">
              <i className="ri-map-pin-fill"></i>
            </h3>
            <div className="w-full border-b border-gray-500  p-2">
              <h4 className="text-xl font-medium">Rose Garden</h4>
              <p className="text-base text-gray-600">{ride?.destination}</p>
            </div>
          </div>
          <div className="flex w-full gap-5 items-center mb-8 ">
            <h3 className="text-2xl font-semibold ">
              <i className="ri-hand-coin-line"></i>
            </h3>
            <div className=" w-full border-b border-gray-500  p-2 ">
              <h4 className="text-xl font-medium">₹{ride?.fare}</h4>
              <p className="text-base text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
