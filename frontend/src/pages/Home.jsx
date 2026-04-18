import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

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
          <LocationSearchPanel />
        </div>
      </div>

      <div className="fixed z-10 w-full bottom-0 bg-white px-3 py-6">
        <h2 className="text-2xl mb-5 font-medium">Choose Vehicle</h2>
        <div className="flex  items-center justify-between p-3 mb-3 rounded-xl border active:border-2 ">
          <img
            className="h-15"
            src="https://imgs.search.brave.com/0pmDgaF29KfD8qd3f0rXJpFZ5LyX8Tk6oew0U1PT_UM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzUv/MDQzLzI1Ni9zbWFs/bC9sdXh1cnktY2Fy/LXZhY3Rvci1kZXNp/Z24tdmVjdG9yLmpw/Zw"
          />
          <div className="w-1/2 ">
            <h4 className="text-lg font-semibold ">
              UberGo{" "}
              <span className="text-lg font-semibold">
                <i className="ri-user-3-fill"></i> 4{" "}
              </span>{" "}
            </h4>
            <h5 className="text-lg font-semibold">2 mins away</h5>
            <p className="text-sm font-normal ">Affordable, compact rides</p>
          </div>
          <h2 className="text-xl font-medium"> ₹ 193.57</h2>
        </div>

        <div className="flex flex-row items-center justify-between p-3 mb-3 border active:border-2 rounded-xl ">
          <img
            className="h-15"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=896/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n"
          />
          <div className="w-1/2 ">
            <h4 className="text-lg font-semibold ">
              Moto{" "}
              <span className="text-lg font-semibold">
                <i className="ri-user-3-fill"></i> 1{" "}
              </span>{" "}
            </h4>
            <h5 className="text-lg font-semibold">3 mins away</h5>
            <p className="text-sm font-normal ">Affordable, bike rides</p>
          </div>
          <h2 className="text-xl font-medium"> ₹ 75.57</h2>
        </div>

        <div className="flex flex-row items-center justify-between p-3 mb-3 border active:border-2 rounded-xl ">
          <img
            className="h-15"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mYzEwMWZmOC04MWExLTQ2YzMtOTk1YS02N2I0YmJkMmYyYmYuanBn"
          />
          <div className="w-1/2 ">
            <h4 className="text-lg font-semibold ">
              Uber Auto{" "}
              <span className="text-lg font-semibold">
                <i className="ri-user-3-fill"></i> 4{" "}
              </span>{" "}
            </h4>
            <h5 className="text-lg font-semibold">2 mins away</h5>
            <p className="text-sm font-normal ">Affordable, Auto rides</p>
          </div>
          <h2 className="text-xl font-medium"> ₹ 193.57</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
