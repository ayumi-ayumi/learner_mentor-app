import React, { useState, useEffect, useRef } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  Marker,
  useApiIsLoaded,
  APILoadingStatus,
  useApiLoadingStatus,
  useAutocomplete,
  useMapsLibrary
} from "@vis.gl/react-google-maps";

export default function Geocoding (props) {
// export function geocoding () {
  const geocodingApiLoaded = useMapsLibrary("geocoding");
  const [geocodingService, setGeocodingService] = useState();
  const [geocodingResult, setGeocodingResult] = useState();
  const [address, _setAddress] = useState("10 Front St, Toronto");

  useEffect(()=>{
    if (!geocodingApiLoaded) return;
    setGeocodingService(new window.google.maps.Geocoder());
    // console.log(123)
  }, [geocodingApiLoaded])

  useEffect(()=>{
    if(!geocodingService || !address) return;

    geocodingService.geocode({ address }, (results, status) => {
      if (results && status === "OK"){
        setGeocodingResult(results[0]);
      }
    })
  }, [geocodingService, address])
  
  if(!geocodingService) return <div>Loading...</div>;
  if(!geocodingResult) return <div>Geocoding...</div>;

  // return (geocodingResult.geometry.location.lng())
  // console.log(123)

  let lat = geocodingResult.geometry.location.lat()
  let lng = geocodingResult.geometry.location.lng()
  // props.setGeo({lat, lng})
  props.getLoc({lat,lng})
// return {lat, lng}
  return (
    <div>
      <p>Geo</p>
      <p>{geocodingResult.geometry.location.lng()}</p>
    </div>
  )
}