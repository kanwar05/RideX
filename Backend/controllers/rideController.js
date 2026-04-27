const rideService = require("../services/rideService");
const { validationResult } = require("express-validator");

module.exports.createRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, pickUp, destination, vehicleType } = req.body;
  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickUp,
      destination,
      vehicleType,
    });
    return res.status(201).json(ride);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getFare = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickUp, destination } = req.query;
  try {
    const fare = await rideService.getFare({
      pickUp,
      destination,
    });
    return res.status(201).json(fare);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
