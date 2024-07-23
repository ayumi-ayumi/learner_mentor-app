import { useEffect, useRef, useState } from "react";
import { useMapsLibrary, } from "@vis.gl/react-google-maps";
import React from "react";

export const PlaceAutoComplete = ({ onPlaceSelect, defaultPlace }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address', 'photos'],
      componentRestrictions: { country: "de" },
    };
    
    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      const { name, formatted_address, geometry } = placeAutocomplete.getPlace();
      // const { name, formatted_address, geometry, photos } = placeAutocomplete.getPlace();
      const lat = geometry?.location
      const lng = geometry?.location
      // setPhotos(photos)

      onPlaceSelect({
        name: name,
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
      {/* {photos && photos.map((photo) => (
        <img key={photo.html_attributions} src={photo.getUrl()} style={{
          display: "grid",
          height: "80px",
          width: "60px",
          // margin: "10px 300px",
        }}/>
      ))} */}
    </div>
  );
};

export const PlaceAutoCompleteForCafe = ({ setPlace, defaultPlace }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address', 'photos', 'place_id'],
      componentRestrictions: { country: "de" },
    };
    
    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      // const { name, formatted_address, geometry } = placeAutocomplete.getPlace();
      const { name, formatted_address, geometry, photos, place_id } = placeAutocomplete.getPlace();
      const lat = geometry?.location
      const lng = geometry?.location
      // setPhotos(photos)
      setPlace({
        name: name,
        address: formatted_address,
        position: {
          lat: lat?.lat(),
          lng: lng?.lng()
        },
        photos: photos,
        placeId: place_id,
      });
    });
  }, [setPlace, placeAutocomplete]);

  return (
    <div className="autocomplete-container">
      <input ref={inputRef}  
        defaultValue={defaultPlace}
      />
      {/* {photos && photos.map((photo) => (
        <img key={photo.html_attributions} src={photo.getUrl()} style={{
          display: "grid",
          height: "80px",
          width: "60px",
          // margin: "10px 300px",
        }}/>
      ))} */}
    </div>
  );
};