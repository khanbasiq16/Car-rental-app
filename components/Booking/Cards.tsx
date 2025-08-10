import React, { useState } from 'react'

const Cards = () => {
  const paymentimage = ["/Visa.png", "/paypal.jpeg", "/master.png"]
  const [selected, setSelected] = useState<any>()

  return (
    <>
    
        <h2 className='text-[18px] mt-3 font-semibold'>Payment Methods</h2>
    <div className="flex  space-x-5 mt-3">
      {paymentimage.map((img, index) => (
        <div
          key={index}
          onClick={() => setSelected(index)}
          className={`bg-white shadow-md rounded-lg p-4 flex items-center justify-center w-[120px] h-[80px] border cursor-pointer transition-all duration-300
            ${selected === index ? 'border-black border-2' : 'border-gray-200'}
          `}
        >
          <img
            src={img}
            alt={`Payment ${index}`}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ))}
    </div>
    </>
  )
}

export default Cards
