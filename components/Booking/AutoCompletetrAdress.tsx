"use client";
import React, { useEffect, useState, useRef } from "react";

const AutoCompletetrAdress = () => {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

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
    if (!sourceTyping.current) return; // prevent auto-fetch when selecting
    const timer = setTimeout(() => {
      getAddress(source, setSourceList);
    }, 800);
    return () => clearTimeout(timer);
  }, [source]);

  // Destination debounce
  useEffect(() => {
    if (!destTyping.current) return;
    const timer = setTimeout(() => {
      getAddress(destination, setDestinationList);
    }, 800);
    return () => clearTimeout(timer);
  }, [destination]);

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
                  sourceTyping.current = false; // prevent re-fetch
                  setSource(item.full_address);
                  setSourceList([]);
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
                  destTyping.current = false; // prevent re-fetch
                  setDestination(item.full_address);
                  setDestinationList([]);
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
