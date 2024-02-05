import React, { useState, useEffect, useRef } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export function useGeocoding() {
  const geocodingApiLoaded = useMapsLibrary("geocoding");
  const [geocodingService, setGeocodingService] = useState();
  const [geocodingResult, setGeocodingResult] = useState();
  const [address, _setAddress] = useState("10 Front St, Toronto");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  useEffect(() => {
    if (!geocodingApiLoaded) return;
    setGeocodingService(new window.google.maps.Geocoder());
    console.log(0)
  }, [geocodingApiLoaded]);

  useEffect(() => {
    if (!geocodingService || !address) return;

    geocodingService.geocode({ address }, (results, status) => {
      if (results && status === "OK") {
        setGeocodingResult(results[0]);
        setLat(results[0].geometry.location.lat());
        setLng(results[0].geometry.location.lng());
        console.log(123)
      }
    });
  }, [geocodingService, address]);

  return console.log(123)
  // return geocodingResult;
  // return { lat, lng };

  // useEffect(()=>{
  //   return props.getLoc({lat, lng})
  // }, [lat, lng])

  // if(!geocodingService) return <div>Loading...</div>;
  // if(!geocodingResult) return <div>Geocoding...</div>;
  // return null;
  // return (
  //   <div>
  //     {/* <p>Geo</p> */}
  //     {/* <p>{geocodingResult.geometry.location.lat()}</p> */}
  //   </div>
  // )
}
