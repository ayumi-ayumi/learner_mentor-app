import React from "react";
import "../styles/ShowMap.scss";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  Marker
} from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function ShowMap() {
  const position = { lat: 52.52, lng: 13.41 }; //Berlin
  const [open, setOpen] = React.useState(false);
  const markers = [
    {
      id: 1,
      name: "Chicago, Illinois",
      position: { lat: 41.881832, lng: -87.623177 }
    },
    {
      id: 2,
      name: "Denver, Colorado",
      position: { lat: 39.739235, lng: -104.99025 }
    },
    {
      id: 3,
      name: "Los Angeles, California",
      position: { lat: 34.052235, lng: -118.243683 }
    },
    {
      id: 4,
      name: "New York, New York",
      position: { lat: 40.712776, lng: -74.005974 }
    }
  ];

  return (
    <APIProvider apiKey={API_KEY}>
      <div id="map">
        {/* <div style={{ height: "80vh", width: "90%" }}> */}
        <Map
          zoom={5}
          center={{lat: 41.881832, lng: -87.623177}}
          gestureHandling={"greedy"}
          disableDefaultUI={false} //trueにすると、ズームのアイコンなどが全て非表示になる
          mapId={import.meta.env.VITE_GOOGLE_MAPS_ID} //To use a marker, map ID is needed
        >
          {/* <Marker position={position} onClick={() => setOpen(true)} /> */}
          {markers.map(( {id, position} ) => (
            <Marker
              key={id}
              position={position}
              onClick={() => handleActiveMarker(id)}
            />))}
          {/* <AdvancedMarker position={position} onClick={() => setOpen(true)}> //AdvancedMarkerだとアイコンをカスタマイズできる
            <Pin
              background={"green"}
              borderColor={"pink"}
              glyphColor={"yellow"}
            ></Pin>
          </AdvancedMarker> */}
          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)} >
              <p style={{ backgroundColor: "yellow" }}>I'm in Berlin!</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
