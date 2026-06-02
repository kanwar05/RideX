import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PremiumCard } from "./PremiumComponents";

const FinishRide = (props) => {
  const { ride, userName, pickup, destination, fare } = props;
  const navigate = useNavigate();

  const finishRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        { rideId: ride?._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.status === 200) {
        navigate("/captain-home");
      }
    } catch (error) {
      console.error(
        "Error ending ride:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <div className="bg-slate-950 text-white rounded-t-3xl">
      <h5
        className="w-full flex  items-center justify-center text-3xl mb-2 text-slate-300 "
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h2 className="text-xl mb-3 text-white font-semibold px-3">
        Finish this Ride
      </h2>

      <PremiumCard className="p-6 space-y-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <img
              className="h-13 w-13 rounded-full"
              src="https://imgs.search.brave.com/vdRYk5Fef873iKhep6GE8FrjCAJQafa8F189pqmsNjo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGeHM0/Y0pNekkvMi8wLzE2/MDB3L2NhbnZhLXB1/cnBsZS1ibGFjay1h/bmQtd2hpdGUtY29v/bC1jcmVhdGl2ZS1s/aW5nZWRpbi1wcm9m/aWxlLXBpY3R1cmUt/U283clZpQ1daYnMu/anBn"
            />
            <h1 className="text-lg text-white font-semibold">{userName}</h1>
          </div>
          <div>
            <h1 className="text-lg text-indigo-300 font-semibold">
              2.2<span className="text-sm text-white/80"> KM</span>
            </h1>
          </div>
        </div>

        <div className="flex flex-col items-start w-full">
          <div className="flex gap-5 items-center mb-4 w-full">
            <h3 className="text-xl text-indigo-300 font-semibold ">
              <i className="ri-map-pin-user-line"></i>
            </h3>
            <div className="w-full border-b border-slate-700 p-2">
              <p className="text-lg text-indigo-200">Pickup</p>
              <h4 className="text-xs font-normal text-white/80">{pickup}</h4>
            </div>
          </div>
          <div className="flex gap-5 items-center mb-4 w-full">
            <h3 className="text-2xl text-emerald-300 font-semibold ">
              <i className="ri-map-pin-fill"></i>
            </h3>
            <div className="w-full border-b border-slate-700 p-2">
              <p className="text-lg text-emerald-200">Destination</p>
              <h4 className="text-xs font-normal text-white/80">
                {destination}
              </h4>
            </div>
          </div>
          <div className="flex w-full gap-5 items-center mb-8 ">
            <h3 className="text-2xl text-emerald-300 font-semibold ">
              <i className="ri-hand-coin-line"></i>
            </h3>
            <div className=" w-full border-b border-slate-700 p-2 ">
              <h4 className="text-lg text-white/80 font-medium">₹ {fare}</h4>
              <p className="text-base text-slate-400">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <button
            onClick={finishRide}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-500 active:scale-[0.99]"
          >
            Finish Ride
          </button>
        </div>
      </PremiumCard>
    </div>
  );
};

export default FinishRide;
