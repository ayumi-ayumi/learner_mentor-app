import React, { useState, useEffect, useRef } from "react";
import { useMapsLibrary, useApiIsLoaded } from "@vis.gl/react-google-maps";

// export default function Geocoding () {
export default function useGeocoding() {
   // Google Maps Loading State
   const IsLoaded = useApiIsLoaded();
  const geocodingApiLoaded = useMapsLibrary("geocoding");
  console.log(IsLoaded);
  const [geocodingService, setGeocodingService] = useState();
  const [geocodingResult, setGeocodingResult] = useState();
  const [address, _setAddress] = useState("10 Front St, Toronto");

  useEffect(() => {
    if (!geocodingApiLoaded) return;
    setGeocodingService(new window.google.maps.Geocoder());
    // console.log(123)
  }, [IsLoaded, geocodingApiLoaded]);
  // }, [geocodingApiLoaded]);

  useEffect(() => {
    if (!geocodingService || !address) return;

    geocodingService.geocode({ address }, (results, status) => {
      if (results && status === "OK") {
        setGeocodingResult(results[0]);
      }
    });
  }, [geocodingService, address]);

  if (!geocodingService) return <div>Loading...</div>;
  if (!geocodingResult) return <div>Geocoding...</div>;

  let lat = geocodingResult.geometry.location.lat();
  let lng = geocodingResult.geometry.location.lng();

  // return (geocodingResult.geometry.location.lng())
  return {lat: lat, lng: lng}
  // return lat;
  // return geocodingResult.geometry.location.lat()
  // console.log(123)

  // return (
  //   <div>
  //     <p>Geo</p>
  //     <p>{geocodingResult.geometry.location.lng()}</p>
  //   </div>
  // )
}
