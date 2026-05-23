import React from "react";

const PickupInput = ({
  value,
  onChange,
  onFocus,
  onUseCurrentLocation,
  loading = false,
}) => {
  return (
    <div className="relative">
      <div className="flex items-center gap-3 w-full px-4 py-3 sm:py-4 bg-dark-800 border border-dark-700 rounded-lg focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-smooth">
        <i className="ri-map-pin-user-fill text-lg text-primary flex-shrink-0"></i>
        <input
          value={value}
          onChange={onChange}
          onClick={onFocus}
          className="w-full bg-transparent outline-none placeholder-text-muted text-text-primary text-base sm:text-lg"
          type="text"
          placeholder="Where are you?"
        />
      </div>

      <button
        type="button"
        onClick={onUseCurrentLocation}
        disabled={loading}
        className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center bg-primary hover:bg-primary-dark text-dark-950 rounded-lg transition-smooth active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        title={loading ? "Getting your location..." : "Use current location"}
      >
        {loading ? (
          <i className="ri-loader-4-line animate-spin text-lg"></i>
        ) : (
          <i className="ri-crosshair-2-fill text-lg"></i>
        )}
      </button>
    </div>
  );
};

export default PickupInput;
