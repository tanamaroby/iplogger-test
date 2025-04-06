"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BarLoader } from "react-spinners";

export const FAILED_TEXT = "Unable to fetch IP";

const IpAddressGrabComponent: React.FC = () => {
  const [ipAddress, setIpAddress] = useState<string | null>(null);

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        if (data.ip) setIpAddress(data.ip);
        toast.success("Succesfully fetched your IP");
      } catch (error) {
        setIpAddress(FAILED_TEXT);
        toast.error("Unable to fetch IP");
      }
    };

    fetchIpAddress();
  }, []);

  return (
    <div className="container mx-auto text-center flex flex-col gap-2 items-center justify-center">
      <p className="text-2xl">Your IP Address</p>
      {ipAddress ? (
        <p className="text-3xl font-bold">{ipAddress}</p>
      ) : (
        <BarLoader
          color="white"
          aria-label="Loading Spinner"
          width={200}
          data-testid="loader"
        />
      )}
    </div>
  );
};

export default IpAddressGrabComponent;
