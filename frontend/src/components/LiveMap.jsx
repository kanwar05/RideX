import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_CENTER,
  formatDistance,
  formatDuration,
  loadMapbox,
  toLngLat,
} from "../services/mapService";

const styles = {
  light: {
    version: 8,
    sources: {
      carto: {
        type: "raster",
        tiles: [
          "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
          "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
          "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        ],
        tileSize: 256,
      },
    },
    layers: [{ id: "carto", type: "raster", source: "carto" }],
  },
  dark: {
    version: 8,
    sources: {
      carto: {
        type: "raster",
        tiles: [
          "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
          "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
          "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        ],
        tileSize: 256,
      },
    },
    layers: [{ id: "carto", type: "raster", source: "carto" }],
  },
};

styles.navigation = styles.light;
styles.night = styles.dark;

function markerElement(type = "pin", label = "") {
  const el = document.createElement("div");
  el.className =
    "relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-white shadow-lg";

  if (type === "captain") {
    el.innerHTML =
      '<div class="flex h-full w-full items-center justify-center rounded-full bg-black text-white"><i class="ri-car-fill text-lg"></i></div>';
  } else if (type === "user") {
    el.innerHTML =
      '<div class="h-4 w-4 rounded-full bg-blue-600 ring-4 ring-blue-200"></div>';
  } else if (type === "pickup") {
    el.innerHTML =
      '<div class="h-full w-full rounded-full bg-emerald-500"></div>';
  } else if (type === "destination") {
    el.innerHTML = '<div class="h-full w-full rounded-full bg-red-500"></div>';
  } else {
    el.innerHTML =
      '<div class="h-full w-full rounded-full bg-yellow-400"></div>';
  }

  if (label) {
    const badge = document.createElement("span");
    badge.className =
      "absolute left-1/2 top-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-black shadow";
    badge.textContent = label;
    el.appendChild(badge);
  }

  return el;
}

function boundsFor(routeCoordinates, markers) {
  const points = [
    ...(routeCoordinates || []),
    ...(markers || [])
      .map((marker) => toLngLat(marker.position))
      .filter(Boolean),
  ];

  return points;
}

const LiveMap = ({
  center,
  markers = [],
  routeCoordinates = [],
  theme = "light",
  className = "",
  routeInfo,
  autoFit = true,
  zoom = 13,
}) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const mapLibraryRef = useRef(null);
  const markersRef = useRef(new Map());
  const initialCenterRef = useRef(
    toLngLat(center) || toLngLat(markers[0]?.position) || DEFAULT_CENTER,
  );
  const initialThemeRef = useRef(theme);
  const initialZoomRef = useRef(zoom);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  const mapCenter = useMemo(
    () => toLngLat(center) || toLngLat(markers[0]?.position) || DEFAULT_CENTER,
    [center, markers],
  );

  useEffect(() => {
    let cancelled = false;
    const markerStore = markersRef.current;

    loadMapbox()
      .then((mapLibrary) => {
        if (cancelled || mapRef.current || !containerRef.current) return;
        mapLibraryRef.current = mapLibrary;

        const map = new mapLibrary.Map({
          container: containerRef.current,
          style: styles[initialThemeRef.current] || styles.light,
          center: initialCenterRef.current,
          zoom: initialZoomRef.current,
          pitch: 35,
          performanceMetricsCollection: false,
          attributionControl: false,
        });

        map.addControl(new mapLibrary.NavigationControl(), "bottom-right");
        map.addControl(new mapLibrary.AttributionControl({ compact: true }));

        map.on("load", () => {
          if (!map.getSource("route")) {
            map.addSource("route", {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: { type: "LineString", coordinates: [] },
              },
            });
          }

          if (!map.getLayer("route-glow")) {
            map.addLayer({
              id: "route-glow",
              type: "line",
              source: "route",
              layout: { "line-cap": "round", "line-join": "round" },
              paint: {
                "line-color": "#0f172a",
                "line-width": 10,
                "line-opacity": 0.18,
              },
            });
          }

          if (!map.getLayer("route-line")) {
            map.addLayer({
              id: "route-line",
              type: "line",
              source: "route",
              layout: { "line-cap": "round", "line-join": "round" },
              paint: {
                "line-color": "#111827",
                "line-width": 5,
                "line-opacity": 0.95,
              },
            });
          }

          setReady(true);
        });

        mapRef.current = map;
      })
      .catch((err) => {
        setError(err.message || "Mapbox failed to load");
      });

    return () => {
      cancelled = true;
      markerStore.forEach((marker) => marker.remove());
      markerStore.clear();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setStyle(styles[theme] || styles.light);
  }, [theme]);

  useEffect(() => {
    if (!mapRef.current || !ready) return;

    const mapLibrary = mapLibraryRef.current;
    if (!mapLibrary) return;
    const activeIds = new Set();

    markers.forEach((item, index) => {
      const position = toLngLat(item.position);
      if (!position) return;

      const id = item.id || `${item.type || "marker"}-${index}`;
      activeIds.add(id);

      const existing = markersRef.current.get(id);
      if (existing) {
        existing.setLngLat(position);
        return;
      }

      const marker = new mapLibrary.Marker({
        element: markerElement(item.type, item.label),
        anchor: "center",
        rotation: item.bearing || 0,
      })
        .setLngLat(position)
        .addTo(mapRef.current);

      markersRef.current.set(id, marker);
    });

    markersRef.current.forEach((marker, id) => {
      if (!activeIds.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });
  }, [markers, ready]);

  useEffect(() => {
    if (!mapRef.current || !ready) return;

    const source = mapRef.current.getSource("route");
    if (source) {
      source.setData({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: routeCoordinates || [],
        },
      });
    }

    const points = boundsFor(routeCoordinates, markers);
    if (autoFit && points.length > 1) {
      const bounds = points.reduce(
        (box, point) => box.extend(point),
        new mapLibraryRef.current.LngLatBounds(points[0], points[0]),
      );

      mapRef.current.fitBounds(bounds, {
        padding: 72,
        maxZoom: 15,
        duration: 850,
      });
    } else if (mapCenter) {
      mapRef.current.easeTo({ center: mapCenter, zoom, duration: 650 });
    }
  }, [routeCoordinates, markers, mapCenter, autoFit, ready, zoom]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <div ref={containerRef} className="h-full w-full" />

      {routeInfo && (
        <div className="absolute left-4 top-4 rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur">
          <p className="text-xs font-semibold uppercase text-gray-500">
            Live route
          </p>
          <div className="mt-1 flex gap-4 text-sm font-semibold text-black">
            <span>{formatDistance(routeInfo.distanceKm)}</span>
            <span>{formatDuration(routeInfo.durationMin)}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 px-6 text-center text-sm font-medium text-gray-700">
          {error}
        </div>
      )}
    </div>
  );
};

export default React.memo(LiveMap);
