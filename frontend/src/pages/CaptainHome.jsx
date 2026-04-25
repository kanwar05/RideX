import React, { useRef, useState } from "react";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(true);
  const RidePopUpPanelRef = useRef(null);
  const [ConfirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const ConfirmRidePopUpPanelRef = useRef(null);

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(RidePopUpPanelRef.current, {
        display: "block",
        duration: 0.5,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(RidePopUpPanelRef.current, {
        height: "0%",
        display: "none",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (ConfirmRidePopUpPanel) {
      gsap.to(ConfirmRidePopUpPanelRef.current, {
        display: "block",
        height: "100%",
        duration: 0.5,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(ConfirmRidePopUpPanelRef.current, {
        height: "0%",
        display: "none",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [ConfirmRidePopUpPanel]);

  return (
    <div className="h-screen relative w-screen">
      <div className="absolute px-5 py-5 flex flex-row justify-between items-start w-full">
        <div>
          <h1 className="text-4xl  font-semibold  ">Uber </h1>
          <span>
            <i className="text-4xl  font-bold  ri-arrow-right-long-line"></i>
          </span>
        </div>
        <div className="bg-gray-100 p-2 rounded-full h-10 w-10 flex items-center justify-center">
          <span>
            <i className="text-xl  font-medium  ri-logout-box-r-line"></i>
          </span>
        </div>
      </div>
      <div className="h-3/5 w-full">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>

      {/* captain detail component */}
      <div className="flex flex-col p-4 w-full h-2/5 gap-5">
        <CaptainDetails />
      </div>

      {/* ride pop up component */}
      <div
        ref={RidePopUpPanelRef}
        className="fixed z-10 w-full bottom-0 bg-white px-3 py-8"
      >
        <RidePopUp
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>

      {/* confirm ride pop up component */}
      <div
        ref={ConfirmRidePopUpPanelRef}
        className="fixed z-10 h-screen w-full bottom-0 bg-white px-3 py-8"
      >
        <ConfirmRidePopUp
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
