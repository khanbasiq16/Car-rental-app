"use client";
import { DestinationCordinatesContext } from "@/context/DestinationCordinates";
import { SourceCordinatesContext } from "@/context/SourceCordinates";
import React, { useEffect, useState, useRef, useContext } from "react";

const BASE_MAPBOX_RETRIEVE_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve/";
const session_token = "8e4f51b2-8a63-4ac0-9187-91fd3770f7d2";

const AutoCompletetrAdress = () => {
  const [source, setSource] = useState<string>("");
  const {sourceCordinates, setSourceCordinate} = useContext(SourceCordinatesContext);

  const [destination, setDestination] = useState<string>("");
  const {destinationCordinates, setDestinationCordinates} = useContext(DestinationCordinatesContext);

  const [sourceList, setSourceList] = useState<any[]>([]);
  const [destinationList, setDestinationList] = useState<any[]>([]);

  const sourceTyping = useRef(false);
  const destTyping = useRef(false);

  const getAddress = async (query: string, setList: Function) => {
    if (!query) {
      setList([]);
      return;
    }
    try {
      const response = await fetch(`/api/search-address?q=${query}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      setList(result?.result?.suggestions || []);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Source debounce
  useEffect(() => {
    if (!sourceTyping.current) return;
    const timer = setTimeout(() => {
      getAddress(source, setSourceList);
    }, 800);
    return () => clearTimeout(timer);
  }, [source]);

  useEffect(() => {
    if (!destTyping.current) return;
    const timer = setTimeout(() => {
      getAddress(destination, setDestinationList);
    }, 800);
    return () => clearTimeout(timer);
  }, [destination]);

  const onSourceAddressClick = async (item: any) => {
    sourceTyping.current = false;
    setSource(item.full_address);
    setSourceList([]);

    const res = await fetch(
      `${BASE_MAPBOX_RETRIEVE_URL}${item.mapbox_id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    );
    const result = await res.json();
    console.log("Source Address Details:", result);

    setSourceCordinate({
      lng: result?.features[0]?.geometry?.coordinates[0],
      lat: result?.features[0]?.geometry?.coordinates[1],
    });
  };

  const onDestinationAddressClick = async (item: any) => {
    destTyping.current = false; 
                  setDestination(item.full_address);
                  setDestinationList([]);

    const res = await fetch(
      `${BASE_MAPBOX_RETRIEVE_URL}${item.mapbox_id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    );
    const result = await res.json();
    console.log("Source Address Details:", result);

    setDestinationCordinates({
      lng: result?.features[0]?.geometry?.coordinates[0],
      lat: result?.features[0]?.geometry?.coordinates[1],
    });
  };

  return (
    <div className="mt-5">
      {/* SOURCE */}
      <div className="mb-5 relative">
        <label className="text-gray-400">Where From?</label>
        <input
          type="text"
          className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300"
          value={source}
          onChange={(e) => {
            sourceTyping.current = true;
            setSource(e.target.value);
          }}
        />

        {sourceList.length > 0 && (
          <div className="absolute z-10 bg-white border w-full shadow-md rounded-md mt-1 max-h-60 overflow-y-auto">
            {sourceList.map((item: any, index: number) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSourceAddressClick(item);
                }}
              >
                {item.full_address}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DESTINATION */}
      <div className="relative">
        <label className="text-gray-400">Where To?</label>
        <input
          type="text"
          className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300"
          value={destination}
          onChange={(e) => {
            destTyping.current = true;
            setDestination(e.target.value);
          }}
        />

        {destinationList.length > 0 && (
          <div className="absolute z-10 bg-white border w-full rounded-md mt-1 max-h-60 overflow-y-auto">
            {destinationList.map((item: any, index: number) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                 onDestinationAddressClick(item)
                }}
              >
                {item.full_address}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoCompletetrAdress;
