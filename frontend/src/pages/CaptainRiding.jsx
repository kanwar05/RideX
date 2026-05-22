import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import CaptainMap from "../components/CaptainMap";
import Navbar from "../components/Navbar";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();

  // Extract ride data from navigation state
  const rideData = location.state?.rideData;
  const ride = rideData?.ride || rideData;
  const userFullName = ride?.user?.fullName;
  const pickup = ride?.pickup || "Unknown Pickup";
  const destination = ride?.destination || "Unknown Destination";
  const fare = ride?.fare || "0";
  const userName =
    [userFullName?.firstName, userFullName?.lastName]
      .filter(Boolean)
      .join(" ") || "User";

  console.log("ride data", ride);

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(0%)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [finishRidePanel]);
  return (
    <div className="h-screen w-screen overflow-hidden relative bg-[radial-gradient(circle_at_top_left,#0f172a,#020617)] ">
      <div className=" bg-[radial-gradient(circle_at_top_left,#0f172a,#020617)] text-white p-4">
        <Navbar />
      </div>

      <div className="h-[60%] w-full">
        <CaptainMap ride={ride} destinationMode className="h-full" />
      </div>

      <div
        onClick={() => setFinishRidePanel(true)}
        className="h-[40%] w-full flex flex-col items-center p-4  "
      >
        <h5 className="w-full flex  items-center justify-center text-3xl  text-lime-500">
          <i className="ri-arrow-up-wide-line"></i>
        </h5>
        <div className="flex w-full flex-col px-8 pb-4">
          <div className="mb-3 bg-slate-800/50  p-3 rounded-lg w-full">
            <h3 className="text-lg text-lime-500 ">Passenger: <span className="text-white/80">{userName}</span> </h3>
            <p className="text-lg text-lime-500">Pickup: <span className="text-white/80">{pickup}</span></p>
            <p className="text-lg text-lime-500">Destination: <span className="text-white/80">{destination}</span></p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-lg text-white/80 font-semibold">₹{fare}</h1>
            <button className="bg-lime-500  text-black text-lg py-3 px-6  rounded-full ">
              Complete Ride
            </button>
          </div>
        </div>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed z-10 w-full h-[80%] bottom-0 bg-[radial-gradient(circle_at_top_left,#0f172a,#020617)] p-4"
      >
        <FinishRide
          setFinishRidePanel={setFinishRidePanel}
          ride={ride}
          userName={userName}
          pickup={pickup}
          destination={destination}
          fare={fare}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
