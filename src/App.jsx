// import React from "react";
// import { createRoot } from "react-dom/client";
// import { APIProvider, Map } from "@vis.gl/react-google-maps";

// const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
// export default function App() {

//   <APIProvider apiKey={API_KEY}>
//     <Map
//       zoom={3}
//       center={{ lat: 22.54992, lng: 0 }}
//       gestureHandling={"greedy"}
//       disableDefaultUI={true}
//     />
//   </APIProvider>;
// }

import React from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function App() {
  const position = { lat: 52.52,  lng: 13.41 };
  // 52.52437, 13.41053.
  const [open, setOpen] = React.useState(false);
  return (
    <APIProvider apiKey={API_KEY}>
      <div style={{ height: "100vh", width: "100%" }}>
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
            <InfoWindow position={position} onCloseClick={()=>setOpen(false)}>
              <p>I'm in Berlin!</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
