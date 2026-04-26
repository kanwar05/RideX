const mapsService = require("../services/mapsService");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;
  if (!address) {
    return res
      .status(400)
      .json({ message: "Address query parameter is required" });
  }

  try {
    const coordinates = await mapsService.getCoordinatesFromAddress(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: "Coordinates not found" });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { origin, destination } = req.query;
  if (!origin || !destination) {
    return res.status(400).json({
      message: "Origin and destination query parameters are required",
    });
  }

  try {
    // Convert origin and destination addresses to coordinates if needed
    let originCoord = origin;
    let destinationCoord = destination;

    // If not in coordinate format, convert using getCoordinatesFromAddress
    const isCoord = (str) => /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(str.trim());
    if (!isCoord(origin)) {
      const coord = await mapsService.getCoordinatesFromAddress(origin);
      originCoord = `${coord.lang},${coord.ltd}`;
    }
    if (!isCoord(destination)) {
      const coord = await mapsService.getCoordinatesFromAddress(destination);
      destinationCoord = `${coord.lang},${coord.ltd}`;
    }

    const distanceTime = await mapsService.getDistanceTime(
      originCoord,
      destinationCoord,
    );
    res.status(200).json(distanceTime);
  } catch (error) {
    res.status(404).json({ message: "Distance and time not found" });
  }
};

module.exports.getAutocompleteSuggestions = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { input } = req.query;
  if (!input) {
    return res.status(400).json({ message: "Input query parameter is required" });
  }

  try {
    const suggestions = await mapsService.getAutocompleteSuggestions(input);
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(404).json({ message: "Autocomplete suggestions not found" });
  }
};
