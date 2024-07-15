import React, { useEffect, useState } from "react";
import "../styles/MapWindow.scss";
import { Map } from "@vis.gl/react-google-maps";
import PlaceMarker from "./PlaceMarker";
import { CafeDetailType, UserProfileType } from "../interfaces/interfaces";
import { db } from "../firebase/BaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthProvider";
// import { PlaceOverview } from '@googlemaps/extended-component-library/react';
// import { PlaceOverview } from '@googlemaps/extended-component-library/place_overview.js';
import '@googlemaps/extended-component-library/place_overview.js';
import {
  PlaceReviews,
  PlaceDataProvider,
  PlaceDirectionsButton,
  IconButton,
  PlaceOverview,
  SplitLayout,
  OverlayLayout,
  PlacePicker
} from '@googlemaps/extended-component-library/react';

export default function MapWindow({ filter }: { filter: string }) {
  const { users } = useAuth();
  const center = { lat: 52.52, lng: 13.41 }; //Berlin
  const [markerPlaceId, setMarkerPlaceId] = useState(null);
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
        return user.learnerORmentor === "learner";
      } else if (filter === "mentor") {
        return user.learnerORmentor === "mentor";
      }
    });
  }

  function filterCafes(cafes: CafeDetailType[], filter: string) {
    if (filter === "all" || filter === "cafes") return cafes
    null;
  }

  return (
    <>
<PlaceOverview place="ChIJN1t_tDeuEmsRUsoyG83frY4">
</PlaceOverview>
{/* <gmpx-place-overview place="ChIJN1t_tDeuEmsRUsoyG83frY4">
</gmpx-place-overview> */}
      <Map
        zoom={12}
        center={center}
        gestureHandling={"greedy"}
        disableDefaultUI={false} //trueにすると、ズームのボタンなどが全て非表示になる
        style={{ minWidth: 800, minHeight: "80vh" }}
        mapId={import.meta.env.VITE_GOOGLE_MAPS_ID} //To use a marker, map ID is needed
      >
        {visibleUsers.map((user) => (
          // return (
            <PlaceMarker
              isOpen={user.id == markerPlaceId}
              setMarkerPlaceId={setMarkerPlaceId}
              key={user.id}
              place_datas={user}
            />
          // );
        ))}
        {visibleCafes?.map((cafe) => (
          // return (
            <PlaceMarker
              isOpen={cafe.id == markerPlaceId}
              setMarkerPlaceId={setMarkerPlaceId}
              key={cafe.id}
              place_datas={cafe}
            />
          // );
        ))}
      </Map>
    </>
  );
}
