import React from "react";

const ConfirmedRide = (props) => {
  const vehicleImages = {
    car: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n",
    moto: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=896/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n",
    auto: "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png",
  };

  return (
    <div className="bg-dark-900 rounded-t-3xl overflow-hidden flex flex-col max-h-[90vh]">
      {/* Handle Bar */}
      <div className="flex items-center justify-center pt-3 pb-2">
        <div className="w-12 h-1 bg-dark-600 rounded-full"></div>
      </div>

      {/* Header */}
      <div className="px-4 sm:px-6 pb-4 border-b border-dark-700">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Confirm your ride
        </h2>
        <p className="text-text-muted text-sm mt-1">
          Review details before booking
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Vehicle Image */}
        <div className="flex justify-center py-4 bg-dark-800 rounded-lg">
          <img
            className="h-24 sm:h-32 object-contain"
            src={vehicleImages[props.vehicleType]}
            alt={props.vehicleType}
          />
        </div>

        {/* Ride Details */}
        <div className="space-y-4">
          {/* Pickup Location */}
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

          {/* Divider */}
          <div className="pl-4 ml-0">
            <div className="w-0.5 h-6 bg-dark-700"></div>
          </div>

          {/* Destination */}
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

        {/* Fare Card */}
        <div className="bg-dark-800 rounded-lg p-4 sm:p-6 space-y-3">
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
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 py-4 bg-dark-800 border-t border-dark-700 space-y-3">
        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmedRidePanel(false);
            props.createTrip();
          }}
          className="btn btn-primary w-full py-3 text-base font-semibold"
        >
          Confirm Ride
        </button>
        <button
          onClick={() => {
            props.setConfirmedRidePanel(false);
          }}
          className="btn btn-secondary w-full py-3 text-base font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;
