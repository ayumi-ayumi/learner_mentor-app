import React, { useState } from "react";
import "../styles/MapWindow.scss";
import { Map } from "@vis.gl/react-google-maps";
import PlaceMarker from "./PlaceMarker";
import { UserProfile } from "../interfaces/interfaces";
import { useUsersData } from "../context/UsersProvider";



export default function MapWindow( {filter}: {filter: string} ) {
  const { users } = useUsersData();
  const center = { lat: 52.52, lng: 13.41 }; //Berlin
  const [markerPlaceId, setMarkerPlaceId] = useState(null);
  
  // console.log(users)

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

  const VisibleUsers = filterTodos(users, filter);

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
      </Map>
    </>
  );
}
