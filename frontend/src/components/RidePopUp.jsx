import React from "react";

const RidePopUp = (props) => {
  const { rideData, userName, confirmRide } = props;

  // Extract data from rideData, with fallbacks to hardcoded values
  const pickup = rideData?.pickup;
  const destination = rideData?.destination;

  return (
    <div>
      <h5
        className="w-full flex  items-center justify-center text-3xl mb-2 text-lime-500"
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h2 className="text-2xl mb-2 font-medium text-lime-500">
        New Ride Available
      </h2>

      <div className="flex flex-col items-center  justify-between px-6 py-8 w-full  ">
        <div className="flex items-center justify-between w-full bg-slate-800 p-4 border-white/10 rounded-xl ">
          <div className="flex flex-row items-center space-x-3">
            <img
              className="h-13 w-13 rounded-full"
              src="https://imgs.search.brave.com/vdRYk5Fef873iKhep6GE8FrjCAJQafa8F189pqmsNjo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGeHM0/Y0pNekkvMi8wLzE2/MDB3L2NhbnZhLXB1/cnBsZS1ibGFjay1h/bmQtd2hpdGUtY29v/bC1jcmVhdGl2ZS1s/aW5rZWRpbi1wcm9m/aWxlLXBpY3R1cmUt/U283clZpQ1daYnMu/anBn"
            />
            <h1 className="text-xl text-white/80 font-semibold">
              {userName?.firstName + " " + userName?.lastName}
            </h1>
          </div>
          <div>
            <h1 className="text-xl text-white/80 font-semibold">2.2KM</h1>
            <h4 className="text-lg text-white/80 ">₹{rideData?.ride.fare}</h4>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full mt-7 mb-5">
          <div className="flex gap-5 items-center mb-5 w-full">
            <h3 className="text-2xl text-lime-500 font-semibold ">
              <i className="ri-map-pin-user-line"></i>
            </h3>
            <div className="w-full border-b border-lime-500  p-2">
              <p className="text-base text-lime-500">Pickup Location</p>
              <h4 className="text-sm text-white/80 font-medium">{pickup}</h4>
            </div>
          </div>
          <div className="flex gap-5 items-center mb-5 w-full">
            <h3 className="text-2xl text-lime-500 font-semibold ">
              <i className="ri-map-pin-fill"></i>
            </h3>
            <div className="w-full border-b border-lime-500  p-2">
              <p className="text-base text-lime-500">Destination</p>
              <h4 className="text-sm text-white/80 font-medium">
                {destination}
              </h4>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center flex-row gap-2">
          <button
            onClick={async () => {
              const confirmed = await confirmRide();
              if (confirmed) {
                props.setConfirmRidePopUpPanel(true);
                props.setRidePopUpPanel(false);
              }
            }}
            className="bg-lime-500 w-1/2 text-black text-lg py-3 px-6 rounded-full  "
          >
            Accept
          </button>
          <button
            onClick={() => {
              props.setRidePopUpPanel(false);
            }}
            className="bg-slate-800 w-1/2 text-white text-lg py-3 px-6  rounded-full "
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
