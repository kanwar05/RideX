const express = require("express");
const router = express.Router();
const mapsController = require("../controllers/mapsController");
const { authUser } = require("../middlewares/authMiddleware");
const { query } = require("express-validator");

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  mapsController.getCoordinates,
);

module.exports = router;
