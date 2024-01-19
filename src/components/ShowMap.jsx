import React from "react";
import "../styles/ShowMap.scss"
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function ShowMap() {
  const position = { lat: 52.52, lng: 13.41 }; //Berlin
  const [open, setOpen] = React.useState(false);

  return (
    <APIProvider apiKey={API_KEY}>
      <div id="map">
      {/* <div style={{ height: "80vh", width: "90%" }}> */}
        <Map
          zoom={9}
          center={position}
          gestureHandling={"greedy"}
          disableDefaultUI={false} //trueにすると、ズームのアイコンなどが全て非表示になる
          mapId={import.meta.env.VITE_GOOGLE_MAPS_ID} //To use a marker, map ID is needed
        >
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin
              background={"green"}
              borderColor={"pink"}
              glyphColor={"yellow"}
            ></Pin>
          </AdvancedMarker>
          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>I'm in Berlin!</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
