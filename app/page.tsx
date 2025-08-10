"use client";
import React, { useEffect, useState } from "react";
import Booking from "@/components/Booking/Booking";
import Mapboxmap from "@/components/Map/Mapboxmap";
import { userLocationContext } from "@/context/UserlocationContext";

const Page = () => {
  const [userLocation, setUserLocation] = useState<any>();

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
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="border border-blue-100">
          <Booking  />
        </div>

        <div className="col-span-2 border border-red-500 order-first lg:order-last">
          <Mapboxmap />
        </div>
      </div>

      </userLocationContext.Provider>
    </div>
  );
};

export default Page;
