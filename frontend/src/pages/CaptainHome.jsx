import React, { useContext, useEffect, useRef, useState } from "react";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketDataContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CapatinContext";
import axios from "axios";
import CaptainMap from "../components/CaptainMap";

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const RidePopUpPanelRef = useRef(null);
  const [ConfirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const ConfirmRidePopUpPanelRef = useRef(null);
  const [rideData, setRideData] = useState(null);
  const [userName, setUserName] = useState(null);

  const { captain } = useContext(CaptainDataContext);
  const { socket, sendMessage, isConnected } = useContext(SocketDataContext);

  useEffect(() => {
    if (isConnected && captain?._id) {
      sendMessage("join", {
        userType: "captain",
        userId: captain._id,
      });
    }
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        sendMessage("update-location-captain", {
          userId: captain._id,
          location: {
            lat: latitude,
            lng: longitude,
          },
        });
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [captain, isConnected, sendMessage]);

  useEffect(() => {
    socket?.on("new-ride", (data) => {
      console.log("✅ New ride request received:", data);
      setRideData(data);
      setRidePopUpPanel(true);
      setUserName(data.ride.user.fullName);
      // Show the ride popup
    });

    return () => {
      socket?.off("new-ride");
    };
  }, [socket]);

  async function confirmRide() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return false;
      }

      const rideId = rideData?.ride?._id || rideData?._id;
      if (!rideId) {
        console.error("No ride id found in ride data:", rideData);
        return false;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        { rideId },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      console.log("Ride confirmed:", response.data);
      return true;
    } catch (error) {
      console.error(
        "Error confirming ride:",
        error.response?.data || error.message,
      );
      return false;
    }
  }

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(RidePopUpPanelRef.current, {
        display: "block",
        height: "70%",
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
        <CaptainMap ride={rideData?.ride || rideData} className="h-full" />
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
          rideData={rideData}
          userName={userName}
          confirmRide={confirmRide}
        />
      </div>

      <div
        ref={ConfirmRidePopUpPanelRef}
        className="fixed z-10 w-full h-screen bottom-0 bg-white px-3 py-8"
      >
        <ConfirmRidePopUp
          rideData={rideData}
          userName={userName}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
