import axios from "axios";

const MAP_SCRIPT_ID = "maplibre-gl-js";
const MAP_CSS_ID = "maplibre-gl-css";
const MAPLIBRE_VERSION = "4.7.1";

export const MAPBOX_TOKEN =
  import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || import.meta.env.VITE_MAPBOX_TOKEN;

export const DEFAULT_CENTER = [76.7794, 30.7333];

let mapLibraryPromise;

export function loadMapbox() {
  if (!MAPBOX_TOKEN) {
    return Promise.reject(
      new Error("Missing VITE_MAPBOX_ACCESS_TOKEN in frontend .env"),
    );
  }

  if (window.maplibregl) {
    return Promise.resolve(window.maplibregl);
  }

  if (mapLibraryPromise) {
    return mapLibraryPromise;
  }

  mapLibraryPromise = new Promise((resolve, reject) => {
    if (!document.getElementById(MAP_CSS_ID)) {
      const link = document.createElement("link");
      link.id = MAP_CSS_ID;
      link.rel = "stylesheet";
      link.href = `https://unpkg.com/maplibre-gl@${MAPLIBRE_VERSION}/dist/maplibre-gl.css`;
      document.head.appendChild(link);
    }

    const existingScript = document.getElementById(MAP_SCRIPT_ID);
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        resolve(window.maplibregl);
      });
      existingScript.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.id = MAP_SCRIPT_ID;
    script.src = `https://unpkg.com/maplibre-gl@${MAPLIBRE_VERSION}/dist/maplibre-gl.js`;
    script.async = true;
    script.onload = () => {
      resolve(window.maplibregl);
    };
    script.onerror = reject;
    document.body.appendChild(script);
  });

  return mapLibraryPromise;
}

export function toLngLat(location) {
  if (!location) return null;
  if (Array.isArray(location) && location.length >= 2) return location;
  if (location.lng !== undefined && location.lat !== undefined) {
    return [Number(location.lng), Number(location.lat)];
  }
  if (location.longitude !== undefined && location.latitude !== undefined) {
    return [Number(location.longitude), Number(location.latitude)];
  }
  if (location.coordinates?.length >= 2) return location.coordinates;
  if (location.location?.coordinates?.length >= 2) {
    return location.location.coordinates;
  }
  return null;
}

export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not available in this browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve([position.coords.longitude, position.coords.latitude]);
      },
      reject,
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 },
    );
  });
}

export async function reverseGeocodeCoordinates(location) {
  const coordinates = toLngLat(location);

  if (!coordinates || !MAPBOX_TOKEN) {
    throw new Error("Unable to reverse geocode this location");
  }

  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.join(
      ",",
    )}.json`,
    {
      params: {
        access_token: MAPBOX_TOKEN,
        types: "address,poi,place,locality,neighborhood",
      },
    },
  );

  const feature = response.data.features?.[0];
  if (!feature?.place_name) {
    throw new Error("No readable address found for this location");
  }

  return feature.place_name;
}

export async function getCurrentLocation() {
  const coordinates = await getCurrentPosition();
  const address = await reverseGeocodeCoordinates(coordinates);

  return {
    address,
    coordinates,
    longitude: coordinates[0],
    latitude: coordinates[1],
  };
}

export function watchCurrentPosition(onPosition, onError) {
  if (!navigator.geolocation) return null;

  return navigator.geolocation.watchPosition(
    (position) => {
      onPosition([position.coords.longitude, position.coords.latitude], position);
    },
    onError,
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 3000 },
  );
}

export async function geocodeAddress(address) {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`,
    {
      params: { address },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  );

  return toLngLat(response.data);
}

export async function getMapboxRoute(origin, destination) {
  const start = toLngLat(origin);
  const end = toLngLat(destination);

  if (!start || !end || !MAPBOX_TOKEN) {
    return null;
  }

  const response = await axios.get(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(",")};${end.join(",")}`,
    {
      params: {
        geometries: "geojson",
        overview: "full",
        steps: false,
        access_token: MAPBOX_TOKEN,
      },
    },
  );

  const route = response.data.routes?.[0];
  if (!route) return null;

  return {
    coordinates: route.geometry.coordinates,
    distanceKm: route.distance / 1000,
    durationMin: route.duration / 60,
  };
}

export function formatDistance(distanceKm) {
  if (!Number.isFinite(distanceKm)) return "--";
  return distanceKm < 1
    ? `${Math.round(distanceKm * 1000)} m`
    : `${distanceKm.toFixed(1)} km`;
}

export function formatDuration(durationMin) {
  if (!Number.isFinite(durationMin)) return "--";
  return `${Math.max(1, Math.round(durationMin))} min`;
}
