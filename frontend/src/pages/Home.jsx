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
import UserMap from "../components/UserMap";
import PickupInput from "../components/PickupInput";
import { SocketDataContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentLocation } from "../services/mapService";
import Navbar from "../components/Navbar";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [pickupCoordinates, setPickupCoordinates] = useState(null);
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
  const [vehicleType, setVehicleType] = useState("");
  const [ride, setRide] = useState(null);
  const [currentLocationLoading, setCurrentLocationLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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

  useEffect(() => {
    if (!toastMessage) return undefined;

    const timeoutId = setTimeout(() => {
      setToastMessage("");
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [toastMessage]);

  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);
    setPickupCoordinates(null);
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
      setPickupCoordinates(null);
    } else if (activeField === "destination") {
      setDestination(suggestion);
    }
    setSuggestions([]);
  };

  const showToast = (message) => {
    setToastMessage(message);
  };

  const getLocationErrorMessage = (error) => {
    if (error?.code === 1) return "Location permission denied";
    if (error?.code === 2) return "GPS unavailable. Please try again.";
    if (error?.code === 3)
      return "Location request timed out. Please try again.";

    return error?.message || "Unable to fetch current location";
  };

  const handleUseCurrentLocation = async () => {
    if (currentLocationLoading) return;

    setCurrentLocationLoading(true);
    setActiveField("pickup");
    setPanelOpen(false);

    try {
      const currentLocation = await getCurrentLocation();
      setPickup(currentLocation.address);
      setPickupCoordinates(currentLocation.coordinates);
      setSuggestions([]);
    } catch (error) {
      console.error("Unable to use current location:", error);

      if (error?.message?.includes("reverse geocode")) {
        showToast("Could not convert your location into an address");
      } else if (error?.message?.includes("readable address")) {
        showToast("No address found for your current location");
      } else {
        showToast(getLocationErrorMessage(error));
      }
    } finally {
      setCurrentLocationLoading(false);
    }
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
        height: "60%",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
        height: "0%",
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
        display: "block",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
        display: "none",
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
      <div className="h-screen relative bg-[radial-gradient(circle_at_top_left,#0f172a,#020617)] ">
        <div className=" bg-[radial-gradient(circle_at_top_left,#0f172a,#020617)] text-white p-4">
          <Navbar />
        </div>

        <div className=" h-[60%] w-full">
          <UserMap
            pickup={pickup}
            pickupCoordinates={pickupCoordinates}
            destination={destination}
            ride={ride}
            className="h-[70%]"
          />
        </div>

        <div className="w-full z-10 flex flex-col justify-end h-screen absolute top-0 ">
          <div className=" p-4 bg-slate-900 text-white relative ">
            <h5
              ref={panelCloseRef}
              onClick={() => {
                setPanelOpen(false);
              }}
              className="absolute opacity-0 right-6 top-6 text-lime-500 text-2xl"
            >
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h1 className="text-2xl font-semibold text-lime-500">
              Let's make a Trip
            </h1>
            <form
              onSubmit={(e) => {
                submitHandler(e);
              }}
              className="flex flex-col w-full gap-6"
            >
              <PickupInput
                value={pickup}
                onChange={handlePickupChange}
                onFocus={() => {
                  setPanelOpen(true);
                }}
                onUseCurrentLocation={handleUseCurrentLocation}
                loading={currentLocationLoading}
              />
              <div className="flex flex-row gap-4 items-center w-full border border-white/10  px-4 py-3 rounded-xl bg-slate-800 backdrop-blur shadow-[0_0_40px_rgba(0,0,0,0.6)]">
                <i className="pointer-events-none  text-lg text-lime-500 ri-map-pin-line"></i>
                <input
                  value={destination}
                  onChange={handleDestinationChange}
                  onClick={() => {
                    setPanelOpen(true);
                  }}
                  className="outline-none w-full placeholder:text-base"
                  type="text"
                  placeholder="Enter your destination"
                />
              </div>
            </form>
            <div className="flex w-full items-center justify-center mt-4">
              <button
                onClick={findTrip}
                className="w-full bg-lime-500 text-black font-semibold backdrop-blur py-3 px-4 rounded-xl "
              >
                Find Trip
              </button>
            </div>
          </div>

          <div ref={panelRef} className=" p-4 bg-slate-900 text-white">
            <LocationSearchPanel
              setPanelOpen={setPanelOpen}
              setVehiclePanelOpen={setVehiclePanelOpen}
              suggestions={suggestions}
              onSuggestionSelect={handleSuggestionSelect}
            />
          </div>
        </div>

        {toastMessage && (
          <div className="fixed left-1/2 top-5 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-xl bg-black px-4 py-3 text-center text-sm font-semibold text-white shadow-2xl">
            {toastMessage}
          </div>
        )}

        <div
          ref={vehiclePanelRef}
          className="fixed z-10 w-full bottom-0 bg-slate-900 text-white/80 p-3 rounded-t-xl"
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
          className="fixed z-10 w-full bottom-0 bg-slate-900 rounded-t-xl "
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
          className="fixed z-10 w-full bottom-0 bg-slate-900 rounded-t-xl p-4"
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
        className="fixed z-10 w-full bottom-0 bg-white bg-slate-900 rounded-t-xl p-4"
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
