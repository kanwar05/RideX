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

router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authUser,
  mapsController.getDistanceTime 
);

router.get('/get-autocomplete-suggestions', query('input').isString().isLength({ min: 3 }), authUser, mapsController.getAutocompleteSuggestions);

module.exports = router;
