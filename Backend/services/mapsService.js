const axios = require("axios");
// Function to get coordinates (latitude and longitude) from an address using Mapbox API
// Returns an object: { ltd, lang }
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
      const [lang, ltd] = features[0].center;
      return { ltd, lang };
    } else {
      throw new Error("No coordinates found for the given address.");
    }
  } catch (error) {
    throw new Error("Error fetching coordinates: " + error.message);
  }
}

module.exports = {
  getCoordinatesFromAddress,
};
