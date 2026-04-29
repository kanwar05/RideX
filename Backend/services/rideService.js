const rideModel = require("../models/rideModel.js");
const mapsService = require("./mapsService.js");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("PickUp and destination are required.");
  }

  // ✅ Step 1: Convert to coordinates
  const pickupCoord = await mapsService.getCoordinatesFromAddress(pickup);
  const destCoord = await mapsService.getCoordinatesFromAddress(destination);

  const origin = `${pickupCoord.longitude},${pickupCoord.latitude}`;
  const destinationCoordStr = `${destCoord.longitude},${destCoord.latitude}`;

  // ✅ Step 2: Call directions API
  const distanceTime = await mapsService.getDistanceTime(
    origin,
    destinationCoordStr,
  );

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
    car: Math.round(
      baserates.car +
        distanceTime.distance * ratePerKm.car +
        ratePerMinute.car * distanceTime.duration,
    ),

    auto: Math.round(
      baserates.auto +
        distanceTime.distance * ratePerKm.auto +
        ratePerMinute.auto * distanceTime.duration,
    ),

    moto: Math.round(
      baserates.moto +
        distanceTime.distance * ratePerKm.moto +
        ratePerMinute.moto * distanceTime.duration,
    ),
  };

  return fares;
}

module.exports.getFare = getFare;

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required to create a ride.");
  }

  const fare = await getFare(pickup, destination);

  const ride = new rideModel({
    user,
    pickup,
    destination,
    otp: getOtp(4),
    fare: fare[vehicleType],
  });
  await ride.save();
  return ride;
};

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("rideId not exist");
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    {
      status: "accepted",
      captain: captain._id,
    },
  );

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("ride not found");
  }
  return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error("rideId and otp does not exist");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("otp not valid");
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    {
      status: "ongoing",
    },
  );

  return ride;
};

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("rideId does not exist");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain: captain._id,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("ride not ongoing");
  }

  const completedRide = await rideModel
    .findOneAndUpdate(
      { _id: rideId },
      { status: "completed" },
      { new: true },
    )
    .populate("user")
    .populate("captain");

  return completedRide;
};
