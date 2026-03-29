const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captainController");

router.post(
  "/register",
  [
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("Firstname must be of at least 3 characters"),
    body("email").isEmail().withMessage("Please use a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be of at least 6 characters"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Vehicle color must be of at least 3 characters"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Vehicle plate must be of at least 3 characters"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Vehicle capacity must be a at least 1"),
    body("vehicle.vehicleType")
      .isLength({ min: 3 })
      .withMessage("Vehicle type must be of at least 3 characters"),
  ],
  captainController.registerCaptain
);

module.exports = router;
