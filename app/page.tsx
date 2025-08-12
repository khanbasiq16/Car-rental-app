"use client";
import React, { useEffect, useState } from "react";
import Booking from "@/components/Booking/Booking";
import Mapboxmap from "@/components/Map/Mapboxmap";


const Page = () => {
 

  return (
    <div className="h-screen">

  
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="border border-blue-100">
          <Booking  />
        </div>

        <div className="col-span-2  order-first lg:order-last">
          <Mapboxmap />
        </div>
      </div>
      

    </div>
  );
};

export default Page;
