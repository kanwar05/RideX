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
