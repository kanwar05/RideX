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
      <div className="relative">
        <i className="ri-map-pin-user-fill pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-500"></i>
        <input
          value={value}
          onChange={onChange}
          onClick={onFocus}
          className="h-11 w-full rounded-lg bg-[#eee] px-12 text-[15px] font-medium text-black outline-none placeholder:text-base placeholder:font-normal focus:bg-white focus:ring-2 focus:ring-black"
          type="text"
          placeholder="Enter your pickup location"
        />
      </div>

      <button
        type="button"
        onClick={onUseCurrentLocation}
        disabled={loading}
        className=" flex absolute right-6 top-19 h-11 w-11 items-center justify-center gap-3  px-4 text-sm font-semibold text-black  transition active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
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
