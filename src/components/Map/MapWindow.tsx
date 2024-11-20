import React, { useEffect, useState } from "react";
import { Map } from "@vis.gl/react-google-maps";
import PlaceMarker, { PlaceMarkerCafe } from "./PlaceMarker";
import { db } from "../../firebase/BaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/AuthProvider";
import { CafeDetailType, UserProfileType } from "../../interfaces/interfaces";
import "../../styles/MapWindow.scss";
import ControlPanel from "./Control-panel";

export default function MapWindow({ filter, setFilter }) {
  const { users } = useAuth();
  const center = { lat: 52.52, lng: 13.41 }; //Berlin
  const [markerID, setMarkerID] = useState(null);
  const [cafes, setCafes] = useState<CafeDetailType[]>([]);
  const visibleUsers = filterUsers(users, filter);
  const visibleCafes = filterCafes(cafes, filter);

  const dataCollectionRef = collection(db, 'cafes')
  useEffect(() => {
    const unsubscribe = onSnapshot(dataCollectionRef, (snapshot) => {
      const newData: CafeDetailType[] = snapshot.docs.map((doc) => doc.data() as CafeDetailType);
      setCafes(newData);
    });
    return () => unsubscribe();
  }, []);

  function filterUsers(users: UserProfileType[], filter: string) {
    return users.filter((user: { learnerORmentor: string; }) => {
      if (filter === "all") {
        return true;
      } else if (filter === "learner") {
        return user.learnerORmentor === "Learner";
      } else if (filter === "mentor") {
        return user.learnerORmentor === "Mentor";
      }
    });
  }

  function filterCafes(cafes: CafeDetailType[], filter: string) {
    if (filter === "all" || filter === "cafes") return cafes
    null;
  }

  return (
    <div className="map">
      <Map
        mapId={import.meta.env.VITE_GOOGLE_MAPS_ID} //To use a marker, map ID is needed
        zoom={12}
        center={center}
        gestureHandling={"greedy"}
        disableDefaultUI //trueにすると、ズームのボタンなどが全て非表示になる
        // style={{ minHeight: "50vh"}}
        // className="map"
        style={{ minWidth: 800, minHeight: "62vh" }}
      >
        {visibleUsers.map((user) => (
          <PlaceMarker
            isOpen={user.uid == markerID}
            setMarkerID={setMarkerID}
            key={user.uid}
            data={user}
          />
        ))}

        {visibleCafes?.map((cafe) => (
          <PlaceMarkerCafe
            isOpen={cafe.place.placeId == markerID}
            setMarkerID={setMarkerID}
            markerID={markerID}
            markerCafePlaceID={cafe.place.placeId}
            key={cafe.place.placeId}
            data={cafe}
          />
        ))}
      </Map>
      <ControlPanel filter={filter} setFilter={setFilter}/>
    </div>
  );
}
