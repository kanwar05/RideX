import React from "react";
import { PremiumCard } from "./PremiumComponents";

const VehiclePanel = (props) => {
  const vehicles = [
    {
      id: "car",
      name: "RideX Go",
      seats: 4,
      eta: "2 mins",
      description: "Affordable, compact rides",
      icon: "ri-car-front-fill",
      image: "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png",
      fare: props.fare?.car || 0,
    },
    {
      id: "moto",
      name: "Moto",
      seats: 1,
      eta: "3 mins",
      description: "Quick bike rides",
      icon: "ri-e-bike-2-fill",
      image:
        "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=896/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n",
      fare: props.fare?.moto || 0,
    },
    {
      id: "auto",
      name: "RideX Auto",
      seats: 4,
      eta: "2 mins",
      description: "Auto rickshaw rides",
      icon: "ri-taxi-fill",
      image:
        "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png",
      fare: props.fare?.auto || 0,
    },
  ];

  return (
    <div className="h-full w-full flex flex-col bg-dark-900 rounded-t-3xl max-h-[90vh] overflow-hidden flex-col">
      {/* Handle Bar */}
      <div className="flex items-center justify-center pt-3 pb-2">
        <div className="w-12 h-1 bg-dark-600 rounded-full"></div>
      </div>

      {/* Header */}
      <div className="px-4 sm:px-6 pb-4 border-b border-dark-700">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Choose a vehicle
        </h2>
        <p className="text-text-muted text-sm mt-1">
          Select your preferred ride type
        </p>
      </div>

      {/* Vehicles List */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3">
        {vehicles.map((vehicle) => (
          <PremiumCard
            key={vehicle.id}
            className="cursor-pointer p-4"
            onClick={() => {
              props.setConfirmedRidePanel(true);
              props.selectVehicleType(vehicle.id);
              props.setVehiclePanelOpen(false);
            }}
            role="button"
            tabIndex={0}
          >
            {/* Vehicle Row */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-lg overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                  {vehicle.name}
                  <span className="text-xs sm:text-sm font-normal text-text-muted px-2 py-1 rounded">
                    <i className={`${vehicle.icon} mr-1`}></i>
                    {vehicle.seats}
                  </span>
                </h4>
                <p className="text-sm text-text-muted mb-1">
                  {vehicle.eta} away
                </p>
                <p className="text-xs sm:text-sm text-text-muted">
                  {vehicle.description}
                </p>
              </div>

              <div className="flex-shrink-0 text-right">
                <h3 className="text-lg sm:text-xl font-bold text-primary">
                  ₹ {vehicle.fare}
                </h3>
              </div>
            </div>
          </PremiumCard>
        ))}
      </div>

      {/* Footer Info */}
      <div className="px-4 sm:px-6 py-4 bg-dark-800 border-t border-dark-700 text-center">
        <p className="text-xs text-text-muted">
          Prices may vary based on demand and distance
        </p>
      </div>
    </div>
  );
};

export default VehiclePanel;
