const rideModel = require("../models/rideModel.js");
const mapsService = require("./mapsService.js");

async function getFare(pickUp, destination) {
  if (!pickUp || !destination) {
    throw new Error("PickUp and destination are required.");
  }

  // ✅ Step 1: Convert to coordinates
  const pickupCoord = await mapsService.getCoordinatesFromAddress(pickUp);
  const destCoord = await mapsService.getCoordinatesFromAddress(destination);

  const origin = `${pickupCoord.longitude},${pickupCoord.latitude}`;
  const destinationCoordStr = `${destCoord.longitude},${destCoord.latitude}`;

  // ✅ Step 2: Call directions API
  const distanceTime = await mapsService.getDistanceTime(
    origin,
    destinationCoordStr,
  );

  console.log("DistanceTime:", distanceTime);

  // Fare logic (same as yours)
  const baserates = {
    car: 10,
    auto: 8,
    moto: 6,
  };

  const ratePerKm = {
    auto: 5,
    car: 10,
    moto: 3,
  };

  const ratePerMinute = {
    auto: 2,
    car: 3,
    moto: 1,
  };

  const fares = {
    car:
      baserates.car +
      distanceTime.distance * ratePerKm.car +
      ratePerMinute.car * distanceTime.duration,

    auto:
      baserates.auto +
      distanceTime.distance * ratePerKm.auto +
      ratePerMinute.auto * distanceTime.duration,

    moto:
      baserates.moto +
      distanceTime.distance * ratePerKm.moto +
      ratePerMinute.moto * distanceTime.duration,
  };

  return fares;
}

module.exports.createRide = async ({
  user,
  pickUp,
  destination,
  vehicleType,
}) => {
  if (!user || !pickUp || !destination || !vehicleType) {
    throw new Error("All fields are required to create a ride.");
  }

  const fare = await getFare(pickUp, destination);

  const ride = new rideModel({
    user,
    pickUp,
    destination,
    fare: fare[vehicleType],
  });

  return ride;
};
