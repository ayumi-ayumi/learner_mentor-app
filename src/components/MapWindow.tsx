import React, { useEffect, useState } from "react";
import "../styles/MapWindow.scss";
import { Map } from "@vis.gl/react-google-maps";
import PlaceMarker from "./PlaceMarker";
import { UserProfile } from "../interfaces/interfaces";
import { useUsersData } from "../context/UsersProvider";
import { db } from "../firebase/BaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

export default function MapWindow( {filter}: {filter: string} ) {
  const { users } = useUsersData();
  const center = { lat: 52.52, lng: 13.41 }; //Berlin
  const [markerPlaceId, setMarkerPlaceId] = useState(null);
  
  function filterTodos(users:UserProfile[], filter: string) {
    return users.filter((user: { learnerORmentor: string; }) => {
      if (filter === "all") {
        return true;
      } else if (filter === "learner") {
        return user.learnerORmentor === "learner";
      } else if (filter === "mentor") {
        return user.learnerORmentor === "mentor";
      }
    });
  }


  const [cafes, setCafes] = useState([]);

  //Obtain cafes data from firebase
  useEffect(() => {
    async function fetCafes() {
      const q = query(collection(db, "cafes"));
      const querySnapshot = await getDocs(q);
      const cafesData = querySnapshot.docs.map((doc) => ({
        ...(doc.data()),
      }));
      setCafes(cafesData);
    }
    fetCafes();
  }, []);


  const VisibleUsers = filterTodos(users, filter);
  // const cafesPlace = (cafes, filter)=> {
  //   return cafes.filter((cafe) => filter === "cafes")}

  return (
    <>
      <Map
        zoom={12}
        center={center}
        gestureHandling={"greedy"}
        disableDefaultUI={false} //trueにすると、ズームのボタンなどが全て非表示になる
        style={{ minWidth: 800, minHeight: "80vh" }}
        mapId={import.meta.env.VITE_GOOGLE_MAPS_ID} //To use a marker, map ID is needed
      >
        {VisibleUsers.map((user:UserProfile) => {
          return (
            <PlaceMarker
              isOpen={user.id == markerPlaceId}
              setMarkerPlaceId={setMarkerPlaceId}
              key={user.id}
              user={user}
            />
          );
        })}
        {cafes.map((cafe) => {
          return (
            <PlaceMarker
              isOpen={cafe.id == markerPlaceId}
              setMarkerPlaceId={setMarkerPlaceId}
              key={cafe.id}
              user={cafe}
            />
          );
        })}
      </Map>
    </>
  );
}
