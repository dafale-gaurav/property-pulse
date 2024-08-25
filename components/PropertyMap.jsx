"use client";
import React, { useRef, useEffect} from "react";
import opencage from "opencage-api-client";
import "leaflet/dist/leaflet.css";
import shadow from "leaflet/dist/images/marker-shadow.png";
import pin from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
 
const Map = ({property}) => {
 
const mapContainer = useRef(null);
const map = useRef(null);
 
useEffect(() => {
   const getCoords = () => {
      opencage
         .geocode({
           q: `${property.location.street}, ${property.location.city}, ${property.location.state}`,
           key: "49c47c3f505b4cdda5e9cf8422911e13",
         })
         .then((data) => {
           if (data.results.length > 0) {
             const place = data.results[0];
             console.log(place)
           } else {
             console.log("status", data.status.message);
             console.log("total_results", data.total_results);
           }
 
           if (map.current) return; // stops map from intializing more than once
 
           map.current = new L.Map(mapContainer.current, {
             center: L.latLng(
               data.results[0].geometry.lat,
               data.results[0].geometry.lng
             ),
             zoom: 12,
           });
 
           // Create a MapTiler Layer inside Leaflet
           const mtLayer = new MaptilerLayer({
             // Get your free API key at https://cloud.maptiler.com
             apiKey: "IVpH5Bhm18U2h5e5ArJb",
           }).addTo(map.current);
 
           const icon = new L.Icon({
             iconUrl: pin.src,
             shadowUrl: shadow.src,
             iconSize: [35, 50],
             shadowSize: [80, 54],
             shadowAnchor: [25, 40],
           });
 
           L.marker(
             [data.results[0].geometry.lat, data.results[0].geometry.lng],
             {
               icon,
             }
           ).addTo(map.current);
         });
   
   }
   getCoords()
     
  }, []);
 
  return (
    <div className="relative w-full h-[400px]">
      <div ref={mapContainer} className="absolute w-full h-[400px]" />
    </div>
  );
};
 
export default Map;