// components/Providers.tsx
"use client";

import React, { useEffect, useState } from "react";
import { userLocationContext } from "@/context/UserlocationContext";
import { SourceCordinatesContext } from "@/context/SourceCordinates";
import { DestinationCordinatesContext } from "@/context/DestinationCordinates";
import { DirectionsContext } from "@/context/DirectionDataContext";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [userLocation, setUserLocation] = useState<any>();
    const [sourceCordinates, setSourceCordinate] = useState<any>();
     const [destinationCordinates, setDestinationCordinates] = useState<any>();
     const [directionData, setDirectionData] = useState<any>([]);
     const [carAmount, setCarAmount] = useState<any>();
     

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <userLocationContext.Provider value={{ userLocation, setUserLocation }}>
      <SourceCordinatesContext.Provider value={{ sourceCordinates, setSourceCordinate }}>
        <DestinationCordinatesContext.Provider value={{ destinationCordinates, setDestinationCordinates }}>
          <DirectionsContext.Provider value={{ directionData, setDirectionData }}>
            <SelectedCarAmountContext.Provider value={{ carAmount, setCarAmount }}>
              {children}
            </SelectedCarAmountContext.Provider>
          </DirectionsContext.Provider>
        </DestinationCordinatesContext.Provider>
      </SourceCordinatesContext.Provider>
    </userLocationContext.Provider>
  );
}
