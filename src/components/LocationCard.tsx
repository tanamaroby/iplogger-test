import { LocationType } from "@/lib/types";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React from "react";

interface Props {
  location: LocationType;
}

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "0.75rem",
};

const LocationCard: React.FC<Props> = ({ location }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
  });

  const center = {
    lat: location.latitude,
    lng: location.longitude,
  };

  return (
    <div
      className="w-full max-w-2xl mx-auto p-6 bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-2xl shadow-md space-y-6 text-start"
      data-testid="location-card"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          🌍 {location.country} {location.flag?.emoji}
        </h2>
        <img
          src={location.flag?.img}
          alt={`${location.country} flag`}
          className="w-8 h-6 rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <div className="font-medium text-zinc-400">IP Address:</div>
        <div>{location.ip}</div>

        <div className="font-medium text-zinc-400">City / Region:</div>
        <div>
          {location.city}, {location.region}
        </div>

        <div className="font-medium text-zinc-400">Continent:</div>
        <div>
          {location.continent} ({location.continent_code})
        </div>

        <div className="font-medium text-zinc-400">Postal Code:</div>
        <div>{location.postal}</div>

        <div className="font-medium text-zinc-400">Timezone:</div>
        <div>
          {location.timezone?.id} ({location.timezone?.abbr}) —{" "}
          {location.timezone?.utc}
        </div>

        <div className="font-medium text-zinc-400">Local Time:</div>
        <div>{location.timezone?.current_time}</div>

        <div className="font-medium text-zinc-400">ISP:</div>
        <div>{location.connection?.isp}</div>

        <div className="font-medium text-zinc-400">Organization:</div>
        <div>{location.connection?.org}</div>

        <div className="font-medium text-zinc-400">Security:</div>
        <div>
          {location.security?.proxy ? "Proxy" : "No Proxy"},{" "}
          {location.security?.vpn ? "VPN" : "No VPN"},{" "}
          {location.security?.tor ? "TOR" : "No TOR"}
        </div>
      </div>

      {isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          <Marker position={center} />
        </GoogleMap>
      ) : (
        <p className="text-center text-zinc-500">Loading map…</p>
      )}
    </div>
  );
};

export default LocationCard;
