"use client";
import React, { useContext, useEffect, useState } from "react";
import AutoCompletetrAdress from "./AutoCompletetrAdress";
import Car from "./Car";
import Cards from "./Cards";
import { useRouter } from "next/navigation";
import { SelectedCarAmountContext } from "@/context/SelectedCarAmountContext";

const Booking = () => {
  const router = useRouter();

  const { carAmount, setCarAmount } = useContext(SelectedCarAmountContext);

const [screen, setScreen] = useState(0);

  useEffect(() => {
    function updateScreen() {
      setScreen(window.innerHeight * 0.75);
    }
    updateScreen();

    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);


  return (
    <div className="p-5 ">
      <h2 className="text-[20px] font-semibold">Booking</h2>

      <div
        className="border-[1px] rounded-md flex overflow-hidden flex-col justify-between"
        style={{ height: screen }}
      >
        <div className="p-5 overflow-y-auto">
          <AutoCompletetrAdress />
          <Car />
          {/* <Cards /> */}
        </div>

        {/* Button fixed at bottom of container */}
        <button
          onClick={() => router.push("/payment")}
          disabled={!carAmount}
          type="button"
          className={`w-full text-white py-3 rounded-lg font-medium 
    transition-all duration-300 transform
    ${
      !carAmount
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-black hover:scale-105 hover:bg-gray-900 active:scale-95"
    }`}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Booking;
