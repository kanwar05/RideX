import React from "react";

const VehiclePanel = (props) => {
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
      <h2 className="text-2xl mb-5 font-medium">Choose Vehicle</h2>
      <div
        onClick={() => {
          props.setConfirmedRidePanel(true);
        }}
        className="flex  items-center justify-between p-3 mb-3 rounded-xl border active:border-2 "
      >
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
        <h2 className="text-xl font-medium"> ₹{props.fare.car}</h2>
      </div>

      <div
        onClick={() => {
          props.setConfirmedRidePanel(true);
        }}
        className="flex flex-row items-center justify-between p-3 mb-3 border active:border-2 rounded-xl "
      >
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
        <h2 className="text-xl font-medium"> ₹{props.fare.moto}</h2>
      </div>

      <div
        onClick={() => {
          props.setConfirmedRidePanel(true);
        }}
        className="flex flex-row items-center justify-between p-3 mb-3 border active:border-2 rounded-xl "
      >
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
        <h2 className="text-xl font-medium"> ₹{props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
