import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PremiumNavbar from "../components/PremiumNavbar";
import { CaptainDataContext } from "../context/CapatinContext";

const CaptainProfile = () => {
  const { captain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const fullName =
    [captain?.fullName?.firstName, captain?.fullName?.lastName]
      .filter(Boolean)
      .join(" ") || "Captain";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#0f172a,#020617)] text-white">
      <PremiumNavbar userType="captain" />
      <div className="max-w-3xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight">
            Captain Profile
          </h1>
          <p className="mt-2 text-white/70">
            Personal and vehicle information for your captain account.
          </p>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20">
          <div className="mb-8 flex flex-col gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Name
              </p>
              <p className="mt-2 text-2xl font-semibold">{fullName}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Email
              </p>
              <p className="mt-2 text-lg">
                {captain?.email || "Not available"}
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Vehicle
              </p>
              <p className="mt-2 text-lg">
                {captain?.vehicleType
                  ? `${captain.vehicleType} • ${captain.color || "Unknown color"}`
                  : "Vehicle not registered"}
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Plate
              </p>
              <p className="mt-2 text-lg">
                {captain?.plate || "Not available"}
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Capacity
              </p>
              <p className="mt-2 text-lg">
                {captain?.capacity || "Not available"}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-900/60 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Verified
              </p>
              <p className="mt-3 text-sm text-white/70">
                Your account is protected and ready to accept rides.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-900/60 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Status
              </p>
              <p className="mt-3 text-sm text-white/70">
                Keep your profile updated for better ride matching.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/captain-logout")}
              className="w-full rounded-3xl bg-red-700 px-6 py-3 text-white font-semibold transition hover:bg-red-600"
            >
              Logout
            </button>
            <button
              type="button"
              onClick={() => navigate("/captain-home")}
              className="w-full rounded-3xl border border-white/10 bg-white/5 px-6 py-3 text-white transition hover:bg-white/10"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainProfile;
