import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaChevronRight,
  FaClock,
  FaWallet,
} from "react-icons/fa";
import {
  PremiumCard,
  RideCard,
  FareEstimateCard,
  DriverInfoCard,
  PremiumInput,
  Tabs,
  LoadingSpinner,
} from "./PremiumComponents";
import "remixicon/fonts/remixicon.css";

/**
 * Enhanced Booking Flow Component
 * - Multi-step ride booking UI
 * - Smooth transitions between steps
 * - Real-time fare updates
 * - Premium visual hierarchy
 */
const EnhancedBookingFlow = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState("location");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [isLoading, setIsLoading] = useState(false);

  // Mock vehicle data
  const vehicles = [
    {
      id: 1,
      name: "Economy",
      description: "Budget-friendly option",
      image: "https://images.unsplash.com/photo-1552519507-da3effff991c?w=200",
      eta: 4,
      fare: 12.5,
    },
    {
      id: 2,
      name: "Premium",
      description: "Comfortable & modern",
      image:
        "https://images.unsplash.com/photo-1605559424843-9e4c3ca3806d?w=200",
      eta: 6,
      fare: 18.5,
    },
    {
      id: 3,
      name: "XL",
      description: "Perfect for groups",
      image:
        "https://images.unsplash.com/photo-1605559424843-9e4c3ca3806d?w=200",
      eta: 8,
      fare: 24.0,
    },
  ];

  // Mock driver data
  const mockDriver = {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=driver1",
    rating: 4.98,
    trips: 2840,
    vehicle: "Tesla Model 3",
    plate: "TX-M3-4829",
  };

  const steps = [
    { id: "location", label: "Location", icon: "ri-map-pin-line" },
    { id: "vehicle", label: "Vehicle", icon: "ri-car-line" },
    { id: "confirm", label: "Confirm", icon: "ri-check-line" },
    { id: "ride", label: "Ride", icon: "ri-steering-2-line" },
  ];

  const handleStepChange = (step) => {
    if (step === "vehicle" && (!pickup || !destination)) {
      alert("Please enter location details");
      return;
    }
    setCurrentStep(step);
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="space-y-4">
        <div className="flex justify-between">
          {steps.map((step, i) => (
            <button
              key={step.id}
              onClick={() => handleStepChange(step.id)}
              className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                currentStep === step.id
                  ? "text-indigo-300 scale-110"
                  : "text-slate-500 opacity-50"
              }`}
              disabled={i > steps.findIndex((s) => s.id === currentStep)}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  currentStep === step.id
                    ? "bg-indigo-600 shadow-lg shadow-indigo-950/30"
                    : "bg-slate-800"
                }`}
              >
                <i className={`${step.icon} text-lg`}></i>
              </div>
              <span className="text-xs font-medium">{step.label}</span>
            </button>
          ))}
        </div>
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{
              width: `${((steps.findIndex((s) => s.id === currentStep) + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-96">
        {/* Step 1: Location Input */}
        {currentStep === "location" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Where are you going?</h2>

            <PremiumCard>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Pickup Location
                  </label>
                  <PremiumInput
                    icon={FaMapMarkerAlt}
                    placeholder="Enter pickup address"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Destination
                  </label>
                  <PremiumInput
                    icon={FaMapMarkerAlt}
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>

                <button
                  onClick={() => handleStepChange("vehicle")}
                  disabled={!pickup || !destination}
                  className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue
                  <FaChevronRight />
                </button>
              </div>
            </PremiumCard>

            {/* Quick Suggestions */}
            <div className="space-y-2">
              <p className="text-sm text-slate-400 font-medium">
                Saved Places
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: "ri-home-line",
                    label: "Home",
                    address: "123 Main St",
                  },
                  {
                    icon: "ri-briefcase-line",
                    label: "Work",
                    address: "456 Office Blvd",
                  },
                ].map((place) => (
                  <button
                    key={place.label}
                    className="p-3 rounded-xl border border-slate-700 bg-slate-900 text-left transition hover:bg-slate-800"
                    onClick={() => {
                      setDestination(place.address);
                      handleStepChange("vehicle");
                    }}
                  >
                    <i
                      className={`${place.icon} text-indigo-300 text-lg mb-2`}
                    ></i>
                    <p className="font-medium text-sm">{place.label}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {place.address}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Vehicle Selection */}
        {currentStep === "vehicle" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Choose a ride</h2>

            <div className="space-y-3">
              {vehicles.map((vehicle) => (
                <RideCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  fare={vehicle.fare}
                  isSelected={selectedVehicle?.id === vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle)}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4">
              <button
                onClick={() => handleStepChange("location")}
                className="py-3 rounded-xl border border-slate-700 bg-slate-900 font-medium transition hover:bg-slate-800"
              >
                Back
              </button>
              <button
                onClick={() => handleStepChange("confirm")}
                disabled={!selectedVehicle}
                className="py-3 rounded-xl bg-indigo-600 font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm Booking */}
        {currentStep === "confirm" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Review your ride</h2>

            {/* Route Summary */}
            <PremiumCard>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <i className="ri-map-pin-2-fill text-indigo-300"></i>
                  </div>
                  <div className="w-0.5 h-16 bg-indigo-500/20"></div>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <i className="ri-map-pin-fill text-emerald-300"></i>
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <div>
                    <p className="text-xs text-slate-400">Pickup</p>
                    <p className="font-medium">{pickup}</p>
                  </div>
                  <div className="mt-12">
                    <p className="text-xs text-slate-400">Destination</p>
                    <p className="font-medium">{destination}</p>
                  </div>
                </div>
              </div>
            </PremiumCard>

            {/* Vehicle Summary */}
            <PremiumCard>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedVehicle.image}
                    alt={selectedVehicle.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-bold">{selectedVehicle.name}</p>
                    <p className="text-sm text-slate-400">
                      {selectedVehicle.description}
                    </p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-indigo-300">
                  ${selectedVehicle.fare}
                </p>
              </div>
            </PremiumCard>

            {/* Payment Method */}
            <PremiumCard>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Payment Method
              </label>
              <Tabs
                tabs={[
                  { id: "card", label: "Card" },
                  { id: "wallet", label: "Wallet" },
                  { id: "cash", label: "Cash" },
                ]}
                activeTab={selectedPayment}
                onChange={setSelectedPayment}
              />
            </PremiumCard>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <button
                onClick={() => handleStepChange("vehicle")}
                className="py-3 rounded-xl border border-slate-700 bg-slate-900 font-medium transition hover:bg-slate-800"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setCurrentStep("ride");
                    setIsLoading(false);
                  }, 1500);
                }}
                disabled={isLoading}
                className="py-3 rounded-xl bg-indigo-600 font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? <LoadingSpinner size="sm" /> : "Book Now"}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Ride Booked - Finding Driver */}
        {currentStep === "ride" && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-950/30">
                <i className="ri-check-line text-3xl text-white"></i>
              </div>
              <h2 className="text-2xl font-bold mb-2">Ride Booked!</h2>
              <p className="text-slate-400">Finding a driver near you...</p>
            </div>

            {/* Finding Driver Animation */}
            <PremiumCard className="text-center py-12">
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
                  <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
                  <div className="absolute inset-4 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-950/30">
                    <i className="ri-car-line text-3xl text-white"></i>
                  </div>
                </div>
              </div>
              <p className="font-medium text-lg mb-2">
                Searching for drivers...
              </p>
              <p className="text-sm text-slate-400">3 drivers nearby</p>
            </PremiumCard>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <PremiumCard className="text-center py-4">
                <div className="text-2xl font-bold text-indigo-300 mb-1">
                  4 min
                </div>
                <p className="text-xs text-slate-400">Estimated pickup</p>
              </PremiumCard>
              <PremiumCard className="text-center py-4">
                <div className="text-2xl font-bold text-emerald-300 mb-1">
                  $18.50
                </div>
                <p className="text-xs text-slate-400">Total fare</p>
              </PremiumCard>
              <PremiumCard className="text-center py-4">
                <div className="text-2xl font-bold text-amber-300 mb-1">
                  12 min
                </div>
                <p className="text-xs text-slate-400">Est. travel time</p>
              </PremiumCard>
            </div>

            <button
              onClick={() => onComplete && onComplete()}
              className="w-full py-3 rounded-xl border border-slate-700 bg-slate-900 font-medium transition hover:bg-slate-800"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedBookingFlow;
