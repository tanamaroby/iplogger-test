"use client";
import { LocationType } from "@/lib/types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BarLoader } from "react-spinners";
import LocationCard from "./LocationCard";

export const FAILED_TEXT = "Unable to fetch IP";
export const FAILED_LOC = "Failed to fetch location";

const IpAddressGrabComponent: React.FC = () => {
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationType | null>(null);

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        setIpAddress(data.ip);
      } catch (error) {
        toast.error(FAILED_TEXT);
        setIpAddress(FAILED_TEXT);
      }
    };
    fetchIpAddress();
  }, []);

  useEffect(() => {
    if (ipAddress && ipAddress !== FAILED_TEXT) {
      const fetchLocation = async () => {
        try {
          const res = await fetch(`http://ip-api.com/json/${ipAddress}`);
          const data = await res.json();
          setLocation(data);
        } catch (error) {
          toast.error(FAILED_LOC);
        }
      };
      fetchLocation();
    }
  }, [ipAddress]);

  return (
    <div className="container mx-auto text-center flex flex-col gap-4 items-center justify-center">
      <p className="text-2xl">Your IP Address</p>
      {ipAddress ? (
        <p className="text-3xl font-bold">{ipAddress}</p>
      ) : (
        <BarLoader
          color="white"
          aria-label="Loading Spinner"
          height={12}
          width={200}
          data-testid="loader"
        />
      )}
      {ipAddress !== null &&
        ipAddress !== FAILED_TEXT &&
        (location ? (
          <LocationCard location={location} />
        ) : (
          <BarLoader
            color="white"
            aria-label="Loading Spinner"
            height={12}
            width={200}
            data-testid="loader2"
          />
        ))}
    </div>
  );
};

export default IpAddressGrabComponent;
