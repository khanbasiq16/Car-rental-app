"use client"
import React from 'react'
import Map, { Marker } from 'react-map-gl/mapbox';

const Mapboxmap = () => {
  return (
    <div className='p-5'>

      <h2 className='text-lg font-bold mb-2'>Map</h2>

<div className='rounded-sm overflow-hidden'>

        <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: '100%', height: 550 , borderRadius:20}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      >

         <Marker longitude={-100} latitude={40} anchor="bottom" >
      <img src="./pin.png" />
    </Marker>
      </Map>
      </div>
    </div>
  )
}

export default Mapboxmap