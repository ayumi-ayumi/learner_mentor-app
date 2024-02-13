import React, { useState, useEffect, useRef } from "react";
import { useMapsLibrary, useApiIsLoaded } from "@vis.gl/react-google-maps";

export function useGeocoding (initialValue) {
  // const apiIsLoaded = useApiIsLoaded();
  const geocodingLibrary = useMapsLibrary("geocoding");
  const [geocodingService, setGeocodingService] = useState();
  // const [geocodingResult, setGeocodingResult] = useState();
  // const [addresses, setAddresses] = useState(initialValue);
  const [lat, setLat] = useState([]);
  const [lng, setLng] = useState();
  const [latLng, setLatLng] = useState([]);
  // console.log(geocodingLibrary)
  // console.log(initialValue)
  // const [] = useState();
  
  
  useEffect(() => {
    if (!geocodingLibrary) return;
    // if (!geocodingLibrary) return;
    setGeocodingService(new window.google.maps.Geocoder());
    console.log(initialValue)
  // }, [apiIsLoaded]);
  }, [geocodingLibrary]);
  // useEffect(() => {
  //   if (!apiIsLoaded) return;
  //   // if (!geocodingLibrary) return;
  //   setGeocodingService(new window.google.maps.Geocoder());
  //   console.log(initialValue)
  // // }, [apiIsLoaded]);
  // }, [geocodingLibrary, apiIsLoaded]);
  
    // console.log(addresses)

    // if (!geocodingService) return;
    // if (!geocodingService || !address) return;

    // console.log(123)
    useEffect(()=>{
      if (!geocodingService || !initialValue) return;

      // const r = initialValue.map((address) =>{
      //   console.log(address)
      // })
      // const r = initialValue.map((address) =>{
      //   return address + 123
      // })
      // console.log(r)
      // setLatLng(r)
      // const r = initialValue.map((address) =>{
        geocodingService.geocode({address: initialValue}, (results, status) => {
          if (results && status === "OK") {
            // const a = results[0].geometry.location.lat()
          setLatLng({lat:results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()})

            // return a
          } 
        });
      // })
      // console.log(r)
      // setLatLng(r)

    }, [geocodingService, initialValue])
  // });
  // }, [geocodingLibrary]);
  //         // return {lat:results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
  //         // setLat(prev=>[...prev, results[0].geometry.location.lat()])
  //         // setGeocodingResult(results[0]);
  //         // console.log(results[0].geometry.location.lat())
  //         // setLatLng([...latLng, a])
  //         // setLatLng([...latLng, {lat:results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}])
  //         // setLat(results[0].geometry.location.lat());
  //         // setLng(results[0].geometry.location.lng());
  //       } 
  //     });
  //   })
  //   setLatLng(r)
  // // });
  // // }, [geocodingLibrary]);
  // }, [geocodingService, apiIsLoaded, geocodingLibrary]);
  // }, [geocodingService, geocodingLibrary]);
  // useEffect(() => {
  //   if (!geocodingService || !address) return;

  //   geocodingService.geocode({ address }, (results, status) => {
  //     if (results && status === "OK") {
  //       console.log("inside useeffect")
  //       setGeocodingResult(results[0]);
  //       setLat(results[0].geometry.location.lat());
  //       setLng(results[0].geometry.location.lng());
  //     } 
  //   });
  // }, [geocodingService, address]);
  // return { lat, lng };
  // console.log(latLng)

  return latLng

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
