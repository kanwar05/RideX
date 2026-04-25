import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

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
    <div className="h-screen realtive w-screen">
      <div className="absolute px-5 py-5 flex flex-row justify-between items-start w-full">
        <div>
          <h1 className="text-4xl  font-semibold  ">Uber </h1>
          <span>
            <i className="text-4xl  font-bold  ri-arrow-right-long-line"></i>
          </span>
        </div>
        <div className="bg-gray-100 p-2 rounded-full h-10 w-10 flex items-center justify-center">
          <Link to="/captain-logout">
            <i className="text-xl  font-medium  ri-logout-box-r-line"></i>
          </Link>
        </div>
      </div>
      <div className="h-4/5 w-full">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>

      <div
        onClick={() => setFinishRidePanel(true)}
        className="h-1/5 w-full bg-yellow-500 flex flex-col justify-evenly"
      >
        <h5 className="w-full flex  items-center justify-center text-3xl p-2 text-black">
          <i className="ri-arrow-up-wide-line"></i>
        </h5>
        <div className="flex flex-row justify-between items-center px-8 pb-4 ">
          <h1 className="text-xl font-semibold">4 KM away</h1>
          <button className="bg-black  text-white text-xl py-3 px-6  rounded-full ">
            Complete Ride
          </button>
        </div>
      </div>

      <div
        ref={finishRidePanelRef}
        className="fixed z-10 w-full h-[80%] bottom-0 bg-white px-3 py-8"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
