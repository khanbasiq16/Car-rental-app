"use client";
import React, { useContext, useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import { userLocationContext } from "@/context/UserlocationContext";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./Markers";
import { DestinationCordinatesContext } from "@/context/DestinationCordinates";
import { SourceCordinatesContext } from "@/context/SourceCordinates";
import { DirectionsContext } from "@/context/DirectionDataContext";
import Mapboxroute from "./Mapboxroute";
import DistanceTime from "./DistanceTime";

const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";
const session_token = "8e4f51b2-8a63-4ac0-9187-91fd3770f7d2";

const Mapboxmap = () => {
  const mapref = useRef<any>(null);
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestinationCordinatesContext
  );
  const { userLocation } = useContext(userLocationContext);
  const { sourceCordinates, setSourceCordinate } = useContext(
    SourceCordinatesContext
  );

  const { directionData, setDirectionData } = useContext(
    DirectionsContext
  );

  // Source Markers
  useEffect(() => {
    if (sourceCordinates?.lat && sourceCordinates?.lng) {
      mapref.current?.flyTo({
        center: [sourceCordinates?.lng, sourceCordinates?.lat],
        duration: 2500,
      });
    }
  }, [sourceCordinates]);

  // Destination Markers
  useEffect(() => {
    if (destinationCordinates?.lat && destinationCordinates?.lng) {
      mapref.current?.flyTo({
        center: [destinationCordinates?.lng, destinationCordinates?.lat],
        duration: 2500,
      });
    }

    if(sourceCordinates && destinationCordinates) {
      getdirections();
    }

  }, [destinationCordinates]);

  const getdirections = async () => {

    const res = await fetch(
      `${MAPBOX_DRIVING_ENDPOINT}${sourceCordinates?.lng},${sourceCordinates?.lat};${destinationCordinates?.lng},${destinationCordinates?.lat}?overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
      , {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      console.error("Failed to fetch directions");
      return;
    }
    const result = await res.json();
    console.log("Directions:", result);

    setDirectionData(result);


  };

  return (
    <div className="p-5 relative">
      <h2 className="text-lg font-bold mb-2">Map</h2>

      <div className=" rounded-sm overflow-hidden">
        {userLocation && (
          <Map
            ref={mapref}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 450, borderRadius: 20 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />

            {directionData && directionData.routes && (
             <Mapboxroute coordinates={directionData?.routes[0]?.geometry?.coordinates} />
            )}
          </Map>
        )}

         {directionData && directionData.routes && (
      <div className="min-w-[30%] absolute top-14  right-6 flex justify-between items-center bg-black p-4 rounded-lg">
        <DistanceTime/>
      </div>
         )}
         
      </div>

    </div>
  );
};

export default Mapboxmap;
