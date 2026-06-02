import React from "react";
import { PremiumCard } from "./PremiumComponents";

const ConfirmedRide = (props) => {
  const vehicleImages = {
    car: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n",
    moto: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=896/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n",
    auto: "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png",
  };

  return (
    <div className="bg-slate-950 text-white rounded-t-3xl overflow-hidden flex flex-col max-h-[90vh]">
      <div className="flex items-center justify-center pt-3 pb-2">
        <div className="w-12 h-1 bg-slate-700 rounded-full"></div>
      </div>

      <div className="px-4 sm:px-6 pb-4 border-b border-slate-800">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Confirm your ride
        </h2>
        <p className="text-white/80 text-sm mt-1">
          Review details before booking
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
        <PremiumCard className="flex justify-center py-4">
          <img
            className="h-24 sm:h-32 object-contain"
            src={vehicleImages[props.vehicleType]}
            alt={props.vehicleType}
          />
        </PremiumCard>

        <div className="space-y-4">
          <div className="flex gap-4 items-start rounded-xl justify-center p-3 bg-slate-900 border border-slate-800">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-indigo-300">
              <i className="ri-map-pin-user-line text-xl"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-indigo-200 text-lg ">Pickup</p>
              <p className="text-white font-semibold truncate">
                {props.pickup || "Select pickup location"}
              </p>
            </div>
          </div>

          <div className="pl-4 ml-0">
            <div className="w-0.5 h-6 bg-slate-700"></div>
          </div>

          <div className="flex gap-4 items-start rounded-xl justify-center p-3 bg-slate-900 border border-slate-800">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-emerald-300">
              <i className="ri-map-pin-fill text-lg"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-emerald-200 text-lg">Destination</p>
              <p className="text-white font-semibold truncate">
                {props.destination || "Select destination"}
              </p>
            </div>
          </div>
        </div>

        <PremiumCard className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white">Fare estimate</span>
            <span className="text-2xl sm:text-3xl font-bold text-emerald-300">
              ₹{props.fare[props.vehicleType]}
            </span>
          </div>
          <div className="pt-3 border-t border-slate-800">
            <span className="text-white text-sm">Payment method</span>
            <div className="flex items-center gap-2 mt-2">
              <i className="ri-cash-line text-lg text-emerald-300"></i>
              <span className="text-white font-medium">Cash</span>
            </div>
          </div>
        </PremiumCard>
      </div>

      <div className="px-4 sm:px-6 py-6 bg-slate-900 border-t border-slate-800 space-y-4">
        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmedRidePanel(false);
            props.createTrip();
          }}
          className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-500 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Confirm Ride
        </button>
        <button
          onClick={() => {
            props.setConfirmedRidePanel(false);
          }}
          className="w-full py-3 rounded-xl border border-slate-700 bg-slate-800 font-medium transition hover:bg-slate-700 flex items-center justify-center gap-3 text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;
