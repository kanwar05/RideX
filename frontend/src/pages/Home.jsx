import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketDataContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const waitingForDriverRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState("");
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const navigate = useNavigate();

  const { user } = useContext(UserDataContext);

  const { socket, sendMessage, isConnected } = useContext(SocketDataContext);

  useEffect(() => {
    if (isConnected && user?._id) {
      sendMessage("join", {
        userType: "user",
        userId: user._id,
      });
    }
  }, [user, isConnected, sendMessage]);

  useEffect(() => {
    socket?.on("ride-confirmed", (data) => {
      console.log("✅ New ride request accepted:", data);
      setRide(data);

      setVehicleFound(false);
      setWaitingForDriver(true);
    });
    return () => {
      socket?.off("ride-confirmed");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("ride-started", (data) => {
      setWaitingForDriver(false);
      navigate("/riding", {
        state: { rideData: data },
      });
    });
    return () => {
      socket?.off("ride-started");
    };
  }, [socket, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);
    setActiveField("pickup");

    if (value.length > 2) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-autocomplete-suggestions`,
          {
            params: { input: value },
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setSuggestions(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);
    setActiveField("destination");

    if (value.length > 2) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-autocomplete-suggestions`,
          {
            params: { input: value },
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setSuggestions(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
    } else if (activeField === "destination") {
      setDestination(suggestion);
    }
    setSuggestions([]);
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

  useGSAP(() => {
    if (confirmedRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmedRidePanel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);

  async function findTrip() {
    try {
      setVehiclePanelOpen(true);
      setPanelOpen(false);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: {
            pickup,
            destination,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(response.data);
      setFare(response.data);
    } catch (error) {
      console.error("ERROR:", error.response?.data || error.message);
    }
  }

  async function createTrip() {
    console.log(pickup, destination, vehicleType);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create-ride`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (!response) {
      console.log("not response");
    }
    console.log(response.data);
  }

  return (
    <div>
      <div className="h-screen relative overflow-hidden">
        <h1 className="text-4xl absolute font-semibold pl-5 pt-5 pb-3 ">
          Uber
        </h1>
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
                onChange={handlePickupChange}
                onClick={() => {
                  setPanelOpen(true);
                }}
                className="w-full bg-[#eee] h-10 rounded-sm mt-5 p-2 px-12 placeholder:text-base"
                type="text"
                placeholder="Enter your pickup location"
              />
              <input
                value={destination}
                onChange={handleDestinationChange}
                onClick={() => {
                  setPanelOpen(true);
                }}
                className="w-full  bg-[#eee] h-10 rounded-sm mt-5  px-12 p-2 placeholder:text-base"
                type="text"
                placeholder="Enter your destination"
              />
            </form>
            <div className="flex w-full items-center justify-center mt-6">
              <button
                onClick={findTrip}
                className="bg-black text-white text-center text-lg font-medium rounded-full w-1/2 p-2 "
              >
                Find Trip
              </button>
            </div>
          </div>
          <div ref={panelRef} className="h-0 p-5 bg-white">
            <LocationSearchPanel
              setPanelOpen={setPanelOpen}
              setVehiclePanelOpen={setVehiclePanelOpen}
              suggestions={suggestions}
              onSuggestionSelect={handleSuggestionSelect}
            />
          </div>
        </div>

        <div
          ref={vehiclePanelRef}
          className="fixed z-10 w-full bottom-0 bg-white px-3 py-8"
        >
          <VehiclePanel
            selectVehicleType={setVehicleType}
            setConfirmedRidePanel={setConfirmedRidePanel}
            setVehiclePanelOpen={setVehiclePanelOpen}
            fare={fare}
          />
        </div>

        <div
          ref={confirmRidePanelRef}
          className="fixed z-10 w-full bottom-0 bg-white px-3 py-8"
        >
          <ConfirmedRide
            pickup={pickup}
            destination={destination}
            createTrip={createTrip}
            vehicleType={vehicleType}
            fare={fare}
            setConfirmedRidePanel={setConfirmedRidePanel}
            setVehicleFound={setVehicleFound}
          />
        </div>

        <div
          ref={vehicleFoundRef}
          className="fixed z-10 w-full bottom-0 bg-white px-3 py-8"
        >
          <LookingForDriver
            pickup={pickup}
            destination={destination}
            createTrip={createTrip}
            vehicleType={vehicleType}
            fare={fare}
            setVehicleFound={setVehicleFound}
          />
        </div>
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed z-10 w-full bottom-0 bg-white px-3 py-8"
      >
        <WaitingForDriver
          ride={ride}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
