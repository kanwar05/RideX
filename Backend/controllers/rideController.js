const rideService = require("../services/rideService");
const { validationResult } = require("express-validator");
const mapService = require("../services/mapsService");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/rideModel");

module.exports.createRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, pickup, destination, vehicleType } = req.body;
  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    console.log(ride);

    res.status(201).json(ride);

    // Get pickup coordinates
    const pickupCoordinates =
      await mapService.getCoordinatesFromAddress(pickup);
    console.log("Pickup coordinates:", pickupCoordinates);

    const longitude = Number(pickupCoordinates.longitude);
    const latitude = Number(pickupCoordinates.latitude);

    if (isNaN(longitude) || isNaN(latitude)) {
      console.error("Invalid coordinates:", { longitude, latitude });
      return res.status(400).json({ message: "Coordinates invalid" });
    }

    // Find nearby captains (5km radius)
    const searchRadiusMeters = 10 * 1000; // 5km in meters
    const captainsInRadius = await mapService.getCaptainsInTheRadius(
      latitude,
      longitude,
      searchRadiusMeters,
    );
    console.log("captain details", captainsInRadius);

    console.log(
      `Found ${captainsInRadius.length} captains within 5km of [${longitude}, ${latitude}]`,
    );

    ride.otp = "";

    const ridewithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    // Emit ride request to nearby captains via socket
    if (captainsInRadius.length > 0) {
      captainsInRadius.forEach((captain) => {
        console.log(
          `📤 Sending ride request to captain ${captain._id} (socket: ${captain.socketId})`,
        );
        sendMessageToSocketId(captain.socketId, "new-ride", {
          ride: ridewithUser,
          pickup: pickup,
          destination: destination,
          vehicleType: vehicleType,
          pickupCoordinates: { longitude, latitude },
        });
      });
    } else {
      console.log("❌ No captains found nearby to send ride request");
    }
  } catch (error) {
    console.error("CREATE RIDE ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getFare = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;
  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(201).json(fare);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.confirm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;
  try {
    const ride = await rideService.confirmRide({ rideId, captain: req.user });

    sendMessageToSocketId(ride.user.socketId, "ride-confirmed", ride);

    return res.status(201).json(ride);
  } catch (error) {
    console.error("Confirm ride error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;
  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      captain: req.user,
    });

    sendMessageToSocketId(ride.user.socketId, "ride-started", ride);

    return res.status(200).json(ride);
  } catch (error) {
    console.error("Confirm ride error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;
  try {
    const ride = await rideService.endRide({
      rideId,
      captain: req.user,
    });

    sendMessageToSocketId(ride.user.socketId, "ride-ended", ride);

    return res.status(200).json(ride);
  } catch (error) {
    console.error("End ride error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
