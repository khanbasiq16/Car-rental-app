import React from "react";
import { Layer, Source } from "react-map-gl/mapbox";

const Mapboxroute = ( props:any) => {
  return (
    <Source
      type="geojson"
      data={{
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: props.coordinates
        }
      }}
    >
      <Layer
        id="route"
        type="line"
        layout={{
          "line-join": "round",
          "line-cap": "round",
        }}
        paint={{
          "line-color": "#3b82f6", 
          "line-width": 4,
        }}
      />
    </Source>
  );
};

export default Mapboxroute;
