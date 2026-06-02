const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captainController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/register",
  [
    body("fullName.firstName")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Firstname must be of at least 3 characters"),
    body("fullName.lastName")
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ min: 3 })
      .withMessage("Lastname must be of at least 3 characters"),
    body("email").isEmail().withMessage("Please use a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be of at least 6 characters"),
    body("vehicle.color")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Vehicle color must be of at least 3 characters"),
    body("vehicle.plate")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Vehicle plate must be of at least 3 characters"),
    body("vehicle.capacity")
      .toInt()
      .isInt({ min: 1 })
      .withMessage("Vehicle capacity must be a at least 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Vehicle type must be one of car, motorcycle, or auto"),
  ],
  captainController.registerCaptain,
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please use a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be of at least 6 characters"),
  ],
  captainController.loginCaptain,
);

router.get(
  "/profile",
  authMiddleware.authCaptain,
  captainController.getCaptainProfile,
);

router.get(
  "/logout",
  authMiddleware.authCaptain,
  captainController.logoutCaptain,
);

module.exports = router;
