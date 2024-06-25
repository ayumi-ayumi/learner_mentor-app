import { useEffect, useRef, useState } from "react";
import { Place } from "../interfaces/interfaces";
import { useAutocomplete, } from "@vis.gl/react-google-maps";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PlaceAutoComplete({ setPlace, defaultPlace }:{setPlace: React.Dispatch<React.SetStateAction<Place | undefined>>, defaultPlace: any}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(defaultPlace);
  // const [inputValue, setInputValue] = useState("");

  useEffect(()=>{
    if(inputValue) setInputValue(inputValue);
  },[])

  // Place autocomplete function
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPlaceChanged = (place: any) => {
    if (place) {
      setInputValue(place.formatted_address || place.name);
    }
    // Keep focus on input element
    inputRef.current && inputRef.current.focus();
  };

  const autocompleteInstance = useAutocomplete({
    inputField: inputRef && inputRef.current,
    onPlaceChanged,
  });

  if (autocompleteInstance) {
    autocompleteInstance.setFields([
      "name",
      "formatted_address",
      "geometry.location",
    ]);
    autocompleteInstance.setComponentRestrictions({ country: ["de"] });
  }

  useEffect(() => {
    if (autocompleteInstance?.getPlace()) {
      const { name, formatted_address, geometry } = autocompleteInstance.getPlace();

      const lat = geometry?.location
      const lng = geometry?.location

      setPlace((prev: Place | undefined) => {
        return {
          ...prev,
          name: name,
          address: formatted_address,
          position: {
            lat: lat?.lat(),
            lng: lng?.lng()
          },
        };
      });
    }
  }, [inputValue]);

  return (
    <div className="input-container">
      <label htmlFor="location">Your location?</label>
      <input
        type="text"
        id="location"
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
        ref={inputRef}
      />
    </div>
  )


}