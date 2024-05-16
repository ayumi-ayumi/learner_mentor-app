import React, { useState, useEffect, useRef, useCallback } from "react";
import "../styles/MapWindow.scss";
import { Map } from "@vis.gl/react-google-maps";
import { collection, getDocs } from "firebase/firestore";
import PlaceMarker from "./PlaceMarker";

export default function MapWindow( {users} ) {
  // const [users, setUsers] = useState([]);

  const center = { lat: 52.52, lng: 13.41 }; //Berlin
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [selectPlace, setSelectPlace] = useState({});
  const [markerPlaceId, setMarkerPlaceId] = useState(null);

  //Obtain data from firebase
  // useEffect(() => {
  //   const users = getDocs(collection(db, "users"));
  //   users.then((snap) => setUsers(snap.docs.map((doc) => ({ ...doc.data() }))));
  // }, []);

  // function onMarkerClick(marker) {
  //   setInfowindowOpen(true);
  //   setSelectPlace(marker);
  // }

  // const onClose = () => {
  //   setInfowindowOpen(false)
  //   setSelectPlace(null);
  //   console.log(123)
  // };

  // function onClose() {
  //   setInfowindowOpen(false);
  //   setSelectPlace(null);
  // }

  // const handleClose = useCallback(() => setInfowindowOpen(false));

  const [openInfoWindows, setOpenInfoWindows] = useState({
    lat: 34.055016798964886,
    lng: -118.25501276602215,
  });

  // const handleMarkerClick = (id) => {
  //   setOpenInfoWindows((prevState) => ({
  //     ...prevState,
  //     [id]: !prevState[id],
  //   }));
  // };

  return (
    <>
      <Map
        zoom={12}
        center={center}
        gestureHandling={"greedy"}
        disableDefaultUI={false} //trueにすると、ズームのボタンなどが全て非表示になる
        style={{ minWidth: 800, minHeight: "80vh" }}
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
