const express = require("express");
const userController = require("../controllers/userControllers");
const router = express.Router();
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("Firstname must be at least of 3 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least of 6 characters"),
  ],
  userController.registerUser,
);

module.exports = router;
