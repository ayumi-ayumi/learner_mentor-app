import React, { useEffect, useState } from "react";
import "../styles/MapWindow.scss";
import { Map } from "@vis.gl/react-google-maps";
import PlaceMarker from "./PlaceMarker";
import { CafeDetailType, UserProfileType } from "../interfaces/interfaces";
import { useUsersData } from "../context/UsersProvider";
import { db } from "../firebase/BaseConfig";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { AuthProvider, useAuth } from "../context/AuthProvider";

export default function MapWindow({ filter }: { filter: string }) {
  const { users } = useAuth();
  const center = { lat: 52.52, lng: 13.41 }; //Berlin
  const [markerPlaceId, setMarkerPlaceId] = useState(null);

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

  const [cafes, setCafes] = useState<CafeDetailType[]>([]);

  //Obtain cafes data from firebase
  // useEffect(() => {
  //   async function fetCafes() {
  //     const q = query(collection(db, "cafes"));
  //     const querySnapshot = await getDocs(q);
  //     const cafesData = querySnapshot.docs.map((doc) => ({
  //       ...(doc.data()),
  //     }));
  //     setCafes(cafesData);
  //   }
  //   fetCafes();
  // }, []);

  const dataCollectionRef = collection(db, 'cafes')
  useEffect(() => {
    // Create a function to handle updates and unsubscribe from the listener when the component unmounts
    const unsubscribe = onSnapshot(dataCollectionRef, (snapshot) => {
      // Process the data from the Firestore snapshot
      const newData: CafeDetailType[] = snapshot.docs.map((doc) => doc.data() as CafeDetailType);
      
      // Update the component state with the new data
      setCafes(newData);
    });
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // The empty dependency array ensures the effect runs only once


  // const visibleUsers = (users: UserProfileType[], filter: string) => {
  //   return users.filter((user: { learnerORmentor: string; }) => {
  //     if (filter === "all") {
  //       return true;
  //     } else if (filter === "learner") {
  //       return user.learnerORmentor === "learner";
  //     } else if (filter === "mentor") {
  //       return user.learnerORmentor === "mentor";
  //     }
  //   });
  // };
  const visibleUsers = filterUsers(users, filter);
  const visibleCafes = filterCafes(cafes, filter);
  // const cafesPlace = (cafes, filter)=> {
  //   return cafes.filter((cafe) => filter === "cafes")}
console.log(visibleUsers)
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
        {visibleUsers.map((user) => {
          return (
            <PlaceMarker
              isOpen={user.id == markerPlaceId}
              setMarkerPlaceId={setMarkerPlaceId}
              key={user.id}
              user={user}
            />
          );
        })}
        {visibleCafes?.map((cafe) => {
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
