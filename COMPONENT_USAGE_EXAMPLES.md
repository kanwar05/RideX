# RideX Premium Components - Usage Examples

## Real-World Implementation Examples

This guide shows how to use the premium components in actual pages and features.

---

## 1. Enhanced Home Page (Booking Page)

```jsx
import React, { useState } from "react";
import PremiumNavbar from "@/components/PremiumNavbar";
import {
  PremiumCard,
  PremiumInput,
  Toast,
} from "@/components/PremiumComponents";
import EnhancedBookingFlow from "@/components/EnhancedBookingFlow";
import { FaMapMarkerAlt } from "react-icons/fa";

function Home() {
  const [bookingComplete, setBookingComplete] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleBookingComplete = () => {
    setBookingComplete(true);
    setToastMessage("Your ride has been booked!");
    setShowToast(true);
  };

  return (
    <div className="min-h-screen">
      <PremiumNavbar userType="user" />

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-gradient-animated">
            Book Your Ride
          </h1>
          <p className="text-text-muted mb-8">
            Premium ridesharing at your fingertips
          </p>

          <EnhancedBookingFlow onComplete={handleBookingComplete} />
        </div>
      </main>

      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default Home;
```

---

## 2. Premium Login Page

```jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PremiumNavbar from "@/components/PremiumNavbar";
import {
  PremiumCard,
  PremiumInput,
  Toast,
} from "@/components/PremiumComponents";
import { FaEnvelope, FaLock } from "react-icons/fa";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setShowToast(true);
      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-950 to-dark-950">
      <PremiumNavbar />

      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Ride<span className="text-gradient-animated">X</span>
            </h1>
            <p className="text-text-muted">Premium ridesharing experience</p>
          </div>

          {/* Login Form */}
          <PremiumCard className="space-y-6">
            <h2 className="text-2xl font-bold text-center">Welcome Back</h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <PremiumInput
                  type="email"
                  placeholder="your@email.com"
                  icon={FaEnvelope}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <PremiumInput
                  type="password"
                  placeholder="••••••••"
                  icon={FaLock}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-premium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="divider-subtle"></div>

            <p className="text-center text-text-muted">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/user-signup")}
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </button>
            </p>
          </PremiumCard>

          {/* Footer */}
          <p className="text-center text-text-muted text-xs mt-6">
            By continuing, you agree to our Terms of Service
          </p>
        </div>
      </div>

      {showToast && (
        <Toast
          message="Login successful!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default UserLogin;
```

---

## 3. Driver Profile Page

```jsx
import React from "react";
import PremiumNavbar from "@/components/PremiumNavbar";
import {
  PremiumCard,
  DriverInfoCard,
  Timeline,
} from "@/components/PremiumComponents";
import { FaStar, FaTrophy, FaClock } from "react-icons/fa";

function DriverProfile() {
  const driver = {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=driver1",
    rating: 4.98,
    trips: 2840,
    vehicle: "Tesla Model 3",
    plate: "TX-M3-4829",
  };

  const stats = [
    { icon: FaStar, label: "Rating", value: "4.98", color: "text-yellow-400" },
    { icon: FaTrophy, label: "Rides", value: "2,840", color: "text-amber-400" },
    {
      icon: FaClock,
      label: "Avg. Response",
      value: "45s",
      color: "text-blue-400",
    },
  ];

  const recentRides = [
    { title: "Ride Completed", timestamp: "2 hours ago", completed: true },
    { title: "Rating Given", timestamp: "5 hours ago", completed: true },
    { title: "Ride Cancelled", timestamp: "Yesterday", completed: false },
  ];

  return (
    <div className="min-h-screen">
      <PremiumNavbar userType="driver" />

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Driver Profile</h1>
            <p className="text-text-muted">Manage your driver account</p>
          </div>

          {/* Driver Info */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <DriverInfoCard
                driver={driver}
                onMessage={() => console.log("Message")}
                onCall={() => console.log("Call")}
              />
            </div>

            {/* Stats */}
            <div className="space-y-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <PremiumCard key={stat.label} className="text-center">
                    <Icon className={`text-2xl mx-auto mb-2 ${stat.color}`} />
                    <p className="text-xs text-text-muted mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </PremiumCard>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <PremiumCard className="space-y-4">
            <h2 className="text-xl font-bold">Recent Activity</h2>
            <div className="divider-gradient"></div>
            <Timeline events={recentRides} />
          </PremiumCard>
        </div>
      </main>
    </div>
  );
}

export default DriverProfile;
```

---

## 4. Ride History Page with Tabs

```jsx
import React, { useState } from "react";
import PremiumNavbar from "@/components/PremiumNavbar";
import {
  PremiumCard,
  Tabs,
  SkeletonLoader,
} from "@/components/PremiumComponents";
import { FaClock, FaMapMarkerAlt, FaStar } from "react-icons/fa";

function RideHistory() {
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const rides = [
    {
      id: 1,
      type: "completed",
      from: "Downtown Center",
      to: "Airport Terminal",
      date: "2 hours ago",
      fare: 24.5,
      rating: 5,
      driver: "Sarah Johnson",
    },
    {
      id: 2,
      type: "cancelled",
      from: "456 Oak Street",
      to: "789 Park Avenue",
      date: "Yesterday",
      fare: 0,
      rating: null,
      driver: "Mike Davis",
    },
    {
      id: 3,
      type: "completed",
      from: "Main Street Station",
      to: "City Center Hotel",
      date: "2 days ago",
      fare: 18.5,
      rating: 5,
      driver: "Jennifer Smith",
    },
  ];

  const filteredRides =
    activeTab === "all" ? rides : rides.filter((r) => r.type === activeTab);

  const RideItem = ({ ride }) => (
    <PremiumCard className="hover-lift mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              <span className="font-medium">{ride.from}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-secondary" />
              <span className="font-medium">{ride.to}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">${ride.fare}</p>
          <p className="text-sm text-text-muted">{ride.date}</p>
        </div>
      </div>

      <div className="divider-subtle"></div>

      <div className="flex items-center justify-between pt-4">
        <span className="text-sm text-text-muted">
          Driver:{" "}
          <span className="font-medium text-text-main">{ride.driver}</span>
        </span>
        {ride.rating && (
          <div className="flex items-center gap-1">
            {[...Array(ride.rating)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-sm" />
            ))}
          </div>
        )}
      </div>
    </PremiumCard>
  );

  return (
    <div className="min-h-screen">
      <PremiumNavbar userType="user" />

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Ride History</h1>
            <p className="text-text-muted">View and manage your past rides</p>
          </div>

          {/* Tabs */}
          <Tabs
            tabs={[
              { id: "all", label: "All Rides" },
              { id: "completed", label: "Completed" },
              { id: "cancelled", label: "Cancelled" },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {/* Loading State */}
          {isLoading && <SkeletonLoader count={3} className="h-32" />}

          {/* Rides List */}
          {!isLoading && (
            <div>
              {filteredRides.length > 0 ? (
                filteredRides.map((ride) => (
                  <RideItem key={ride.id} ride={ride} />
                ))
              ) : (
                <PremiumCard className="text-center py-12">
                  <p className="text-text-muted">No rides found</p>
                </PremiumCard>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default RideHistory;
```

---

## 5. Real-Time Ride Tracking

```jsx
import React, { useEffect, useState } from "react";
import {
  PremiumCard,
  DriverInfoCard,
  Timeline,
} from "@/components/PremiumComponents";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";

function RideTracking() {
  const [estimatedTime, setEstimatedTime] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      setEstimatedTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const driver = {
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=driver1",
    rating: 4.98,
    trips: 2840,
    vehicle: "Tesla Model 3",
    plate: "TX-M3-4829",
  };

  const events = [
    {
      title: "Driver Arriving",
      timestamp: "In 2 minutes",
      completed: true,
      icon: () => <i className="ri-car-line text-green-400"></i>,
    },
    {
      title: "Pickup Started",
      timestamp: "In 4 minutes",
      completed: false,
      icon: () => <i className="ri-map-pin-2-fill text-blue-400"></i>,
    },
    {
      title: "On the Way",
      timestamp: "In 10 minutes",
      completed: false,
      icon: () => <i className="ri-route-line text-purple-400"></i>,
    },
    {
      title: "Destination Reached",
      timestamp: "In 12 minutes",
      completed: false,
      icon: () => <i className="ri-map-pin-fill text-amber-400"></i>,
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Driver Info */}
      <DriverInfoCard
        driver={driver}
        onMessage={() => console.log("Message driver")}
        onCall={() => console.log("Call driver")}
      />

      {/* ETA Card */}
      <PremiumCard className="text-center py-8 pulse-glow">
        <div className="flex items-center justify-center gap-3 mb-2">
          <FaClock className="text-lg text-primary" />
          <span className="text-text-muted">Estimated Arrival</span>
        </div>
        <div className="text-5xl font-bold text-gradient-animated mb-2">
          {estimatedTime}
        </div>
        <p className="text-sm text-text-muted">minutes</p>
      </PremiumCard>

      {/* Route Summary */}
      <PremiumCard>
        <h3 className="font-bold text-lg mb-4">Your Trip</h3>
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <FaMapMarkerAlt className="text-primary text-sm" />
            </div>
            <div className="w-0.5 h-20 bg-primary/20"></div>
            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
              <FaMapMarkerAlt className="text-secondary text-sm" />
            </div>
          </div>
          <div className="flex-1 pt-1">
            <div>
              <p className="text-xs text-text-muted mb-1">From</p>
              <p className="font-medium">Downtown Center</p>
            </div>
            <div className="mt-16">
              <p className="text-xs text-text-muted mb-1">To</p>
              <p className="font-medium">Airport Terminal</p>
            </div>
          </div>
        </div>
      </PremiumCard>

      {/* Timeline */}
      <PremiumCard className="space-y-4">
        <h3 className="font-bold text-lg">Trip Progress</h3>
        <div className="divider-gradient"></div>
        <Timeline events={events} />
      </PremiumCard>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button className="py-3 rounded-lg glass-lg hover-lift font-medium transition-all">
          Share Trip
        </button>
        <button className="py-3 rounded-lg bg-red-500/20 text-red-400 hover-lift font-medium transition-all">
          Emergency
        </button>
      </div>
    </div>
  );
}

export default RideTracking;
```

---

## 6. Settings Page with Cards

```jsx
import React, { useState } from "react";
import { PremiumCard } from "@/components/PremiumComponents";
import { FaBell, FaLock, FaCreditCard, FaHelpCircle } from "react-icons/fa";

function Settings() {
  const settingsSections = [
    {
      title: "Notifications",
      icon: FaBell,
      items: [
        { label: "Ride Updates", enabled: true },
        { label: "Promotions", enabled: false },
        { label: "News", enabled: true },
      ],
    },
    {
      title: "Privacy & Security",
      icon: FaLock,
      items: [
        { label: "Two-Factor Auth", enabled: true },
        { label: "Location History", enabled: true },
        { label: "Data Sharing", enabled: false },
      ],
    },
    {
      title: "Payment Methods",
      icon: FaCreditCard,
      items: [
        { label: "Add Card", action: "button" },
        { label: "Apple Pay", action: "button" },
        { label: "Google Pay", action: "button" },
      ],
    },
    {
      title: "Help & Support",
      icon: FaHelpCircle,
      items: [
        { label: "Contact Support", action: "link" },
        { label: "FAQ", action: "link" },
        { label: "Report Issue", action: "link" },
      ],
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {settingsSections.map((section) => {
        const Icon = section.icon;
        return (
          <PremiumCard key={section.title} className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Icon className="text-lg text-primary" />
              <h3 className="text-xl font-bold">{section.title}</h3>
            </div>

            <div className="divider-subtle"></div>

            <div className="space-y-3">
              {section.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-hover transition-colors"
                >
                  <span className="font-medium">{item.label}</span>
                  {item.enabled !== undefined && (
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={() => {}}
                      className="w-5 h-5 rounded cursor-pointer"
                    />
                  )}
                  {item.action && (
                    <button className="text-primary hover:text-primary-hover font-medium text-sm">
                      {item.action === "button" ? "Add" : "→"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </PremiumCard>
        );
      })}
    </div>
  );
}

export default Settings;
```

---

## 7. Error State & Empty State Pages

```jsx
import React from "react";
import { PremiumCard } from "@/components/PremiumComponents";
import { FaExclamationTriangle, FaInbox } from "react-icons/fa";

function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md text-center">
        <div className="mb-6">
          <FaExclamationTriangle className="text-6xl text-red-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
          <p className="text-text-muted">
            We encountered an unexpected error. Please try again.
          </p>
        </div>

        <PremiumCard className="py-8 space-y-4">
          <button className="w-full btn-premium">Try Again</button>
          <button className="w-full py-3 rounded-lg glass-lg hover-lift font-medium transition-all">
            Go Home
          </button>
        </PremiumCard>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <FaInbox className="text-5xl text-text-muted mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-2">No rides yet</h2>
      <p className="text-text-muted mb-6">Your ride history will appear here</p>
      <button className="btn-premium">Book Your First Ride</button>
    </div>
  );
}

export { ErrorPage, EmptyState };
```

---

## Best Practices Summary

✅ **DO:**

- Use `.premium-card` for all card surfaces
- Use `.hover-lift` for interactive elements
- Use `.glass-*` for layered surfaces
- Use `btn-premium` for primary CTAs
- Add proper ARIA labels for accessibility
- Test on mobile devices
- Verify color contrast
- Use skeleton loaders for async content

❌ **DON'T:**

- Animate width/height (use transform instead)
- Remove focus indicators
- Use multiple shadow layers (pick one)
- Animate on pages with reduced-motion preference
- Skip loading states
- Use text smaller than 16px on mobile
- Forget safe-area padding on notched devices

---

**Remember:** All these components are fully accessible, responsive, and performance-optimized for a premium user experience! 🚀
