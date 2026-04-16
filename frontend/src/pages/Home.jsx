import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
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

  return (
    <div className="h-screen relative">
      <h1 className="text-4xl absolute font-semibold pl-5 pt-5 pb-3 ">Uber</h1>
      {/* <img className="w-20 absolute top-5 left-5"  src="https://imgs.search.brave.com/zI9sTKSL338XsQS2TphauF8YrJLaTg-O0pS8AdMBhMs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly96b25h/bG9nby5jb20vYXBp/L2Fzc2V0LXByZXZp/ZXc_dXJsPWh0dHBz/Oi8vYXNzZXRzLnpv/bmFsb2dvLmNvbS90/cmFuc3BvcnRhdGlv/bi91YmVyLmNvbS9s/b2dvLTE3NzQxMzc2/MTg2NDUtNDQyLnN2/ZyZ0aGVtZT1kYXJr/JnY9djI" /> */}
      <div className="h-screen w-full">
        <img
          className=" w-full h-[70%] object-fit"
          src="https://imgs.search.brave.com/tx3Cw-g0Ux5mI37hmm32b_c0Du3-_Wo2We3iX4SE7ew/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDYv/MDcxLzY3NS9zbWFs/bC90YXhpLXNlcnZp/Y2Utb25saW5lLW9u/LXNtYXJ0cGhvbmUt/dmVjdG9yLmpwZw"
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
              className="w-full bg-[#eee] h-10 rounded-sm mt-5 p-2 placeholder:text-base"
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
              className="w-full  bg-[#eee] h-10 rounded-sm mt-5 p-2 placeholder:text-base"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0 bg-red-500"></div>
      </div>
    </div>
  );
};

export default Home;
