import { useEffect, useRef, useState } from "react";
import { useMap, useMapsLibrary, } from "@vis.gl/react-google-maps";
import React from "react";
import { CafePlace, Place, UserProfileType } from "../interfaces/interfaces";

export const PlaceAutoComplete = ({ onPlaceSelect, defaultPlace }: { onPlaceSelect: React.Dispatch<React.SetStateAction<Place | undefined>>, defaultPlace: string | undefined }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'formatted_address', 'photos'],
      componentRestrictions: { country: "de" },
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      const { formatted_address, geometry } = placeAutocomplete.getPlace();
      const lat = geometry?.location
      const lng = geometry?.location

      onPlaceSelect({
        address: formatted_address,
        position: {
          lat: lat?.lat(),
          lng: lng?.lng()
        },
      });
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container">
      <input ref={inputRef}
        defaultValue={defaultPlace}
      />
    </div>
  );
};

export const PlaceAutoCompleteForCafe = ({ setPlace }: { setPlace: React.Dispatch<React.SetStateAction<CafePlace>> }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'place_id'],
      componentRestrictions: { country: "de" },
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));

  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      const { geometry, place_id } = placeAutocomplete.getPlace();
      const lat = geometry?.location
      const lng = geometry?.location
      setPlace({
        position: {
          lat: lat?.lat(),
          lng: lng?.lng()
        },
        placeId: place_id,
      });
    });
  }, [setPlace, placeAutocomplete]);

  return (
    <div className="autocomplete-container">
      <input ref={inputRef}
      />
    </div>
  );
};