import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      console.error("Error ending ride:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h5
        className="w-full flex  items-center justify-center text-3xl mb-2 text-gray-600"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h2 className="text-3xl mb-2 font-medium px-3">Finish this Ride</h2>

      <div className="flex flex-col items-center  justify-between px-6 py-8 w-full  ">
        <div className="flex items-center justify-between w-full border-2 border-yellow-500 p-4 rounded-xl ">
          <div className="flex flex-row items-center space-x-3">
            <img
              className="h-13 w-13 rounded-full"
              src="https://imgs.search.brave.com/vdRYk5Fef873iKhep6GE8FrjCAJQafa8F189pqmsNjo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGeHM0/Y0pNekkvMi8wLzE2/MDB3L2NhbnZhLXB1/cnBsZS1ibGFjay1h/bmQtd2hpdGUtY29v/bC1jcmVhdGl2ZS1s/aW5rZWRpbi1wcm9m/aWxlLXBpY3R1cmUt/U283clZpQ1daYnMu/anBn"
            />
            <h1 className="text-xl font-semibold">{userName}</h1>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">
              2.2<span className="text-sm text-gray-800">KM</span>{" "}
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full mt-7 mb-5">
          <div className="flex gap-5 items-center mb-5 w-full">
            <h3 className="text-2xl font-semibold ">
              <i className="ri-map-pin-user-line"></i>
            </h3>
            <div className="w-full border-b border-gray-500  p-2">
              <h4 className="text-xl font-medium">{pickup}</h4>
              <p className="text-base text-gray-600">Sector-17, Chandigarh</p>
            </div>
          </div>
          <div className="flex gap-5 items-center mb-5 w-full">
            <h3 className="text-2xl font-semibold ">
              <i className="ri-map-pin-fill"></i>
            </h3>
            <div className="w-full border-b border-gray-500  p-2">
              <h4 className="text-xl font-medium">{destination}</h4>
              <p className="text-base text-gray-600">Sector-16, Chandigarh</p>
            </div>
          </div>
          <div className="flex w-full gap-5 items-center mb-8 ">
            <h3 className="text-2xl font-semibold ">
              <i className="ri-hand-coin-line"></i>
            </h3>
            <div className=" w-full border-b border-gray-500  p-2 ">
              <h4 className="text-xl font-medium">₹{fare}</h4>
              <p className="text-base text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center ">
          {" "}
          <button
            onClick={finishRide}
            className="bg-yellow-500 w-3/4 text-black text-xl py-3 px-6  rounded-full "
          >
            Finish Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
