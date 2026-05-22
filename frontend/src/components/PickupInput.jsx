import React from "react";

const PickupInput = ({
  value,
  onChange,
  onFocus,
  onUseCurrentLocation,
  loading = false,
}) => {
  return (
    <div className="mt-5">
      <div className="flex flex-row gap-4 items-center w-full border border-white/10  px-4 py-3 rounded-xl bg-slate-800 backdrop-blur shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        <i className="ri-map-pin-user-fill pointer-events-none  text-lg text-lime-500"></i>
        <input
          value={value}
          onChange={onChange}
          onClick={onFocus}
          className="w-full outline-none placeholder:text-base"
          type="text"
          placeholder="Enter your pickup location"
        />
      </div>

      <button
        type="button"
        onClick={onUseCurrentLocation}
        disabled={loading}
        className=" flex absolute right-6 top-19 h-11 w-11 items-center justify-center gap-3  px-4 text-sm font-semibold text-lime-500  transition active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-lime-500/50"
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full "></span>
        ) : (
          <i className="ri-crosshair-2-fill text-lg"></i>
        )}
        {/* <span>{loading ? "Fetching current location..." : "Use Current Location"}</span> */}
      </button>
    </div>
  );
};

export default PickupInput;
