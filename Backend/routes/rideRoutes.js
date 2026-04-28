const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const rideController = require("../controllers/rideController");
const { authUser } = require("../middlewares/authMiddleware");

router.post(
  "/create-ride",
  authUser,
  [
    body("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("PickUp location must be at least 3 characters long"),
    body("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Destination must be at least 3 characters long"),
    body("vehicleType")
      .isIn(["car", "auto", "moto"])
      .withMessage("Vehicle type must be one of car, auto, or motorcycle"),
  ],
  rideController.createRide,
);

router.get(
  "/get-fare",
  authUser,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("PickUp location must be at least 3 characters long"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Destination must be at least 3 characters long"),
  rideController.getFare,
);

module.exports = router;
