"use client";
import React from 'react'
import AutoCompletetrAdress from './AutoCompletetrAdress'
import Car from './Car';
import Cards from './Cards';

const Booking = () => {
  const screen =  window.innerHeight *0.75 ;

  return (
    <div className='p-5 '>
      <h2 className='text-[20px] font-semibold'>Booking</h2>

      <div
        className='border-[1px] rounded-md flex overflow-hidden flex-col justify-between'
        style={{ height: screen }}
      >
        <div className='p-5 overflow-y-auto'>
          <AutoCompletetrAdress />
          <Car />
          <Cards />
        </div>

        {/* Button fixed at bottom of container */}
        <button
          className="w-full bg-black text-white py-3 rounded-lg font-medium 
            transition-all duration-300 transform hover:scale-105 hover:bg-gray-900 active:scale-95"
        >
          Book Now
        </button>
      </div>
    </div>
  )
}

export default Booking
