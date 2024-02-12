import React, { useState, useEffect, useRef } from "react";
import { useMapsLibrary, useApiIsLoaded } from "@vis.gl/react-google-maps";

export function useGeocoding (initialValue) {
  const apiIsLoaded = useApiIsLoaded();
  const geocodingApiLoaded = useMapsLibrary("geocoding");
  const [geocodingService, setGeocodingService] = useState();
  const [geocodingResult, setGeocodingResult] = useState();
  const [address, setAddress] = useState(initialValue);
  // const [address, _setAddress] = useState("10 Front St, Toronto");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  console.log(apiIsLoaded)

  useEffect(() => {
    if (!apiIsLoaded) return;
    // if (!geocodingApiLoaded) return;
    setGeocodingService(new window.google.maps.Geocoder());
  }, [geocodingApiLoaded, apiIsLoaded]);

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

  // return console.log(123)
  // return geocodingResult;
  // return lat;
  return { lat, lng };

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
