const axios = require("axios");
const captainModel = require("../models/captainModel");
// Function to get coordinates (latitude and longitude) from an address using Mapbox API
// Returns an object: { latitude, longitude }
// Usage: await getCoordinatesFromAddress('address string')
const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;

async function getCoordinatesFromAddress(address) {
  if (!MAPBOX_API_KEY) {
    throw new Error("Mapbox API key is not set in environment variables.");
  }
  const encodedAddress = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${MAPBOX_API_KEY}`;
  try {
    const response = await axios.get(url);
    const features = response.data.features;
    if (features && features.length > 0) {
      const [longitude, latitude] = features[0].center;
      return { longitude, latitude };
    } else {
      throw new Error("No coordinates found for the given address.");
    }
  } catch (error) {
    throw new Error("Error fetching coordinates: " + error.message);
  }
}

async function getDistanceTime(origin, destination) {
  // Expects origin and destination as "longitude,latitude" strings
  if (!origin || !destination) {
    throw new Error("Origin and destination are required.");
  }

  const apiKey = process.env.MAPBOX_API_KEY;
  if (!apiKey) {
    throw new Error("Mapbox API key is not set in environment variables.");
  }

  // Mapbox expects coordinates as "longitude,latitude"
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin};${destination}?geometries=geojson&overview=simplified&access_token=${apiKey}`;
  try {
    const response = await axios.get(url);
    const routes = response.data.routes;
    if (routes && routes.length > 0) {
      const route = routes[0];
      return {
        distance: route.distance / 1000, // in kilometers
        duration: route.duration / 60, // in minutes
      };
    } else {
      throw new Error(
        "No route found between the given origin and destination.",
      );
    }
  } catch (error) {
    throw new Error("Error fetching distance and time: " + error.message);
  }
}

async function getAutocompleteSuggestions(input) {
  if (!input) {
    throw new Error("Input is required for autocomplete suggestions.");
  }

  const apiKey = process.env.MAPBOX_API_KEY;
  if (!apiKey) {
    throw new Error("Mapbox API key is not set in environment variables.");
  }

  const encodedInput = encodeURIComponent(input);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedInput}.json?access_token=${apiKey}`;

  try {
    const response = await axios.get(url);
    const features = response.data.features;
    return features.map((feature) => feature.place_name);
  } catch (error) {
    throw new Error(
      "Error fetching autocomplete suggestions: " + error.message,
    );
  }
}
async function getCaptainsInTheRadius(lat, lng, radius) {
  try {
    // Ensure 2dsphere index exists
    await captainModel.collection
      .createIndex({ location: "2dsphere" })
      .catch(() => {});

    const captains = await captainModel.find(
      {
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
            $maxDistance: radius, // in meters
          },
        },
      },
      "socketId location _id", // Select these fields
    );

    return captains;
  } catch (error) {
    console.error("Geospatial query error:", error.message);
    return [];
  }
}

module.exports = {
  getCoordinatesFromAddress,
  getDistanceTime,
  getAutocompleteSuggestions,
  getCaptainsInTheRadius,
};
