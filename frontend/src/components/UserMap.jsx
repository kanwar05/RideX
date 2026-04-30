import React, { useContext, useEffect, useMemo, useState } from "react";
import LiveMap from "./LiveMap";
import {
  geocodeAddress,
  getCurrentPosition,
  getMapboxRoute,
  toLngLat,
} from "../services/mapService";
import { SocketDataContext } from "../context/SocketContext";
import { SOCKET_EVENTS } from "../services/socket";

const UserMap = ({
  pickup,
  pickupCoordinates,
  destination,
  ride,
  className = "",
}) => {
  const { socket } = useContext(SocketDataContext);
  const [userLocation, setUserLocation] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [nearbyCaptains, setNearbyCaptains] = useState([]);
  const [trackedCaptain, setTrackedCaptain] = useState(null);
  const [route, setRoute] = useState(null);

  useEffect(() => {
    getCurrentPosition()
      .then(setUserLocation)
      .catch((error) => console.warn("Unable to get user location:", error));
  }, []);

  useEffect(() => {
    if (toLngLat(pickupCoordinates) || !pickup) return undefined;

    let cancelled = false;
    geocodeAddress(pickup)
      .then((coordinates) => {
        if (!cancelled) setPickupLocation({ address: pickup, coordinates });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [pickup, pickupCoordinates]);

  useEffect(() => {
    if (!destination) return;
    geocodeAddress(destination).then(setDestinationLocation).catch(() => {});
  }, [destination]);

  useEffect(() => {
    const origin = toLngLat(pickupCoordinates) || pickupLocation?.coordinates || userLocation;
    if (!origin || !destinationLocation) return;

    getMapboxRoute(origin, destinationLocation)
      .then(setRoute)
      .catch((error) => console.warn("Unable to draw route:", error));
  }, [pickupCoordinates, pickupLocation, userLocation, destinationLocation]);

  useEffect(() => {
    if (!socket) return undefined;

    const handleNearbyCaptains = (payload) => {
      if (Array.isArray(payload?.captains)) {
        setNearbyCaptains(payload.captains);
      } else if (payload?.captain) {
        setNearbyCaptains((captains) => {
          const next = captains.filter((captain) => captain._id !== payload.captain._id);
          return [...next, payload.captain];
        });
      }
    };

    const handleRideLocation = (payload) => {
      const position = toLngLat(payload?.location);
      if (position) setTrackedCaptain({ ...payload, position });
    };

    socket.on(SOCKET_EVENTS.NEARBY_CAPTAINS_UPDATE, handleNearbyCaptains);
    socket.on(SOCKET_EVENTS.CAPTAIN_LOCATION_UPDATE, handleNearbyCaptains);
    socket.on(SOCKET_EVENTS.RIDE_LOCATION_UPDATE, handleRideLocation);

    return () => {
      socket.off(SOCKET_EVENTS.NEARBY_CAPTAINS_UPDATE, handleNearbyCaptains);
      socket.off(SOCKET_EVENTS.CAPTAIN_LOCATION_UPDATE, handleNearbyCaptains);
      socket.off(SOCKET_EVENTS.RIDE_LOCATION_UPDATE, handleRideLocation);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket || !ride?._id) return undefined;

    socket.emit(SOCKET_EVENTS.TRACK_RIDE, { rideId: ride._id });

    return () => {
      socket.emit(SOCKET_EVENTS.STOP_TRACKING_RIDE, { rideId: ride._id });
    };
  }, [socket, ride?._id]);

  const markers = useMemo(() => {
    const captainMarkers = nearbyCaptains
      .map((captain) => ({
        id: captain._id,
        type: "captain",
        label: "Captain",
        position: captain.location,
      }))
      .filter((marker) => toLngLat(marker.position));

    return [
      userLocation && {
        id: "user-location",
        type: "user",
        label: "You",
        position: userLocation,
      },
      (toLngLat(pickupCoordinates) || pickupLocation?.coordinates) && {
        id: "pickup",
        type: "pickup",
        label: "Pickup",
        position: toLngLat(pickupCoordinates) || pickupLocation.coordinates,
      },
      destinationLocation && {
        id: "destination",
        type: "destination",
        label: "Drop",
        position: destinationLocation,
      },
      trackedCaptain && {
        id: "tracked-captain",
        type: "captain",
        label: "Your captain",
        position: trackedCaptain.position,
      },
      !trackedCaptain && ride?.captain && {
        id: "accepted-captain",
        type: "captain",
        label: "Your captain",
        position: ride.captain.location,
      },
      ...captainMarkers,
    ].filter(Boolean);
  }, [
    nearbyCaptains,
    userLocation,
    pickupCoordinates,
    pickupLocation,
    destinationLocation,
    trackedCaptain,
    ride,
  ]);

  return (
    <LiveMap
      className={className}
      center={userLocation}
      markers={markers}
      routeCoordinates={route?.coordinates}
      routeInfo={route}
      theme="light"
    />
  );
};

export default UserMap;
