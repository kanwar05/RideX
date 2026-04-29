import React, { useContext, useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import LiveMap from "./LiveMap";
import {
  geocodeAddress,
  getMapboxRoute,
  toLngLat,
  watchCurrentPosition,
} from "../services/mapService";
import { SocketDataContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CapatinContext";
import { SOCKET_EVENTS } from "../services/socket";

const CaptainMap = ({ ride, destinationMode = false, className = "" }) => {
  const { socket, sendMessage } = useContext(SocketDataContext);
  const { captain } = useContext(CaptainDataContext);
  const [captainLocation, setCaptainLocation] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [route, setRoute] = useState(null);
  const lastEmitRef = useRef(0);

  useEffect(() => {
    const watchId = watchCurrentPosition(
      (position) => {
        setCaptainLocation(position);

        const now = Date.now();
        if (now - lastEmitRef.current < 3000) return;
        lastEmitRef.current = now;

        const payload = {
          userId: captain?._id,
          captainId: captain?._id,
          rideId: ride?._id,
          location: { lng: position[0], lat: position[1] },
        };

        sendMessage(SOCKET_EVENTS.UPDATE_LOCATION_CAPTAIN, payload);
        sendMessage(SOCKET_EVENTS.CAPTAIN_LOCATION_UPDATE, payload);

        if (ride?._id) {
          sendMessage(SOCKET_EVENTS.RIDE_LOCATION_UPDATE, payload);
        }
      },
      (error) => console.warn("Unable to watch captain location:", error),
    );

    return () => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    };
  }, [captain?._id, ride?._id, sendMessage]);

  useEffect(() => {
    if (!ride?.pickup) return;
    geocodeAddress(ride.pickup).then(setPickupLocation).catch(() => {});
  }, [ride?.pickup]);

  useEffect(() => {
    if (!ride?.destination) return;
    geocodeAddress(ride.destination).then(setDestinationLocation).catch(() => {});
  }, [ride?.destination]);

  useEffect(() => {
    const target = destinationMode ? destinationLocation : pickupLocation;
    if (!captainLocation || !target) return;

    getMapboxRoute(captainLocation, target)
      .then(setRoute)
      .catch((error) => console.warn("Unable to draw captain route:", error));
  }, [captainLocation, pickupLocation, destinationLocation, destinationMode]);

  useEffect(() => {
    if (!socket || !ride?._id) return undefined;
    socket.emit(SOCKET_EVENTS.TRACK_RIDE, { rideId: ride._id });

    return () => {
      socket.emit(SOCKET_EVENTS.STOP_TRACKING_RIDE, { rideId: ride._id });
    };
  }, [socket, ride?._id]);

  const markers = useMemo(
    () =>
      [
        captainLocation && {
          id: "captain-location",
          type: "captain",
          label: "You",
          position: captainLocation,
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
      ].filter((marker) => marker && toLngLat(marker.position)),
    [captainLocation, pickupLocation, destinationLocation],
  );

  return (
    <LiveMap
      className={className}
      center={captainLocation}
      markers={markers}
      routeCoordinates={route?.coordinates}
      routeInfo={route}
      theme={destinationMode ? "night" : "navigation"}
    />
  );
};

export default CaptainMap;
