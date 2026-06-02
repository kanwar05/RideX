import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import CaptainMap from "../components/CaptainMap";
import PremiumNavbar from "../components/PremiumNavbar";

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
    <div className="h-screen  relative bg-[radial-gradient(circle_at_top_left,#0f172a,#020617)]   ">
      <div className="">
        <PremiumNavbar userType="captain" />
      </div>

      <div className="h-[60%] w-full">
        <CaptainMap ride={ride} destinationMode className="h-[70%]" />
      </div>

      <div
        onClick={() => setFinishRidePanel(true)}
        className="h-[40%] w-full flex flex-col items-center p-4  "
      >
        <h5 className="w-full flex  items-center justify-center text-3xl  text-gradient-animated mb-2 cursor-pointer">
          <i className="ri-arrow-up-wide-line"></i>
        </h5>
        <div className="flex w-full flex-col gap-5 px-8 pb-4">
          <div className="mb-3 bg-blur-lg glass-lg p-3 rounded-lg w-full">
            <div className="flex flex-row items-center justify-start gap-2">
              <h3 className="text-lg text-gradient-animated ">Passenger: </h3>
              <span className="text-white text-sm">{userName}</span>
            </div>
            <div className="flex flex-row items-center justify-start gap-2">
              <p className="text-lg text-gradient-animated">Pickup:</p>
              <span className="text-white/80">{pickup}</span>
            </div>
            <div className="flex flex-row items-center justify-start gap-2">
              {" "}
              <p className="text-lg text-gradient-animated">Destination:</p>
              <span className="text-white/80">{destination}</span>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center p-3">
            <h1 className="text-lg text-white/80 font-semibold">₹ {fare}</h1>
            <button className="btn-premium ">
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
