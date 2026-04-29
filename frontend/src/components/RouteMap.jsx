import React, { useEffect, useMemo, useState } from "react";
import LiveMap from "./LiveMap";
import { geocodeAddress, getMapboxRoute, toLngLat } from "../services/mapService";

const RouteMap = ({ ride, currentLocation, className = "", theme = "light" }) => {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [route, setRoute] = useState(null);

  useEffect(() => {
    if (!ride?.pickup) return;
    geocodeAddress(ride.pickup).then(setPickupLocation).catch(() => {});
  }, [ride?.pickup]);

  useEffect(() => {
    if (!ride?.destination) return;
    geocodeAddress(ride.destination).then(setDestinationLocation).catch(() => {});
  }, [ride?.destination]);

  useEffect(() => {
    const origin = toLngLat(currentLocation) || pickupLocation;
    if (!origin || !destinationLocation) return;

    getMapboxRoute(origin, destinationLocation)
      .then(setRoute)
      .catch((error) => console.warn("Unable to draw route map:", error));
  }, [currentLocation, pickupLocation, destinationLocation]);

  const markers = useMemo(
    () =>
      [
        currentLocation && {
          id: "current",
          type: "user",
          label: "Live",
          position: currentLocation,
        },
        pickupLocation && {
          id: "pickup",
          type: "pickup",
          label: "Pickup",
          position: pickupLocation,
        },
        destinationLocation && {
          id: "destination",
          type: "destination",
          label: "Drop",
          position: destinationLocation,
        },
      ].filter(Boolean),
    [currentLocation, pickupLocation, destinationLocation],
  );

  return (
    <LiveMap
      className={className}
      center={currentLocation || pickupLocation}
      markers={markers}
      routeCoordinates={route?.coordinates}
      routeInfo={route}
      theme={theme}
    />
  );
};

export default RouteMap;
