import React from "react";

const VehiclePanel = (props) => {
  return (
    <div className="h-full w-full flex flex-col p-4">
      <h5
        className="w-full flex  items-center justify-center text-3xl mb-2 text-lime-500"
        onClick={() => {
          props.setVehiclePanelOpen(false);
        }}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>
      <h2 className="text-2xl text-lime-500 mb-5 font-normal">
        Choose Vehicle
      </h2>
      <div
        onClick={() => {
          props.setConfirmedRidePanel(true);
          props.selectVehicleType("car");
          props.setVehiclePanelOpen(false);
        }}
        className="flex w-full bg-slate-800 shadow-2xl border-white/10 items-center justify-between p-3 mb-3 rounded-xl border active:border-2 "
      >
        <img
          className="h-15"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
        />
        <div className="w-1/2 ">
          <h4 className="text-lg text-white/90 font-semibold ">
            RideX Go{" "}
            <span className="text-sm  font-semibold">
              <i className="ri-user-3-fill"></i> 4{" "}
            </span>{" "}
          </h4>
          <h5 className="text-lg text-white/60 font-semibold">2 mins away</h5>
          <p className="text-sm text-white/60 font-normal ">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-xl text-lime-500/70 font-medium">
          {" "}
          ₹ {props.fare.car}
        </h2>
      </div>

      <div
        onClick={() => {
          props.setConfirmedRidePanel(true);
          props.selectVehicleType("moto");
          props.setVehiclePanelOpen(false);
        }}
        className="flex w-full bg-slate-800 shadow-2xl border-white/10 items-center justify-between p-3 mb-3 rounded-xl border active:border-2 "
      >
        <img
          className="h-15"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=896/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n"
        />
        <div className="w-1/2 ">
          <h4 className="text-lg text-white/90 font-semibold ">
            Moto{" "}
            <span className="text-sm  font-semibold">
              <i className="ri-user-3-fill"></i> 1{" "}
            </span>{" "}
          </h4>
          <h5 className="text-lg text-white/60 font-semibold">3 mins away</h5>
          <p className="text-sm text-white/60 font-normal ">
            Affordable, bike rides
          </p>
        </div>
        <h2 className="text-xl text-lime-500/70 font-medium">
          {" "}
          ₹ {props.fare.moto}
        </h2>
      </div>

      <div
        onClick={() => {
          props.setConfirmedRidePanel(true);
          props.selectVehicleType("auto");
          props.setVehiclePanelOpen(false);
        }}
        className="flex w-full bg-slate-800 shadow-2xl border-white/10 items-center justify-between p-3 mb-3 rounded-xl border active:border-2 "
      >
        <img
          className="h-15"
          src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
        />
        <div className="w-1/2 ">
          <h4 className="text-lg text-white/90 font-semibold ">
            RideX Auto{" "}
            <span className="text-sm  font-semibold">
              <i className="ri-user-3-fill"></i> 4{" "}
            </span>{" "}
          </h4>
          <h5 className="text-lg text-white/60 font-semibold">2 mins away</h5>
          <p className="text-sm text-white/60 font-normal ">
            Affordable, Auto rides
          </p>
        </div>
        <h2 className="text-xl text-lime-500/70 font-medium">
          {" "}
          ₹ {props.fare.auto}
        </h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
