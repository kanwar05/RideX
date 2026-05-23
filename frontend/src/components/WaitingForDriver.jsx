import React from "react";

const WaitingForDriver = ({ ride, vehicleType }) => {
  const captain = ride?.captain;

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
          Driver arriving soon
        </h2>
        <p className="text-text-muted text-sm mt-1">
          Share your OTP when driver arrives
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Driver Card */}
        <div className="bg-dark-800 rounded-lg p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            {/* Driver Info */}
            <div className="flex items-center gap-4 flex-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-user-line text-2xl sm:text-3xl text-primary"></i>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-lg">
                  {captain?.fullName?.firstName || "Driver"}
                </h3>
                <p className="text-text-muted text-sm">
                  {captain?.vehicle?.model || "Vehicle"}
                </p>
                <p className="text-primary text-sm font-medium">
                  {captain?.vehicle?.plate || "Plate #"}
                </p>
              </div>
            </div>

            {/* OTP Badge */}
            <div className="flex-shrink-0 ml-4">
              <div className="bg-primary text-dark-950 px-4 py-2 rounded-lg font-bold text-lg">
                {ride?.otp}
              </div>
            </div>
          </div>

          {/* Vehicle Image */}
          <div className="pt-4 border-t border-dark-700">
            <div className="flex justify-center py-4 bg-dark-900 rounded-lg">
              <img
                className="h-20 sm:h-24 object-contain"
                src={vehicleImages[vehicleType]}
                alt={vehicleType}
              />
            </div>
          </div>
        </div>

        {/* Ride Details */}
        <div className="space-y-4">
          {/* Pickup Location */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-dark-950 rounded-full">
              <i className="ri-map-pin-user-line text-lg"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-text-muted text-sm mb-1">Pick up</p>
              <p className="text-white font-semibold truncate">
                {ride?.pickup}
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
                {ride?.destination}
              </p>
            </div>
          </div>
        </div>

        {/* Fare and Payment */}
        <div className="bg-dark-800 rounded-lg p-4 sm:p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-text-muted">Total fare</span>
            <span className="text-2xl sm:text-3xl font-bold text-primary">
              ₹{ride?.fare}
            </span>
          </div>
          <div className="pt-3 border-t border-dark-700">
            <span className="text-text-muted text-sm">Payment method</span>
            <div className="flex items-center gap-2 mt-2">
              <i className="ri-cash-line text-lg text-primary"></i>
              <span className="text-white font-medium">Cash on arrival</span>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
          <p className="text-sm text-text-secondary">
            <i className="ri-information-line mr-2"></i>
            Show the OTP to your driver when they arrive to confirm the ride.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
