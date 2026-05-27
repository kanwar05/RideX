import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CapatinContext";
import { DriverInfoCard } from "./PremiumComponents";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  const driver = {
    avatar:
      captain?.avatar ||
      "https://imgs.search.brave.com/vdRYk5Fef873iKhep6GE8FrjCAJQafa8F189pqmsNjo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGeHM0/Y0pNekkvMi8wLzE2/MDB3L2NhbnZhLXB1/cnBsZS1ibGFjay1h/bmQtd2hpdGUtY29v/bC1jcmVhdGl2ZS1s/aW5nZWRpbi1wcm9m/aWxlLXBpY3R1cmUt/U283clZpQ1daYnMu/anBn",
    name: `${captain?.fullName?.firstName || ""} ${captain?.fullName?.lastName || ""}`.trim(),
    rating: captain?.rating || 4.9,
    trips: captain?.trips || 0,
    vehicle: captain?.vehicle?.vehicleType || "Vehicle",
    plate: captain?.vehicle?.plate || "",
  };

  return (
    <div>
      <DriverInfoCard driver={driver} onMessage={() => {}} onCall={() => {}} />
    </div>
  );
};

export default CaptainDetails;
