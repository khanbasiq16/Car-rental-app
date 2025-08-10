import Image from 'next/image'
import React, { useState } from 'react'
import { cars } from '../data/Carlist'

const Car = () => {
  const [selectedCar, setSelectedCar] = useState<any>()

  return (
    <div className='mt-5'>
      <h2 className='font-semibold'>Select Car</h2>

      <div className="flex overflow-x-auto space-x-5 scrollbar-hide p-4">
        {cars.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedCar(item.id)}
            className={`bg-white shadow-lg hover:shadow-xl rounded-xl min-w-[250px] flex-shrink-0 p-3 border 
              ${selectedCar === item.id ? 'border-black border-2' : 'border-gray-200'} 
              cursor-pointer transition-all duration-300 ease-in-out`}
          >
            <div className="flex justify-center">
              <div className="w-[180px] h-[120px] overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={180}
                  height={120}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-500 text-sm mt-1">Starting from</p>
              <p className="text-lg font-bold ">${item.charges * 8}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Car
