import React from "react";

const ConfirmedRide = () => {
  return (
    <div>
      <h5
        className="w-full flex  items-center justify-center text-3xl mb-2 text-gray-600"
        onClick={() => {
          props.setVehiclePanelOpen(false);
        }}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h2 className="text-2xl mb-5 font-medium">Confirm your Ride</h2>

      <div className="flex flex-col items-center justify-between px-6 py-8 w-full">
        <img
          className="h-20"
          src="https://imgs.search.brave.com/0pmDgaF29KfD8qd3f0rXJpFZ5LyX8Tk6oew0U1PT_UM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzUv/MDQzLzI1Ni9zbWFs/bC9sdXh1cnktY2Fy/LXZhY3Rvci1kZXNp/Z24tdmVjdG9yLmpw/Zw"
        />
        <div className="flex flex-col items-start justify-start w-full mt-7 mb-5">
          <div className="flex gap-5 items-center p-5">
            <h3 className="text-3xl font-semibold ">
              <i className="ri-map-pin-fill"></i>
            </h3>
            <div className="">
              <h4 className="text-lg font-medium">#1504, Govind Vihar 2</h4>
              <p className="text-lg text-gray-600">DeraBassi, Mohali, Punjab</p>
            </div>
          </div>
          <div className="flex gap-5 items-center p-5">
            <h3 className="text-3xl font-semibold ">
              <i className="ri-map-pin-5-fill"></i>
            </h3>
            <div className="">
              <h4 className="text-lg font-medium">#1504, Govind Vihar 2</h4>
              <p className="text-lg text-gray-600">DeraBassi, Mohali, Punjab</p>
            </div>
          </div>
          <div className="flex gap-5 items-center p-5">
            <h3 className="text-3xl font-semibold ">
              <i className="ri-hand-coin-line"></i>
            </h3>
            <div className="">
              <h4 className="text-lg font-medium">#1504, Govind Vihar 2</h4>
              <p className="text-lg text-gray-600">DeraBassi, Mohali, Punjab</p>
            </div>
          </div>
        </div>
        <button className="bg-black w-1/2 text-white py-3 px-6 rounded-lg hover:bg-gray-800">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;
