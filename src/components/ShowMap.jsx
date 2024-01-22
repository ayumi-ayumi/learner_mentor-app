import React, { useState } from "react";
import "../styles/ShowMap.scss";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  Marker,
} from "@vis.gl/react-google-maps";
import { v4 as uuidv4 } from "uuid";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function ShowMap() {
  // const position = { lat: 52.52, lng: 13.41 }; //Berlin
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});

  // const onSeletc = () => {
  // // const onSeletc = item => {
  //   setOpen(true)
  //   console.log(123)
  //   // setSelected(item);
  // }
  
  function onSelect (marker) {
    setOpen(true)
    console.log(123)
    setSelected(marker)

  }

  const [activeMarker, setActiveMarker] = React.useState(null);
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker); //id:3
  };

  const [selectPlace, setSelectPlace] = useState(null);

  const onMarkerClick = (marker) => {
    setSelectPlace(marker);
    setOpen(true);
  };

  const onClose = () => {
    setSelectPlace(null);
  };

  const markers = [
    {
      id: 1,
      name: "Treptower Park",
      position: { lat: 52.488449, lng: 13.469631 },
    },
    {
      id: 2,
      name: "Tempelhofer Feld ",
      position: { lat: 52.474926, lng: 13.400312 },
    },
    {
      id: 3,
      name: "Alexanderplatz",
      position: { lat: 52.521992, lng: 13.413244 },
    },
    {
      id: 4,
      name: "Tegel airport",
      position: { lat: 52.554803, lng: 13.28903 },
    },
  ];

  return (
    <APIProvider apiKey={API_KEY}>
      <div id="map">
        <Map
          zoom={11}
          center={{ lat: 52.52, lng: 13.41 }}
          gestureHandling={"greedy"}
          // disableDefaultUI={false} //trueにすると、ズームのボタンなどが全て非表示になる
          mapId={import.meta.env.VITE_GOOGLE_MAPS_ID} //To use a marker, map ID is needed
          // onClick={() => setActiveMarker(null)}
        >
        {/* <Marker
              key={markers[0].id}
              // key={markers[0].id}
              position={markers[0].position}
              // onClick={()=>onSeletc()}
              // onClick={() => console.log(123)}
              onClick={() => onSeletc(markers[0])}
              // onClick={() => setSelected(markers[0])}
              // onClick={() => handleActiveMarker(id)}

              // onClick={() => handleActiveMarker(id)}
              // onClick={() => onMarkerClick(marker)}
            />
        <Marker
              key={markers[1].id}
              // key={markers[1].id}
              position={markers[1].position}
              // onClick={() => console.log(id)}
              onClick={() => onSeletc(markers[1])}
              // onClick={() => setSelected(markers[1])}
              // onClick={() => handleActiveMarker(id)}

              // onClick={() => handleActiveMarker(id)}
              // onClick={() => onMarkerClick(marker)}
            />
        <Marker
              key={markers[2].id}
              // key={markers[2].id}
              position={markers[2].position}
              // onClick={() => console.log(id)}
              onClick={() => onSeletc(markers[2])}
              // onClick={() => setSelected(markers[2])}
              // onClick={() => handleActiveMarker(id)}

              // onClick={() => handleActiveMarker(id)}
              // onClick={() => onMarkerClick(marker)}
            />
        <Marker
              key={markers[3].id}
              // key={markers[3].id}
              position={markers[3].position}
              // onClick={() => console.log(id)}
              onClick={() => onSeletc(markers[3])}
              // onClick={() => setSelected(markers[3])}
              // onClick={() => handleActiveMarker(id)}

              // onClick={() => handleActiveMarker(id)}
              // onClick={() => onMarkerClick(marker)}
            /> */}
          {markers.map((marker) => (
            //{markers.map(({ id, name, position }) => (
            <Marker
              key={marker.id}
              position={marker.position}
              // onClick={() => console.log(id)}
              // onClick={() => setOpen(true)}
              onClick={() => onSelect(marker)}
              // onClick={() => handleActiveMarker(id)}

              // onClick={() => handleActiveMarker(id)}
              // onClick={() => onMarkerClick(marker)}
            />
          ))}

              {/* {selected &&  ( */}
              {open &&  (
                <InfoWindow
                  position={selected.position}
                  onCloseClick={() => setOpen(false)}
                >
                  <p style={{ backgroundColor: "yellow" }}>
                    I'm !
                    I'm in {selected.name}!
                  </p>
                </InfoWindow>
              ) }

          {/* {open && (
          //{selectPlace && (
            <InfoWindow
              position={selectPlace.position}
              // onCloseClick={onClose}
              onCloseClick={() => onClose()}
              onCloseClick={() => setOpen(false)}
            >
              <p style={{ backgroundColor: "yellow" }}>
                I'm in {selectPlace.name}!
              </p>
            </InfoWindow>
          )} */}
        </Map>
      </div>
    </APIProvider>
  );

// 2nd
// import React, { useState } from "react";
// import "../styles/ShowMap.scss";
// import {
//   APIProvider,
//   Map,
//   AdvancedMarker,
//   Pin,
//   InfoWindow,
//   Marker,
// } from "@vis.gl/react-google-maps";
// // import { v4 as uuidv4 } from "uuid";

// const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// export default function ShowMap() {
//   // const position = { lat: 52.52, lng: 13.41 }; //Berlin
//   const [open, setOpen] = useState(false);
//   const [selected, setSelected] = useState({});

//   // const onSelect = item => {
//   //   setSelected(item);
//   // }

//   const [activeMarker, setActiveMarker] = React.useState(null);
//   const handleActiveMarker = (marker) => {
//     if (marker === activeMarker) {
//       return;
//     }
//     setActiveMarker(marker); //id:3
//   };

//   const [selectPlace, setSelectPlace] = useState(null);

//   const onMarkerClick = (marker) => {
//     setSelectPlace(marker);
//     setOpen(true);
//   };

//   const onClose = () => {
//     setSelectPlace(null);
//   };

//   const markers = [
//     {
//       id: 1,
//       name: "Treptower Park",
//       position: { lat: 52.488449, lng: 13.469631 },
//     },
//     {
//       id: 2,
//       name: "Tempelhofer Feld ",
//       position: { lat: 52.474926, lng: 13.400312 },
//     },
//     {
//       id: 3,
//       name: "Alexanderplatz",
//       position: { lat: 52.521992, lng: 13.413244 },
//     },
//     {
//       id: 4,
//       name: "Tegel airport",
//       position: { lat: 52.554803, lng: 13.28903 },
//     },
//   ];

//   return (
//     <APIProvider apiKey={API_KEY}>
//       <div id="map">
//         <Map
//           zoom={11}
//           center={{ lat: 52.52, lng: 13.41 }}
//           gestureHandling={"greedy"}
//           disableDefaultUI={false} //trueにすると、ズームのボタンなどが全て非表示になる
//           mapId={import.meta.env.VITE_GOOGLE_MAPS_ID} //To use a marker, map ID is needed
//           onClick={() => setActiveMarker(null)}
//         >
//           {markers.map((marker) => (
//             //{markers.map(({ id, name, position }) => (
//             <Marker
//               key={crypto.randomUUID()}
//               position={marker.position}
//               // onClick={() => console.log(id)}
//               // onClick={() => setOpen(true)}
//               onClick={() => setSelected(marker)}
//               // onClick={() => handleActiveMarker(id)}

//               // onClick={() => handleActiveMarker(id)}
//               // onClick={() => onMarkerClick(marker)}
//             />
//           ))}
//               {selected &&  (
//                 <InfoWindow
//                   position={selected.position}
//                   onCloseClick={() => setSelected(null)}
//                 >
//                   <p style={{ backgroundColor: "yellow" }}>
//                     I'm in {selected.name}!
//                   </p>
//                 </InfoWindow>
//               ) }

//           {/* {open && (
//           //{selectPlace && (
//             <InfoWindow
//               position={selectPlace.position}
//               // onCloseClick={onClose}
//               onCloseClick={() => onClose()}
//               onCloseClick={() => setOpen(false)}
//             >
//               <p style={{ backgroundColor: "yellow" }}>
//                 I'm in {selectPlace.name}!
//               </p>
//             </InfoWindow>
//           )} */}
//         </Map>
//       </div>
//     </APIProvider>
//   );



  //Original
  // return (
  //   <APIProvider apiKey={API_KEY}>
  //     <div id="map">
  //       {/* <div style={{ height: "80vh", width: "90%" }}> */}
  //       <Map
  //         zoom={11}
  //         center={{lat: 52.52, lng: 13.41}}
  //         gestureHandling={"greedy"}
  //         disableDefaultUI={false} //trueにすると、ズームのボタンなどが全て非表示になる
  //         mapId={import.meta.env.VITE_GOOGLE_MAPS_ID} //To use a marker, map ID is needed
  //       >
  //         <Marker onClick={() => setOpen(true)} />
  //         {markers.map(( {id, position} ) => (
  //           <Marker
  //             key={id}
  //             position={position}
  //             // onClick={() => handleActiveMarker(id)}
  //           />))}
  //         {/* <AdvancedMarker position={position} onClick={() => setOpen(true)}> //AdvancedMarkerだとアイコンをカスタマイズできる
  //           <Pin
  //             background={"green"}
  //             borderColor={"pink"}
  //             glyphColor={"yellow"}
  //           ></Pin>
  //         </AdvancedMarker> */}
  //         {open && (
  //           <InfoWindow position={position} onCloseClick={() => setOpen(false)} >
  //             <p style={{ backgroundColor: "yellow" }}>I'm in Berlin!</p>
  //           </InfoWindow>
  //         )}
  //       </Map>
  //     </div>
  //   </APIProvider>
  // );
}
