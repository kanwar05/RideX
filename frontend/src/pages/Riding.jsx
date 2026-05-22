import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketDataContext } from "../context/SocketContext";
import UserMap from "../components/UserMap";
import Navbar from "../components/Navbar";

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
    <div className="h-screen overflow-hidden relative bg-[radial-gradient(circle_at_top_left,#0f172a,#020617)] ">
      <div className=" bg-[radial-gradient(circle_at_top_left,#0f172a,#020617)] text-white p-4">
        <Navbar />
      </div>
      {/* <Link
        to="/home"
        className="fixed h-10 w-10 bg-white text-center p-1 rounded-full  right-2 top-2 cursor-pointer "
      >
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link> */}
      <div className="h-[50%] w-full">
        <UserMap
          pickup={ride?.pickup}
          destination={ride?.destination}
          ride={ride}
          className="h-full"
        />
      </div>
      <div className="h-[50%] w-full flex flex-col gap-2 items-center p-4   ">
        <div className="flex flex-row items-center justify-between p-4 w-full bg-slate-800 border-white/10 rounded-xl">
          <div className="flex flex-row items-center space-x-3">
            <img
              className="h-15 w-20 mb-4"
              src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
            />
          </div>
          <div className="flex flex-col text-white/80 justify-end items-end">
            <h1 className="text-lg text-lime-500 font-semibold">{captainName}</h1>
            <h1 className="text-sm font-semibold">{captain?.vehicle?.plate}</h1>
            <h4 className="text-sm ">{vehicleName}</h4>
          </div>
        </div>

        <div className="flex flex-row gap-4 w-full mt-4 mb-2">
          <div className="flex gap-3 items-center mb-2 w-1/2">
            <h3 className="text-xl text-lime-500 font-semibold ">
              <i className="ri-map-pin-fill"></i>
            </h3>
            <div className="w-full border-b border-lime-500  p-2">
              <h4 className="text-sm text-lime-500 font-medium">
                {destination}
              </h4>
              <p className="text-base text-gray-200">Destination</p>
            </div>
          </div>
          <div className="flex w-1/2 gap-3 items-center mb-2 ">
            <h3 className="text-xl text-lime-500 font-semibold ">
              <i className="ri-hand-coin-line"></i>
            </h3>
            <div className=" w-full border-b border-lime-500  p-2 ">
              <h4 className="text-sm text-lime-500 font-medium">₹{fare}</h4>
              <p className="text-base text-gray-200">Cash Cash</p>
            </div>
          </div>
        </div>

        <button className="bg-lime-500 w-3/4 text-black text-xl py-3 px-6 rounded-full hover:bg-lime-600 ">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
