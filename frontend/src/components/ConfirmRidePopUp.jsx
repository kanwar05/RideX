import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { PremiumCard, PremiumInput } from "./PremiumComponents";

const ConfirmRidePopUp = (props) => {
  const { rideData, userName } = props;
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!otp || otp.length !== 4) {
        alert("Please enter a valid 4-digit OTP");
        return;
      }

      const rideId = rideData?.ride?._id || rideData?._id;
      if (!rideId) {
        console.error("No ride ID found:", rideData);
        alert("Error: Ride ID not found");
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          params: {
            rideId: rideId,
            otp: otp,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data) {
        console.log("Ride started successfully:", response.data);
        // Close the popup
        props.setConfirmRidePopUpPanel(false);
        // Navigation will be handled by socket event listener
      }
    } catch (error) {
      console.error("Error starting ride:", error);
      const errorMessage =
        error.response?.data?.message || "Invalid OTP or ride not found";
      alert(`Failed to start ride: ${errorMessage}`);
      setOtp("");
    }
  };

  return (
    <div>
      <h5
        className="w-full flex  items-center justify-center text-3xl mb-2 text-gradient-animated "
        onClick={() => {
          props.setConfirmRidePopUpPanel(false);
        }}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h2 className="text-2xl text-gradient-animated mb-2 text-gradient-animated font-medium ">
        Let's Confirm Your Ride
      </h2>

      <PremiumCard className="p-6 space-y-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <img
              className="h-12 w-12 rounded-full"
              src="https://imgs.search.brave.com/vdRYk5Fef873iKhep6GE8FrjCAJQafa8F189pqmsNjo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGeHM0/Y0pNekkvMi8wLzE2/MDB3L2NhbnZhLXB1/cnBsZS1ibGFjay1h/bmQtd2hpdGUtY29v/bC1jcmVhdGl2ZS1s/aW5rZWRpbi1wcm9m/aWxlLXBpY3R1cmUt/U283clZpQ1daYnMu/anBn"
            />
            <h1 className="text-lg text-white/80 font-semibold">
              {userName?.firstName + " " + userName?.lastName}
            </h1>
          </div>
          <div className="text-right">
            <h1 className="text-lg text-white/80 ">2.2 KM</h1>
            <h4 className="text-lg text-gradient-animated">
              ₹{rideData?.ride?.fare}
            </h4>
          </div>
        </div>

        <div className="flex flex-col items-start w-full">
          <div className="flex gap-5 items-center mb-4 w-full">
            <h3 className="text-xl text-gradient-animated font-semibold ">
              <i className="ri-map-pin-user-line"></i>
            </h3>
            <div className="w-full border-b border-white/20 p-2">
              <h4 className="text-xl text-gradient-animated font-medium">
                Pick Up
              </h4>
              <p className="text-base text-white/80">{rideData?.pickup}</p>
            </div>
          </div>
          <div className="flex gap-5 items-center mb-4 w-full">
            <h3 className="text-xl text-gradient-animated font-semibold ">
              <i className="ri-map-pin-fill"></i>
            </h3>
            <div className="w-full border-b border-white/20 p-2">
              <h4 className="text-xl text-gradient-animated font-medium">
                Destination
              </h4>
              <p className="text-base text-white/80">{rideData?.destination}</p>
            </div>
          </div>
          <div className="flex w-full gap-5 items-center mb-8 ">
            <h3 className="text-xl text-gradient-animated font-semibold ">
              <i className="ri-hand-coin-line"></i>
            </h3>
            <div className=" w-full border-b border-white/20 p-2 ">
              <h4 className="text-xl text-gradient-animated font-medium">
                ₹{rideData?.ride?.fare}
              </h4>
              <p className="text-base text-gray-200">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <form onSubmit={submitHandler}>
            <PremiumInput
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            <div className="w-full flex items-center justify-center flex-row gap-2 mt-4">
              <button
                type="submit"
                className="w-1/2 rounded-lg py-3 btn-premium text-white font-semibold"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => {
                  props.setConfirmRidePopUpPanel(false);
                }}
                className="w-1/2 rounded-lg py-3 bg-red-800 text-white font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </PremiumCard>
    </div>
  );
};

export default ConfirmRidePopUp;
