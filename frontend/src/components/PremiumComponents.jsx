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
    className={`premium-card ${hover ? "hover-lift" : ""} ${
      accent ? "glow-border" : ""
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
          <p className="text-sm text-text-muted">{vehicle.description}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-primary">${fare}</p>
        <p className="text-xs text-text-muted">~{vehicle.eta} mins</p>
      </div>
    </div>
    {isSelected && (
      <div className="pt-4 border-t border-border flex items-center gap-2 text-primary">
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
          <h3 className="font-bold text-xl">{driver.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 text-accent">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`ri-star-${i < Math.floor(driver.rating) ? "fill" : "line"}`}
                ></i>
              ))}
            </div>
            <span className="text-sm text-text-muted">
              ({driver.trips} trips)
            </span>
          </div>
        </div>
      </div>
      <span className="text-green-400 text-sm font-medium">● Online</span>
    </div>

    <div className="grid grid-cols-2 gap-3 mb-6">
      <div className="p-3 rounded-lg bg-surface-hover">
        <p className="text-xs text-text-muted mb-1">Vehicle</p>
        <p className="font-medium text-sm">{driver.vehicle}</p>
      </div>
      <div className="p-3 rounded-lg bg-surface-hover">
        <p className="text-xs text-text-muted mb-1">Plate</p>
        <p className="font-medium text-sm">{driver.plate}</p>
      </div>
    </div>

    <div className="flex gap-3">
      <button
        onClick={onMessage}
        className="flex-1 py-2.5 rounded-lg bg-primary/20 text-primary font-medium hover:bg-primary/30 transition-colors"
      >
        <i className="ri-message-line mr-2"></i>Message
      </button>
      <button
        onClick={onCall}
        className="flex-1 py-2.5 rounded-lg bg-secondary/20 text-secondary font-medium hover:bg-secondary/30 transition-colors"
      >
        <i className="ri-phone-line mr-2"></i>Call
      </button>
    </div>
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
      <span className="text-sm text-text-muted">Cash • Card</span>
    </div>

    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <i className="ri-map-pin-2-fill text-primary"></i>
        </div>
        <div className="text-sm">
          <p className="text-text-muted">From</p>
          <p className="font-medium">{from}</p>
        </div>
      </div>
      <div className="px-0 py-2 border-l-2 border-primary/30 ml-2 h-8"></div>
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <i className="ri-map-pin-fill text-secondary"></i>
        </div>
        <div className="text-sm">
          <p className="text-text-muted">To</p>
          <p className="font-medium">{to}</p>
        </div>
      </div>
    </div>

    {breakdown && (
      <>
        <div className="divider-gradient"></div>
        <div className="space-y-2 text-sm">
          {breakdown.map((item, i) => (
            <div key={i} className="flex justify-between">
              <span className="text-text-muted">{item.label}</span>
              <span className="font-medium">${item.amount}</span>
            </div>
          ))}
        </div>
      </>
    )}

    <div className="pt-4 border-t border-border">
      <div className="flex justify-between items-center mb-4">
        <span className="text-text-muted">Total</span>
        <span className="text-3xl font-bold text-gradient-animated">
          ${fare}
        </span>
      </div>
      <button
        onClick={onConfirm}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold hover-lift transition-all"
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
      <div className="relative w-full group">
        {Icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className={`premium-input w-full ${Icon ? "pl-12" : "pl-4"} pr-4 ${
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
                ? "scale-75 -translate-y-6 text-primary"
                : "text-text-muted"
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
      bg: "bg-primary/20",
      border: "border-primary/30",
      text: "text-primary",
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
    <div className="toast-enter fixed bottom-6 right-6 z-50">
      <div
        className={`toast-base ${config.bg} border ${config.border} flex items-center gap-3 max-w-sm`}
      >
        <Icon className={`text-xl ${config.text}`} />
        <span className="flex-1 text-sm text-white">{message}</span>
        <button
          onClick={onClose}
          className="text-text-muted hover:text-text-main transition-colors"
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
      <div className="absolute inset-0 border-2 border-transparent border-t-primary border-r-secondary rounded-full animate-spin" />
      <div
        className="absolute inset-2 border-2 border-transparent border-t-accent border-r-primary rounded-full animate-spin"
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
  <div className="flex gap-1 p-1 rounded-lg glass-sm w-full mb-6">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 relative ${
          activeTab === tab.id
            ? "text-white"
            : "text-text-muted hover:text-text-main"
        }`}
      >
        {tab.label}
        {activeTab === tab.id && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
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
              event.completed ? "bg-green-500/20" : "bg-primary/20"
            }`}
          >
            {event.icon && typeof event.icon === "function"
              ? event.icon()
              : null}
          </div>
          {i < events.length - 1 && (
            <div className="w-0.5 h-12 bg-border mt-2"></div>
          )}
        </div>
        <div className="pt-1 pb-4">
          <p className="font-medium text-sm">{event.title}</p>
          <p className="text-xs text-text-muted mt-1">{event.timestamp}</p>
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
