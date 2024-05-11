import React, { useState, useEffect, useRef, useCallback } from "react";
import "../styles/MapWindow.scss";
import {
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useApiIsLoaded,
  useAdvancedMarkerRef,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { db } from "../firebase/BaseConfig";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function MapWindow() {
  return (
    // <APIProvider apiKey={API_KEY} libraries={["places"]}>
    <Geocoding />
    // </APIProvider>
  );
}

function PlaceMarker({ user, isOpen, setMarkerPlaceId }) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setMarkerPlaceId(isOpen ? null : user.id)}
        position={user.position}
        key={user.id}
        title={"AdvancedMarker that opens an Infowindow when clicked."}
      >
        <Pin
          background={user.learnerORmentor === "learner" ? "#22ccff" : "yellow"}
          borderColor={"#1e89a1"}
          scale={1.3}
        >
          🧑‍💻
        </Pin>

      {isOpen && (
        <InfoWindow
        // position={user.position}
        anchor={marker}
        maxWidth={200}
        onCloseClick={() => setMarkerPlaceId(null)}
        >
          I'm in {user.name}!
        </InfoWindow>
      )}
      </AdvancedMarker>
    </>
  );
}

function Geocoding() {
  const apiIsLoaded = useApiIsLoaded();
  const [users, setUsers] = useState([]);

  const center = { lat: 52.52, lng: 13.41 }; //Berlin
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [selectPlace, setSelectPlace] = useState({});
  const [markerPlaceId, setMarkerPlaceId] = useState(null);

  //Obtain data from firebase
  React.useEffect(() => {
    // const users = getDocs(collection(db, "users"));
    // users.then((snap) =>
    //   setUsers(snap.docs.map((doc) => ({ ...doc.data() })))
    // );

    //Order by the date
    const postData = collection(db, "users");
    const queryRef = query(postData, orderBy("datetime", "asc"));
    onSnapshot(queryRef, (post) => {
      setUsers(post.docs.map((doc) => ({ ...doc.data() })));
      // setUsers(post.docs.map((doc) => ({ ...doc.data(), position:useGeocoding(doc.data().location) })));
    });

    /* リアルタイムで取得 */
    // onSnapshot(users, (snap) => {
    //   setUsers(snap.docs.map((doc) => ({ ...doc.data() })));
    // });
  }, []);

  function onMarkerClick(marker) {
    console.log(marker);
    setInfowindowOpen(true);
    setSelectPlace(marker);
  }

  // const onClose = () => {
  //   setInfowindowOpen(false)
  //   setSelectPlace(null);
  //   console.log(123)
  // };

  function onClose() {
    setInfowindowOpen(false);
    setSelectPlace(null);
  }

  const handleClose = useCallback(() => setInfowindowOpen(false));

  const sampleMarkers = [
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

  // const [markers, setMarkers] = useState(sampleMarkers);
  // const [markerRef, markerss] = useAdvancedMarkerRef();

  const [openInfoWindows, setOpenInfoWindows] = React.useState({
    lat: 34.055016798964886,
    lng: -118.25501276602215,
  });

  const handleMarkerClick = (id) => {
    setOpenInfoWindows((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <>
      <Map
        zoom={13}
        center={center}
        gestureHandling={"greedy"}
        disableDefaultUI={false} //trueにすると、ズームのボタンなどが全て非表示になる
        style={{ minWidth: 800, minHeight: 800 }}
        mapId={import.meta.env.VITE_GOOGLE_MAPS_ID} //To use a marker, map ID is needed
        // onClick={() => setActiveMarker(null)}
      >
        {users.map((user) => {
          return (
            <PlaceMarker
              isOpen={user.id == markerPlaceId}
              setMarkerPlaceId={setMarkerPlaceId}
              key={user.id}
              user={user}
            />
          );
        })}
      </Map>
    </>
  );
}

// {users.map((user) => (
//   //{markers.map(({ id, name, position }) => (
//   <>
//     <AdvancedMarker
//       key={user.id}
//       // ref={markerRef}
//       // onClick={() => setInfowindowOpen(true)}
//       // onClick={() => onMarkerClick(user)}
//       // onClick={handleMarkerClick}
//       onClick={() => handleMarkerClick(user.id)}
//       position={user.position}
//       title={"AdvancedMarker that opens an Infowindow when clicked."}
//       ref={markerRef}
//     >
//       <Pin
//         background={
//           user.learnerORmentor === "learner" ? "#22ccff" : "yellow"
//         }
//         borderColor={"#1e89a1"}
//         scale={1.3}
//       >
//         🧑‍💻
//       </Pin>
//     </AdvancedMarker>

//     {/* {selectPlace &&  ( */}
//     {/* {infowindowOpen && ( */}
//     {openInfoWindows[user.id] && (
//       <InfoWindow
//         // anchor={markerss}
//         // anchor={user.position}
//         position={user.position}
//         maxWidth={200}
//         // onClose={handleClose}
//         onCloseClick={() => handleMarkerClick(user.id)}
//         // onCloseClick={() => setInfowindowOpen(false)}
//         // onClose={() => setInfowindowOpen(false)}
//       >
//         {/* <InfoWindow
//     position={selectPlace.position}
//     // onCloseClick={()=>onClose()}
//     onCloseClick={() => setInfowindowOpen(false)} // なくても動く
//   > */}
//         I'm in {user.name}!
//       </InfoWindow>
//     )}
//   </>
// ))}
