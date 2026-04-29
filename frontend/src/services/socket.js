export const SOCKET_EVENTS = {
  JOIN: "join",
  CAPTAIN_LOCATION_UPDATE: "captain-location-update",
  UPDATE_LOCATION_CAPTAIN: "update-location-captain",
  NEARBY_CAPTAINS_UPDATE: "nearby-captains-update",
  RIDE_ACCEPTED: "ride-accepted",
  RIDE_CONFIRMED: "ride-confirmed",
  RIDE_STARTED: "ride-started",
  RIDE_COMPLETED: "ride-completed",
  RIDE_ENDED: "ride-ended",
  RIDE_LOCATION_UPDATE: "ride-location-update",
  TRACK_RIDE: "track-ride",
  STOP_TRACKING_RIDE: "stop-tracking-ride",
};

export function emitIfConnected(socket, eventName, payload) {
  if (!socket?.connected) return false;
  socket.emit(eventName, payload);
  return true;
}

export function listen(socket, eventName, handler) {
  if (!socket) return () => {};
  socket.on(eventName, handler);
  return () => socket.off(eventName, handler);
}
