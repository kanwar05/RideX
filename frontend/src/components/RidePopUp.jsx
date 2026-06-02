import React from "react";
import { PremiumCard } from "./PremiumComponents";

const RidePopUp = (props) => {
  const { rideData, userName, confirmRide } = props;

  // Extract data from rideData, with fallbacks to hardcoded values
  const pickup = rideData?.pickup;
  const destination = rideData?.destination;

  return (
    <div className="p-4 bg-slate-950 text-white rounded-t-3xl" >
      <h5
        className="w-full flex  items-center justify-center text-3xl  text-slate-300 "
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h2 className="text-xl mb-3 font-semibold text-white">
        New Ride Available
      </h2>

      <PremiumCard className="p-6 space-y-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <img
              className="h-12 w-12 rounded-full"
              src="https://imgs.search.brave.com/vdRYk5Fef873iKhep6GE8FrjCAJQafa8F189pqmsNjo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGeHM0/Y0pNekkvMi8wLzE2/MDB3L2NhbnZhLXB1/cnBsZS1ibGFjay1h/bmQtd2hpdGUtY29v/bC1jcmVhdGl2ZS1s/aW5rZWRpbi1wcm9m/aWxlLXBpY3R1cmUt/U283clZpQ1daYnMu/anBn"
            />
            <h1 className="text-xl text-white font-semibold">
              {userName?.firstName + " " + userName?.lastName}
            </h1>
          </div>
          <div className="text-right">
            <h1 className="text-xl text-white/80 font-semibold">2.2KM</h1>
            <h4 className="text-lg text-white/80">₹{rideData?.ride.fare}</h4>
          </div>
        </div>

        <div className="flex flex-col items-start w-full">
          <div className="flex gap-5 items-center mb-4 w-full">
            <h3 className="text-2xl text-indigo-300 font-semibold ">
              <i className="ri-map-pin-user-line"></i>
            </h3>
            <div className="w-full border-b border-slate-700 p-2">
              <p className="text-base text-indigo-200">Pickup Location</p>
              <h4 className="text-sm text-white/80 font-medium">{pickup}</h4>
            </div>
          </div>
          <div className="flex gap-5 items-center mb-4 w-full">
            <h3 className="text-2xl text-emerald-300 font-semibold ">
              <i className="ri-map-pin-fill"></i>
            </h3>
            <div className="w-full border-b border-slate-700 p-2">
              <p className="text-base text-emerald-200">Destination</p>
              <h4 className="text-sm text-white/80 font-medium">
                {destination}
              </h4>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center gap-3">
          <button
            onClick={async () => {
              const confirmed = await confirmRide();
              if (confirmed) {
                props.setConfirmRidePopUpPanel(true);
                props.setRidePopUpPanel(false);
              }
            }}
            className="w-1/2 rounded-xl py-3 bg-indigo-600 text-white font-semibold transition hover:bg-indigo-500"
          >
            Accept
          </button>
          <button
            onClick={() => props.setRidePopUpPanel(false)}
            className="w-1/2 rounded-xl py-3 border border-slate-700 bg-slate-800 text-white font-semibold transition hover:bg-slate-700"
          >
            Ignore
          </button>
        </div>
      </PremiumCard>
    </div>
  );
};

export default RidePopUp;
