import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import "remixicon/fonts/remixicon.css";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * PREMIUM CARD COMPONENTS - RideX Design System
 * ═══════════════════════════════════════════════════════════════════════════════
 */

/**
 * Premium Card Base
 * - Glassmorphic design
 * - Hover lift animation
 * - Gradient accents
 */
export const PremiumCard = ({
  children,
  className = "",
  hover = true,
  accent = false,
}) => (
  <div
    className={`rounded-2xl border border-slate-700/70 bg-slate-900/90 p-5 text-slate-100 shadow-xl shadow-black/20 backdrop-blur-sm transition duration-200 ${
      hover ? "hover:-translate-y-0.5 hover:border-indigo-400/60 hover:shadow-2xl hover:shadow-indigo-950/30" : ""
    } ${
      accent ? "ring-2 ring-indigo-400/50" : ""
    } ${className}`}
  >
    {children}
  </div>
);

/**
 * Ride Card Component
 * - Vehicle details
 * - Fare estimation
 * - Interactive selection
 */
export const RideCard = ({ vehicle, fare, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`premium-card w-full text-left transition-all duration-300 ${
      isSelected ? "ring-2 ring-primary scale-102" : "hover-lift"
    }`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div>
          <h3 className="font-bold text-lg">{vehicle.name}</h3>
          <p className="text-sm text-slate-400">{vehicle.description}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-indigo-300">${fare}</p>
        <p className="text-xs text-slate-400">~{vehicle.eta} mins</p>
      </div>
    </div>
    {isSelected && (
      <div className="pt-4 border-t border-slate-700 flex items-center gap-2 text-indigo-300">
        <FaCheckCircle />
        <span className="text-sm font-medium">Selected</span>
      </div>
    )}
  </button>
);

/**
 * Driver Info Card
 * - Driver profile
 * - Rating system
 * - Contact buttons
 */
export const DriverInfoCard = ({ driver, onMessage, onCall }) => (
  <PremiumCard>
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-4">
        <img
          src={driver.avatar}
          alt={driver.name}
          className="w-20 h-20 rounded-full object-cover border-2 border-primary"
        />
        <div>
          <h3 className="font-bold text-white/80 text-xl">{driver.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center text-yellow-500 gap-1 text-accent">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`ri-star-${i < Math.floor(driver.rating) ? "fill" : "line"}`}
                ></i>
              ))}
            </div>
            <span className="text-sm text-slate-400">
              ({driver.trips} trips)
            </span>
          </div>
        </div>
      </div>
      <span className="text-green-400 text-sm font-medium">● Online</span>
    </div>

    <div className="grid grid-cols-2 gap-3 mb-6">
      <div className="p-3 rounded-lg bg-surface-hover">
        <p className="text-xs text-white mb-1">Vehicle</p>
        <p className="font-medium text-white text-sm">{driver.vehicle}</p>
      </div>
      <div className="p-3 rounded-lg bg-surface-hover">
        <p className="text-xs text-white mb-1">Plate</p>
        <p className="font-medium text-white text-sm">{driver.plate}</p>
      </div>
    </div>

    {/* <div className="flex gap-3">
      <button
        onClick={onMessage}
        className="flex-1 py-2.5 rounded-lg bg-green-500/80 text-white font-medium"
      >
        <i className="ri-message-line mr-2"></i>Message
      </button>
      <button
        onClick={onCall}
        className="flex-1 py-2.5 rounded-lg bg-red-500/80 text-white font-medium "
      >
        <i className="ri-phone-line mr-2"></i>Call
      </button>
    </div> */}
  </PremiumCard>
);

/**
 * Fare Estimate Card
 * - Animated fare display
 * - Breakdown details
 * - Call-to-action
 */
export const FareEstimateCard = ({ from, to, fare, breakdown, onConfirm }) => (
  <PremiumCard className="space-y-4">
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-xl">Fare Estimate</h3>
      <span className="text-sm text-slate-400">Cash • Card</span>
    </div>

    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <i className="ri-map-pin-2-fill text-indigo-300"></i>
        </div>
        <div className="text-sm">
          <p className="text-slate-400">From</p>
          <p className="font-medium">{from}</p>
        </div>
      </div>
      <div className="px-0 py-2 border-l-2 border-indigo-400/30 ml-2 h-8"></div>
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <i className="ri-map-pin-fill text-emerald-300"></i>
        </div>
        <div className="text-sm">
          <p className="text-slate-400">To</p>
          <p className="font-medium">{to}</p>
        </div>
      </div>
    </div>

    {breakdown && (
      <>
        <div className="h-px bg-slate-700"></div>
        <div className="space-y-2 text-sm">
          {breakdown.map((item, i) => (
            <div key={i} className="flex justify-between">
              <span className="text-slate-400">{item.label}</span>
              <span className="font-medium">${item.amount}</span>
            </div>
          ))}
        </div>
      </>
    )}

    <div className="pt-4 border-t border-border">
      <div className="flex justify-between items-center mb-4">
        <span className="text-slate-400">Total</span>
        <span className="text-3xl font-bold text-indigo-300">
          ${fare}
        </span>
      </div>
      <button
        onClick={onConfirm}
        className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-white font-bold transition hover:bg-indigo-500 active:scale-[0.99]"
      >
        Confirm & Book
      </button>
    </div>
  </PremiumCard>
);

/**
 * Premium Input Field
 * - Animated label float
 * - Icon support
 * - Focus states
 */
export const PremiumInput = React.forwardRef(
  ({ label, placeholder, icon: Icon, error, success, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const [filled, setFilled] = useState(false);

    return (
      <div className="relative w-full group flex flex-row gap-3 items-center rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white shadow-sm transition focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-400/20">
        {Icon && (
          <div className="text-indigo-300">
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className={`w-full bg-transparent text-start text-sm text-white placeholder:text-slate-500 outline-none   ${
            error ? "border-red-500 focus:border-red-400" : ""
          } ${success ? "border-green-500 focus:border-green-400" : ""}`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setFilled(e.target.value !== "")}
          {...props}
        />
        {label && (
          <label
            className={`absolute left-4 ${Icon ? "left-12" : "left-4"} top-1/2 transform -translate-y-1/2 transition-all duration-300 pointer-events-none origin-left ${
              focused || filled
                ? "scale-75 -translate-y-6 text-indigo-300"
                : "text-slate-500"
            }`}
          >
            {label}
          </label>
        )}
        {error && (
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500">
            <FaExclamationCircle />
          </span>
        )}
        {success && (
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500">
            <FaCheckCircle />
          </span>
        )}
      </div>
    );
  },
);

PremiumInput.displayName = "PremiumInput";

/**
 * Toast Notification Component
 * - Auto-dismiss
 * - Multiple types (success, error, info, warning)
 * - Smooth animations
 */
export const Toast = ({
  message,
  type = "info",
  onClose,
  autoClose = true,
}) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const typeConfig = {
    success: {
      icon: FaCheckCircle,
      bg: "bg-green-500/20",
      border: "border-green-500/30",
      text: "text-green-400",
    },
    error: {
      icon: FaExclamationCircle,
      bg: "bg-red-500/20",
      border: "border-red-500/30",
      text: "text-red-400",
    },
    info: {
      icon: FaInfoCircle,
      bg: "bg-indigo-500/20",
      border: "border-indigo-500/30",
      text: "text-indigo-300",
    },
    warning: {
      icon: FaExclamationCircle,
      bg: "bg-yellow-500/20",
      border: "border-yellow-500/30",
      text: "text-yellow-400",
    },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`${config.bg} border ${config.border} flex items-center gap-3 max-w-sm rounded-xl px-4 py-3 text-white shadow-2xl shadow-black/30 backdrop-blur-sm`}
      >
        <Icon className={`text-xl ${config.text}`} />
        <span className="flex-1 text-sm text-white">{message}</span>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

/**
 * Skeleton Loader
 * - Animated loading state
 * - Various sizes
 */
export const SkeletonLoader = ({
  count = 1,
  className = "h-12 rounded-lg",
}) => (
  <div className="space-y-4">
    {[...Array(count)].map((_, i) => (
      <div key={i} className={`skeleton-loader ${className}`} />
    ))}
  </div>
);

/**
 * Loading Spinner Component
 * - Premium animated spinner
 * - Size variants
 */
export const LoadingSpinner = ({ size = "md", fullScreen = false }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const spinner = (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 border-2 border-transparent border-t-indigo-400 border-r-emerald-400 rounded-full animate-spin" />
      <div
        className="absolute inset-2 border-2 border-transparent border-t-amber-300 border-r-indigo-400 rounded-full animate-spin"
        style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
      />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
};

/**
 * Tab Component
 * - Smooth animations
 * - Active indicators
 */
export const Tabs = ({ tabs, activeTab, onChange }) => (
  <div className="flex gap-1 p-1 rounded-xl border border-slate-700 bg-slate-900 w-full mb-6">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 relative ${
          activeTab === tab.id
            ? "bg-slate-800 text-white"
            : "text-slate-400 hover:text-white"
        }`}
      >
        {tab.label}
        {activeTab === tab.id && (
          <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-indigo-400 rounded-full" />
        )}
      </button>
    ))}
  </div>
);

/**
 * Timeline Component
 * - Ride history
 * - Event tracking
 */
export const Timeline = ({ events }) => (
  <div className="space-y-4">
    {events.map((event, i) => (
      <div key={i} className="flex gap-4">
        <div className="relative flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              event.completed ? "bg-green-500/20" : "bg-indigo-500/20"
            }`}
          >
            {event.icon && typeof event.icon === "function"
              ? event.icon()
              : null}
          </div>
          {i < events.length - 1 && (
            <div className="w-0.5 h-12 bg-slate-700 mt-2"></div>
          )}
        </div>
        <div className="pt-1 pb-4">
          <p className="font-medium text-sm">{event.title}</p>
          <p className="text-xs text-slate-400 mt-1">{event.timestamp}</p>
        </div>
      </div>
    ))}
  </div>
);

export default {
  PremiumCard,
  RideCard,
  DriverInfoCard,
  FareEstimateCard,
  PremiumInput,
  Toast,
  SkeletonLoader,
  LoadingSpinner,
  Tabs,
  Timeline,
};
