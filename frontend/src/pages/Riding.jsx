import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketDataContext } from "../context/SocketContext";
import UserMap from "../components/UserMap";
import PremiumNavbar from "../components/PremiumNavbar";

const Riding = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { socket } = useContext(SocketDataContext);
  const rideData = location.state?.rideData;
  const ride = rideData?.ride || rideData;
  const captain = ride?.captain;

  const captainName =
    [captain?.fullName?.firstName, captain?.fullName?.lastName]
      .filter(Boolean)
      .join(" ") || "Captain";
  const vehicleName = captain?.vehicle
    ? `${captain.vehicle.color} ${captain.vehicle.vehicleType}`
    : "Vehicle";
  const destination = ride?.destination || "Destination";
  const fare = ride?.fare || "0";

  useEffect(() => {
    const handleRideCompleted = () => {
      navigate("/home");
    };

    socket?.on("ride-ended", handleRideCompleted);
    socket?.on("ride-completed", handleRideCompleted);

    return () => {
      socket?.off("ride-ended", handleRideCompleted);
      socket?.off("ride-completed", handleRideCompleted);
    };
  }, [socket, navigate]);

  return (
    <div className="h-screen overflow-hidden relative bg-slate-950 text-white">
      <div className="">
        <PremiumNavbar />
      </div>
      
      <div className="h-[50%] w-full">
        <UserMap
          pickup={ride?.pickup}
          destination={ride?.destination}
          ride={ride}
          className="h-full"
        />
      </div>
      <div className="h-[50%] w-full flex flex-col items-center justify-center gap-2 p-4 bg-slate-950 border-t border-slate-800">
        <div className="flex flex-row items-center justify-between p-4 w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-lg">
          <div className="flex flex-row items-center space-x-3">
            <img
              className="h-15 w-20 mb-4"
              src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
            />
          </div>
          <div className="flex flex-col text-slate-300 justify-end items-end">
            <h1 className="text-lg text-white font-semibold">
              {captainName}
            </h1>
            <h1 className="text-sm font-semibold">{captain?.vehicle?.plate}</h1>
            <h4 className="text-sm ">{vehicleName}</h4>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full mt-4 mb-2 p-4">
          <div className="flex gap-3 items-center mb-2 w-full">
            <h3 className="text-xl text-indigo-300 font-semibold ">
              <i className="ri-map-pin-fill"></i>
            </h3>
            <div className="w-full border-b border-slate-700 p-2">
              <h4 className="text-sm text-indigo-200 font-medium">
                {destination}
              </h4>
              <p className="text-base text-gray-200">Destination</p>
            </div>
          </div>
          <div className="flex w-full gap-3 items-center mb-2 ">
            <h3 className="text-xl text-emerald-300 font-semibold ">
              <i className="ri-hand-coin-line"></i>
            </h3>
            <div className=" w-full border-b border-slate-700 p-2 ">
              <h4 className="text-sm text-emerald-300 font-medium">₹{fare}</h4>
              <p className="text-base text-gray-200">Cash Cash</p>
            </div>
          </div>
        </div>

        <button className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-500 active:scale-[0.99]">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
