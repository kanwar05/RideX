import React from "react";
import { PremiumInput } from "./PremiumComponents";

const MapPinIcon = ({ size = 18 }) => (
  <i className="ri-map-pin-user-fill" style={{ fontSize: size }} />
);

const CrosshairIcon = ({ size = 18 }) => (
  <i className="ri-crosshair-2-fill" style={{ fontSize: size }} />
);

const PickupInput = ({
  value,
  onChange,
  onFocus,
  onUseCurrentLocation,
  loading = false,
}) => {
  return (
    <div className="relative">
      <PremiumInput
        value={value}
        onChange={onChange}
        onClick={onFocus}
        placeholder="Where are you?"
        icon={MapPinIcon}
      />

      <button
        type="button"
        onClick={onUseCurrentLocation}
        disabled={loading}
        className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center bg-blur-sm glass-sm text-gradient-animated rounded-lg transition-smooth active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        title={loading ? "Getting your location..." : "Use current location"}
      >
        {loading ? (
          <i className="ri-loader-4-line animate-spin text-lg"></i>
        ) : (
          <CrosshairIcon />
        )}
      </button>
    </div>
  );
};

export default PickupInput;
