"use client";
import { DestinationCordinatesContext } from "@/context/DestinationCordinates";
import { SourceCordinatesContext } from "@/context/SourceCordinates";
import { userLocationContext } from "@/context/UserlocationContext";
import React, { useContext } from "react";
import { Marker } from "react-map-gl/mapbox";

const Markers = () => {
  const { userLocation } = useContext(userLocationContext);
  const { sourceCordinates, setSourceCordinate } = useContext(
    SourceCordinatesContext
  );
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordinatesContext
  );

  return (
    <div>

      {/* User Location Marker */}
     
        <Marker
          longitude={userLocation?.lng}
          latitude={userLocation?.lat}
          anchor="bottom"
        >
          <img src="./pin.png" className=" h-10" alt="Pin" />
        </Marker>
    
      {/* Source Marker */}
      {sourceCordinates && (
        <Marker
          longitude={sourceCordinates?.lng}
          latitude={sourceCordinates?.lat}
          anchor="bottom"
        >
          <img src="./pin.png" className=" h-10" alt="Pin" />
        </Marker>
      )}

   

      {/* Destination Marker  */}
     { destinationCordinates && (
      <Marker
        longitude={destinationCordinates?.lng}
        latitude={destinationCordinates?.lat}
        anchor="bottom"
      >
        <img src="./pin.png" className=" h-10" alt="Pin" />
      </Marker>
      )}
  
       
    </div>
  );
};

export default Markers;
