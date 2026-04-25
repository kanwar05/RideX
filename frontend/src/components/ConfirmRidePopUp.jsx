import React from "react";
import { Link } from "react-router-dom";
const ConfirmRidePopUp = (props) => {
  return (
    <div>
      <h5
        className="w-full flex  items-center justify-center text-3xl mb-2 text-gray-600"
        onClick={() => {
          props.setConfirmRidePopUpPanel(false);
        }}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h2 className="text-3xl mb-2 font-medium px-3">New Ride Available</h2>

      <div className="flex flex-col items-center  justify-between px-6 py-8 w-full  ">
        <div className="flex items-center justify-between w-full bg-yellow-500 p-4 rounded-xl ">
          <div className="flex flex-row items-center space-x-3">
            <img
              className="h-13 w-13 rounded-full"
              src="https://imgs.search.brave.com/vdRYk5Fef873iKhep6GE8FrjCAJQafa8F189pqmsNjo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGeHM0/Y0pNekkvMi8wLzE2/MDB3L2NhbnZhLXB1/cnBsZS1ibGFjay1h/bmQtd2hpdGUtY29v/bC1jcmVhdGl2ZS1s/aW5rZWRpbi1wcm9m/aWxlLXBpY3R1cmUt/U283clZpQ1daYnMu/anBn"
            />
            <h1 className="text-xl font-semibold">John Doe</h1>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">2.2KM</h1>
            <h4 className="text-lg ">₹ 70.57</h4>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full mt-7 mb-5">
          <div className="flex gap-5 items-center mb-5 w-full">
            <h3 className="text-2xl font-semibold ">
              <i className="ri-map-pin-user-line"></i>
            </h3>
            <div className="w-full border-b border-gray-500  p-2">
              <h4 className="text-xl font-medium">ISBT-17</h4>
              <p className="text-base text-gray-600">Sector-17, Chandigarh</p>
            </div>
          </div>
          <div className="flex gap-5 items-center mb-5 w-full">
            <h3 className="text-2xl font-semibold ">
              <i className="ri-map-pin-fill"></i>
            </h3>
            <div className="w-full border-b border-gray-500  p-2">
              <h4 className="text-xl font-medium">Rose Garden</h4>
              <p className="text-base text-gray-600">Sector-16, Chandigarh</p>
            </div>
          </div>
          <div className="flex w-full gap-5 items-center mb-8 ">
            <h3 className="text-2xl font-semibold ">
              <i className="ri-hand-coin-line"></i>
            </h3>
            <div className=" w-full border-b border-gray-500  p-2 ">
              <h4 className="text-xl font-medium">₹ 193.57</h4>
              <p className="text-base text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <form>
            <input
              className="w-full bg-[#eee] h-10 rounded-xl font-mono text-lg font-medium mt-2 mb-4 py-6 px-6 placeholder:text-lg"
              type="text"
              placeholder="Enter OTP"
            />
            <div className="w-full flex items-center justify-center flex-row gap-2">
              <Link
                to="/captain-riding"
                className="bg-yellow-500 w-1/2 text-black  text-center text-xl py-3 px-6 rounded-full  "
              >
                Confirm
              </Link>
              <button
                onClick={() => {
                  props.setConfirmRidePopUpPanel(false);
                }}
                className="bg-red-600 w-1/2 text-white text-xl py-3 px-6  rounded-full "
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
