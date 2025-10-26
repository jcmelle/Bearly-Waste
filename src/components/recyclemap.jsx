import { useEffect, useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

const locations = [
  { key: "goodEarth", location: { lat: 39.860569, lng: -79.068985 } },
  { key: "sunsetRecy1", location: { lat: 33.8317558, lng: -118.215402 } },
  { key: "sunsectRecy2", location: { lat: 33.8478802, lng: -118.1156596 } },
  { key: "leyvaTopline", location: { lat: 33.8587425, lng: -118.1684761 } },
  { key: "conservCorps", location: { lat: 33.7690054, lng: -118.1329515 } },
];

export default function RecycleMap() {
  const [userPos, setUserPos] = useState(null);

  useEffect(() => {
    // Ask for location when map is about to show
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserPos({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        (err) => {
          console.warn("Location error:", err.message);
          // fallback to a general center if denied
          setUserPos({ lat: 33.7874282, lng: -118.1144116 });
        }
      );
    }
  }, []);

  if (!userPos) {
    return (
      <p className="text-gray-600 mt-3">Getting your location... 📍</p>
    );
  }

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="w-full h-64 rounded-xl overflow-hidden border border-emerald-300 mt-4">
        <Map
          mapId="9988299291cc5094bf55dfa9"
          defaultZoom={13}
          defaultCenter={userPos}
          gestureHandling="greedy"
          disableDefaultUI={true}
        >
          {/* user's current location marker */}
          <AdvancedMarker position={userPos}>
            <Pin background="#34A853" glyphColor="#fff" borderColor="#000" />
          </AdvancedMarker>

          {/* fixed known recycling centers */}
          {locations.map((poi) => (
            <AdvancedMarker key={poi.key} position={poi.location}>
              <Pin background="#FBBC04" glyphColor="#000" borderColor="#000" />
            </AdvancedMarker>
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}

    