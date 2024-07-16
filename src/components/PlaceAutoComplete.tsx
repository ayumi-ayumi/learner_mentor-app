import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Place } from "../interfaces/interfaces";
import { useAutocomplete, useMapsLibrary, } from "@vis.gl/react-google-maps";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export function PlaceAutoComplete({ setPlace, defaultPlace }: { setPlace: Dispatch<SetStateAction<Place>>, defaultPlace: any }) {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [inputValue, setInputValue] = useState(defaultPlace);

//   useEffect(() => {
//     if (inputValue) setInputValue(inputValue);
//   }, [])

//   // Place autocomplete function
//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(event.target.value);
//   };

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const onPlaceChanged = (place: any) => {
//     if (place) {
//       setInputValue(place.formatted_address || place.name);
//     }
//     // Keep focus on input element
//     inputRef.current && inputRef.current.focus();
//   };

//   const autocompleteInstance = useAutocomplete({
//     inputField: inputRef && inputRef.current,
//     onPlaceChanged,
//   });

//   if (autocompleteInstance) {
//     autocompleteInstance.setFields([
//       "name",
//       "formatted_address",
//       "geometry.location",
//       // "photos"
//     ]);
//     autocompleteInstance.setComponentRestrictions({ country: ["de"] });
//   }

//   useEffect(() => {
//     if (autocompleteInstance?.getPlace()) {
//       const { name, formatted_address, geometry } = autocompleteInstance.getPlace();
//       // const { name, formatted_address, geometry, photos} = autocompleteInstance.getPlace();
//       const lat = geometry?.location
//       const lng = geometry?.location
//       // console.log(photos)

//       setPlace((prev: Place | undefined) => {
//         return {
//           ...prev,
//           name: name,
//           address: formatted_address,
//           position: {
//             lat: lat?.lat(),
//             lng: lng?.lng()
//           },
//           // photos: photos,
//         };
//       });
//     }
//   }, [inputValue]);

//   return (
//     <div className="input-container">
//       <label htmlFor="location">Your location?</label>
//       <input
//         type="text"
//         id="location"
//         value={inputValue}
//         onChange={(e) => handleInputChange(e)}
//         ref={inputRef}
//       />
//     </div>
//   )
// }

export const PlaceAutoComplete = ({ onPlaceSelect, defaultPlace }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState(defaultPlace);

  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  //   useEffect(() => {
  //   if (inputValue) setInputValue(inputValue);
  // }, [])

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //       setInputValue(event.target.value);
  //     };

  // const [photos, setPhotos] = useState([])

  // console.log(placeAutocomplete)

  useEffect(() => {
    console.log(placeAutocomplete)
    if (placeAutocomplete) return;
    console.log(123)
    const inputElement = inputRef.current as HTMLInputElement;
    inputElement.value = defaultPlace
  }, []);

console.log(inputRef)

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
      // value={inputValue}
      // onChange={(e) => handleInputChange(e)}
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