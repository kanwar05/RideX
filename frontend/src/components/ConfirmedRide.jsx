import React from "react";
import { PremiumCard } from "./PremiumComponents";

const ConfirmedRide = (props) => {
  const vehicleImages = {
    car: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n",
    moto: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=896/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n",
    auto: "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png",
  };

  return (
    <div className="bg-dark-900 rounded-t-3xl overflow-hidden flex flex-col max-h-[90vh]">
      <div className="flex items-center justify-center pt-3 pb-2">
        <div className="w-12 h-1 bg-dark-600 rounded-full"></div>
      </div>

      <div className="px-4 sm:px-6 pb-4 border-b border-dark-700">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Confirm your ride
        </h2>
        <p className="text-text-muted text-sm mt-1">
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
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-dark-950 rounded-full">
              <i className="ri-map-pin-user-line text-lg"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-text-muted text-sm mb-1">Pickup</p>
              <p className="text-white font-semibold truncate">
                {props.pickup || "Select pickup location"}
              </p>
            </div>
          </div>

          <div className="pl-4 ml-0">
            <div className="w-0.5 h-6 bg-dark-700"></div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-dark-950 rounded-full">
              <i className="ri-map-pin-fill text-lg"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-text-muted text-sm mb-1">Destination</p>
              <p className="text-white font-semibold truncate">
                {props.destination || "Select destination"}
              </p>
            </div>
          </div>
        </div>

        <PremiumCard className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-text-muted">Fare estimate</span>
            <span className="text-2xl sm:text-3xl font-bold text-primary">
              ₹{props.fare[props.vehicleType]}
            </span>
          </div>
          <div className="pt-3 border-t border-dark-700">
            <span className="text-text-muted text-sm">Payment method</span>
            <div className="flex items-center gap-2 mt-2">
              <i className="ri-cash-line text-lg text-primary"></i>
              <span className="text-white font-medium">Cash</span>
            </div>
          </div>
        </PremiumCard>
      </div>

      <div className="px-4 sm:px-6 py-4 bg-dark-800 border-t border-dark-700 space-y-3">
        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmedRidePanel(false);
            props.createTrip();
          }}
          className="w-full rounded-lg py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold"
        >
          Confirm Ride
        </button>
        <button
          onClick={() => {
            props.setConfirmedRidePanel(false);
          }}
          className="w-full rounded-lg py-3 bg-slate-800 text-white font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;
