import React from "react";
import { PremiumCard } from "./PremiumComponents";

const WaitingForDriver = ({ ride, vehicleType }) => {
  const captain = ride?.captain;

  const vehicleImages = {
    car: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n",
    moto: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=896/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n",
    auto: "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png",
  };

  return (
    <div className="bg-slate-950 text-white rounded-t-3xl overflow-hidden flex flex-col max-h-[90vh]">
      {/* Handle Bar */}
      <div className="flex items-center justify-center pt-3 pb-2">
        <div className="w-12 h-1 bg-slate-700 rounded-full"></div>
      </div>

      {/* Header */}
      <div className="px-4 sm:px-6 pb-4 border-b border-slate-800">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Driver arriving soon
        </h2>
        <p className="text-white/80 text-sm mt-1">
          Share your OTP when driver arrives
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
        <PremiumCard className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-500/15 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-user-line text-2xl sm:text-3xl text-indigo-300"></i>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-lg">
                  {captain?.fullName?.firstName || "Driver"}
                </h3>
                <p className="text-white/80 text-sm">
                  {captain?.vehicle?.model || "Vehicle"}
                </p>
                <p className="text-white/80 text-sm font-medium">
                  {captain?.vehicle?.plate || "Plate #"}
                </p>
              </div>
            </div>

            <div className="flex-shrink-0 ml-4">
              <div className="rounded-xl bg-indigo-500/15 px-4 py-2 font-bold text-lg text-indigo-200 ring-1 ring-indigo-400/30">
                {ride?.otp}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <div className="flex justify-center py-4">
              <img
                className="h-20 sm:h-24 object-contain"
                src={vehicleImages[vehicleType]}
                alt={vehicleType}
              />
            </div>
          </div>
        </PremiumCard>

        {/* Ride Details */}
        <div className="space-y-4">
          {/* Pickup Location */} 
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-indigo-300 rounded-full">
              <i className="ri-map-pin-user-line text-lg"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-indigo-200 text-lg mb-1">Pick up</p>
              <p className="text-white font-semibold truncate">
                {ride?.pickup}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="pl-4 ml-0">
            <div className="w-0.5 h-6 bg-slate-700"></div>
          </div>

          {/* Destination */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-emerald-300 rounded-full">
              <i className="ri-map-pin-fill text-lg"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-emerald-200 text-lg mb-1">Destination</p>
              <p className="text-white font-semibold truncate">
                {ride?.destination}
              </p>
            </div>
          </div>
        </div>

        <PremiumCard className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white">Total fare</span>
            <span className="text-2xl sm:text-3xl font-bold text-emerald-300">
              ₹{ride?.fare}
            </span>
          </div>
          <div className="pt-3 border-t border-slate-800">
            <span className="text-white text-sm">Payment method</span>
            <div className="flex items-center gap-2 mt-2">
              <i className="ri-cash-line text-lg text-emerald-300"></i>
              <span className="text-white font-medium">Cash on arrival</span>
            </div>
          </div>
        </PremiumCard>

        {/* Tips */}
        <div className="bg-indigo-500/10 border border-indigo-400/30 rounded-xl p-4">
          <p className="text-sm text-white/80">
            <i className="ri-information-line mr-2 text-indigo-300"></i>
            Show the OTP to your driver when they arrive to confirm the ride.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
