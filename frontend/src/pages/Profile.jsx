import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PremiumNavbar from "../components/PremiumNavbar";
import { UserDataContext } from "../context/UserContext";

const Profile = () => {
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  const fullName =
    [user?.fullName?.firstName, user?.fullName?.lastName]
      .filter(Boolean)
      .join(" ") || "Rider";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#0f172a,#020617)] text-white">
      <PremiumNavbar />
      <div className="max-w-3xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight">
            User Profile
          </h1>
          <p className="mt-2 text-white/70">
            Your personal details are shown below. Use the button to sign out
            when ready.
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
              <p className="mt-2 text-lg">{user?.email || "Not available"}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Account Type
              </p>
              <p className="mt-2 text-lg">Rider</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-900/60 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Ride History
              </p>
              <p className="mt-3 text-sm text-white/70">
                Your ride details will appear here after booking.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-900/60 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                Security
              </p>
              <p className="mt-3 text-sm text-white/70">
                Use the logout button to sign out securely.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/user-logout")}
              className="w-full rounded-3xl bg-red-700 px-6 py-3 text-white font-semibold transition hover:bg-red-600"
            >
              Logout
            </button>
            <button
              type="button"
              onClick={() => navigate("/home")}
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

export default Profile;
