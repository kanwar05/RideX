import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const ConfirmRidePopUp = (props) => {
  const { rideData, userName } = props;
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const rideId = rideData?.ride?._id || rideData?._id;
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          params: { rideId, otp },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      if (response.status === 200) {
        props.setConfirmRidePopUpPanel(false);
        navigate("/captain-riding", {
          state: { rideData: response.data },
        });
      }
    } catch (error) {
      console.error(
        "Error starting ride:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <div>
      <h5
        className="w-full flex  items-center justify-center text-3xl mb-2 text-lime-500"
        onClick={() => {
          props.setConfirmRidePopUpPanel(false);
        }}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h2 className="text-2xl mb-2 text-lime-500 font-medium ">New Ride Available</h2>

      <div className="flex flex-col items-center  justify-between p-4 w-full  ">
        <div className="flex items-center justify-between w-full bg-slate-800 border-white/10 p-4 rounded-xl ">
          <div className="flex flex-row items-center space-x-3">
            <img
              className="h-13 w-13 rounded-full"
              src="https://imgs.search.brave.com/vdRYk5Fef873iKhep6GE8FrjCAJQafa8F189pqmsNjo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGeHM0/Y0pNekkvMi8wLzE2/MDB3L2NhbnZhLXB1/cnBsZS1ibGFjay1h/bmQtd2hpdGUtY29v/bC1jcmVhdGl2ZS1s/aW5rZWRpbi1wcm9m/aWxlLXBpY3R1cmUt/U283clZpQ1daYnMu/anBn"
            />
            <h1 className="text-lg text-white/80 font-semibold">
              {userName?.firstName + " " + userName?.lastName}
            </h1>
          </div>
          <div>
            <h1 className="text-lg text-white/80 font-semibold">2.2 KM</h1>
            <h4 className="text-xl text-lime-500/80">₹{rideData?.ride?.fare}</h4>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start w-full mt-7 mb-5">
          <div className="flex gap-5 items-center mb-5 w-full">
            <h3 className="text-xl text-lime-500 font-semibold ">
              <i className="ri-map-pin-user-line"></i>
            </h3>
            <div className="w-full border-b border-lime-500  p-2">
              <h4 className="text-xl text-lime-500 font-medium">Pick Up</h4>
              <p className="text-base text-gray-200">{rideData?.pickup}</p>
            </div>
          </div>
          <div className="flex gap-5 items-center mb-5 w-full">
            <h3 className="text-xl text-lime-500 font-semibold ">
              <i className="ri-map-pin-fill"></i>
            </h3>
            <div className="w-full border-b border-lime-500  p-2">
              <h4 className="text-xl text-lime-500 font-medium">Destination</h4>
              <p className="text-base text-gray-200">{rideData?.destination}</p>
            </div>
          </div>
          <div className="flex w-full gap-5 items-center mb-8 ">
            <h3 className="text-xl text-lime-500 font-semibold ">
              <i className="ri-hand-coin-line"></i>
            </h3>
            <div className=" w-full border-b border-lime-500  p-2 ">
              <h4 className="text-xl text-lime-500 font-medium">₹{rideData?.ride?.fare}</h4>
              <p className="text-base text-gray-200">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <form onSubmit={submitHandler}>
            <input
              className="w-full bg-slate-800 border border-white/10 h-10 rounded-xl font-mono text-lg font-medium mt-2 mb-4 text-white py-6 px-6 placeholder:text-lg"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            <div className="w-full flex items-center justify-center flex-row gap-2">
              <button
                type="submit"
                className="bg-lime-500 w-1/2 text-black  text-center text-xl py-3 px-6 rounded-full  "
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => {
                  props.setConfirmRidePopUpPanel(false);
                }}
                className="bg-slate-800 w-1/2 text-white text-xl py-3 px-6  rounded-full "
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
