import { useEffect, useRef, useState } from "react";
import { useAutocomplete, } from "@vis.gl/react-google-maps";

const inputRef = useRef<HTMLInputElement>(null);
const [place, setPlace] = useState<Place>({ address: "", position: { lat: 0, lng: 0 } });
const [inputValue, setInputValue] = useState("");


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
      "formatted_address",
      "geometry.location",
    ]);
    autocompleteInstance.setComponentRestrictions({ country: ["de"] });
  }

  useEffect(() => {
    if (autocompleteInstance?.getPlace()) {
      const { formatted_address, geometry } = autocompleteInstance.getPlace();
      const lat = geometry?.location
      const lng = geometry?.location

      setPlace((prev) => {
        return {
          ...prev,
          address: formatted_address,
          position: {
            lat: lat?.lat(),
            lng: lng?.lng()
          },
        };
      });
    }
  }, [inputValue]);