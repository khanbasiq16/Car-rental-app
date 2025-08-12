"use client";
import React, { useEffect, useState } from "react";
import Booking from "@/components/Booking/Booking";
import Mapboxmap from "@/components/Map/Mapboxmap";
import { userLocationContext } from "@/context/UserlocationContext";
import { SourceCordinatesContext } from "@/context/SourceCordinates";
import { DestinationCordinatesContext } from "@/context/DestinationCordinates";
import { DirectionsContext } from "@/context/DirectionDataContext";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";

const Page = () => {
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
    <div className="h-screen">

      <userLocationContext.Provider value={{userLocation , setUserLocation}}>
        <SourceCordinatesContext.Provider value={{ sourceCordinates, setSourceCordinate }}>
          <DestinationCordinatesContext.Provider value={{ destinationCordinates, setDestinationCordinates }}>
          <DirectionsContext.Provider value={{directionData, setDirectionData}}>
         <SelectedCarAmountContext.Provider value={{carAmount , setCarAmount}}>

      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="border border-blue-100">
          <Booking  />
        </div>

        <div className="col-span-2  order-first lg:order-last">
          <Mapboxmap />
        </div>
      </div>
      
</SelectedCarAmountContext.Provider>
         
          </DirectionsContext.Provider>
      </DestinationCordinatesContext.Provider>
 </SourceCordinatesContext.Provider>
      </userLocationContext.Provider>
    </div>
  );
};

export default Page;
