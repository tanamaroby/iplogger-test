import { LocationType } from "@/lib/types";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React from "react";

interface LocationCardProps {
  location: LocationType;
}

const containerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "0.75rem",
};

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
  });

  const center = {
    lat: location.lat,
    lng: location.lon,
  };

  return (
    <div
      className="max-w-2xl mx-auto bg-zinc-900 text-zinc-100 rounded-2xl shadow-lg p-6 space-y-6 border border-zinc-800 text-start"
      data-testid="location-card"
    >
      <h2 className="text-2xl font-bold text-center">📍 Location Info</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-sm">
        <div className="font-medium text-zinc-400">IP Address:</div>
        <div>{location.query}</div>

        <div className="font-medium text-zinc-400">Country:</div>
        <div>
          {location.country} ({location.countryCode})
        </div>

        <div className="font-medium text-zinc-400">Region:</div>
        <div>
          {location.regionName} ({location.region})
        </div>

        <div className="font-medium text-zinc-400">City / District:</div>
        <div>
          {location.city} {location.district && ` / ${location.district}`}
        </div>

        <div className="font-medium text-zinc-400">ZIP Code:</div>
        <div>{location.zip}</div>

        <div className="font-medium text-zinc-400">Timezone:</div>
        <div>{location.timezone}</div>

        <div className="font-medium text-zinc-400">ISP / Org:</div>
        <div>
          {location.isp} / {location.org}
        </div>

        <div className="font-medium text-zinc-400">
          Proxy / Mobile / Hosting:
        </div>
        <div>
          {location.proxy ? "Proxy" : "No Proxy"},{" "}
          {location.mobile ? "Mobile" : "Not Mobile"},{" "}
          {location.hosting ? "Hosting" : "Not Hosting"}
        </div>
      </div>
      {isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          <Marker position={center} />
        </GoogleMap>
      ) : (
        <p className="text-center text-zinc-400">Loading map...</p>
      )}
    </div>
  );
};

export default LocationCard;
