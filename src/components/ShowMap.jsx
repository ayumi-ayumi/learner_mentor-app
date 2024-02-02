import React, { useState, useEffect } from "react";
import "../styles/ShowMap.scss";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  Marker,
  useApiIsLoaded,
  APILoadingStatus,
  useApiLoadingStatus,
} from "@vis.gl/react-google-maps";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  query,
  orderBy,
} from "firebase/firestore";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function ShowMap() {
  const [users, setUsers] = useState([]);

  // const position = { lat: 52.52, lng: 13.41 }; //Berlin
  const [open, setOpen] = useState(false);
  // const [selected, setSelected] = useState({});
  const [selectPlace, setSelectPlace] = useState({});

  function onMarkerClick(marker) {
    setOpen(true);
    setSelectPlace(marker);
  }

  // const [activeMarker, setActiveMarker] = React.useState(null);
  // const handleActiveMarker = (marker) => {
  //   if (marker === activeMarker) {
  //     return;
  //   }
  //   setActiveMarker(marker); //id:3
  // };

  //Obtain data from firebase
  React.useEffect(() => {
    // const users = getDocs(collection(db, "users"));
    // users.then((snap) =>
    //   setUsers(snap.docs.map((doc) => ({ ...doc.data() })))
    // );
    
    //Order by the date 
    const postData = collection(db,"users");
    const queryRef = query(postData,orderBy("datetime","asc"));
    onSnapshot(queryRef,(post)=>{
      setUsers(post.docs.map((doc)=>({...doc.data()})))
    });

    /* リアルタイムで取得 */
    // onSnapshot(users, (snap) => {
      //   setUsers(snap.docs.map((doc) => ({ ...doc.data() })));
      // });
    }, []);
    console.log(users)

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
      <div>
        {users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
      <div id="map">
        <Map
          zoom={11}
          center={{ lat: 52.52, lng: 13.41 }}
          gestureHandling={"greedy"}
          disableDefaultUI={false} //trueにすると、ズームのボタンなどが全て非表示になる
          // mapId={import.meta.env.VITE_GOOGLE_MAPS_ID} //To use a marker, map ID is needed
          // onClick={() => setActiveMarker(null)}
        >
          {markers.map((marker) => (
            //{markers.map(({ id, name, position }) => (
            <Marker
              key={marker.id}
              position={marker.position}
              // onClick={() => setOpen(true)}
              onClick={() => onMarkerClick(marker)}
            />
          ))}

          {/* {selectPlace &&  ( */}
          {open && (
            <InfoWindow
              position={selectPlace.position}
              onCloseClick={() => setOpen(false)} // なくても動く
            >
              <p style={{ backgroundColor: "yellow" }}>
                I'm ! I'm in {selectPlace.name}!
              </p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
