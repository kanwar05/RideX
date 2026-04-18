import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        display: "block",
        duration: 0.5,
        ease: "power2.inOut",
      });

      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        display: "none",
        duration: 0.5,
        ease: "power2.inOut",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanelOpen]);

  return (
    <div className="h-screen relative overflow-hidden">
      <h1 className="text-4xl absolute font-semibold pl-5 pt-5 pb-3 ">Uber</h1>
      {/* <img className="w-20 absolute top-5 left-5"  src="https://imgs.search.brave.com/zI9sTKSL338XsQS2TphauF8YrJLaTg-O0pS8AdMBhMs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly96b25h/bG9nby5jb20vYXBp/L2Fzc2V0LXByZXZp/ZXc_dXJsPWh0dHBz/Oi8vYXNzZXRzLnpv/bmFsb2dvLmNvbS90/cmFuc3BvcnRhdGlv/bi91YmVyLmNvbS9s/b2dvLTE3NzQxMzc2/MTg2NDUtNDQyLnN2/ZyZ0aGVtZT1kYXJr/JnY9djI" /> */}
      <div className="h-screen w-full">
        <img
          className=" w-full h-[70%] object-fit"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>

      <div className="w-full flex flex-col justify-end h-screen absolute top-0 ">
        <div className="h-[30%] p-5 bg-white relative ">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h1 className="text-3xl font-semibold ">Let's make a Trip</h1>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              value={pickup}
              onChange={(e) => {
                e.target.value;
              }}
              onClick={() => {
                setPanelOpen(true);
              }}
              className="w-full bg-[#eee] h-10 rounded-sm mt-5 p-2 px-12 placeholder:text-base"
              type="text"
              placeholder="Enter your pickup location"
            />
            <input
              value={pickup}
              onChange={(e) => {
                e.target.value;
              }}
              onClick={() => {
                setPanelOpen(true);
              }}
              className="w-full  bg-[#eee] h-10 rounded-sm mt-5  px-12 p-2 placeholder:text-base"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0 p-5 bg-white">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed z-10 w-full bottom-0 bg-white px-3 py-8"
      >
        <VehiclePanel setVehiclePanelOpen={setVehiclePanelOpen} />
      </div>
    </div>
  );
};

export default Home;
