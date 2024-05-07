import React, { useState, useEffect, useRef } from "react";
import "../styles/MapWindow.scss";
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
  useAutocomplete,
  useAdvancedMarkerRef,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { db } from "../firebase/BaseConfig";
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
  updateDoc,
} from "firebase/firestore";
import { useGeocoding } from "./hooks/useGeocoding";
// import Geocoding from "./Geocoding";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function MapWindow() {
  return (
    // <APIProvider apiKey={API_KEY} libraries={["places"]}>
    <Geocoding />
    // </APIProvider>
  );
}

function Geocoding() {
  const apiIsLoaded = useApiIsLoaded();
  const [users, setUsers] = useState([]);

  const center = { lat: 52.52, lng: 13.41 }; //Berlin
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  // const [selected, setSelected] = useState({});
  const [selectPlace, setSelectPlace] = useState({});
  // const [geo, setGeo] = useState([]);
  // const [loc, setLoc] = useState([]);
  const [arr, setArr] = useState([]);

  const geocodingLibrary = useMapsLibrary("geocoding");
  const [geocodingService, setGeocodingService] = useState();
  // const [geocodingResult, setGeocodingResult] = useState();
  const [address, setAddresses] = useState("Berlin");
  const [lat, setLat] = useState([]);
  const [lng, setLng] = useState();
  const [latLng, setLatLng] = useState([]);

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

  // useEffect(() => {
  //   const newArr = users.map((user) => {
  //     return user.location;
  //   });
  //   setArr(newArr);
  // }, [users]);

  // useEffect(() => {
  //   if (!geocodingLibrary) return;
  //   setGeocodingService(new window.google.maps.Geocoder());
  // }, [geocodingLibrary]);
  // console.log(apiIsLoaded, geocodingLibrary, geocodingService)

  // if (geocodingService) {
  //   geocodingService.geocode({ address: "berlin" }, (results, status) => {
  //     if (results && status === "OK") {
  //       // const a = results[0].geometry.location.lat()
  //       // return results[0].geometry.location.lat()
  //       // return {lat:results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
  //       setLatLng({
  //         lat: results[0].geometry.location.lat(),
  //         lng: results[0].geometry.location.lng(),
  //       });
  //       // return a
  //     }
  //   });
  // }

  // const [newarrr, setNewarrr] = useState([]);
  // useEffect(() => {
  //   // if(geocodingService){
  //   const a = arr.map((item) => {
  //     geocodingService.geocode({ address: item }, (results, status) => {
  //       if (results && status === "OK") {
  //         // setLatLng({
  //         //   lat: results[0].geometry.location.lat(),
  //         //   lng: results[0].geometry.location.lng(),
  //         // });
  //         // return {lat:results[0].geometry.location.lat()}
  //         const lat = results[0].geometry.location.lat()
  //         const lng = results[0].geometry.location.lng()
  //         // console.log({lat:results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()})
  //         // return {lat:results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
  //         console.log(lat, lng)
  //         return {lat, lng}
  //       }
  //     });
  //   });
  //   console.log(a)
  //   setNewarrr([...newarrr, a]);
  //   // }
  // }, [geocodingLibrary]);

  // console.log(newarrr);
  // useEffect(() => {
  //   if(geocodingService)
  //   geocodingService.geocode({address: "berlin"}, (results, status) => {
  //     if (results && status === "OK") {
  //     setLatLng({lat:results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()})
  //     }})
  // }, [geocodingService])

  // }
  // useEffect(()=>{
  // console.log(arr)

  // }, [geocodingLibrary])
  // function geo (loc) {
  //   if (!geocodingService || !arr) return;
  //     let a = 0;
  //     if(geocodingService){
  //       geocodingService.geocode({ address:loc },  (results, status) => {
  //        if (results && status === "OK") {
  //                // console.log({lat:results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()})
  //                 // a = {lat:results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
  //                 a = results[0].geometry.location.lat()
  //                 // a=345
  //                 // console.log(a)
  //                //  return results[0].geometry.location.lat()
  //                // return ({lat:results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()})
  //                // return console.log(a)
  //               }
  //             });

  //           }
  //           return a
  // }

  // // console.log(arr)
  // useEffect(()=>{

  //     const newLocArr = arr.map(loc=>{
  //       geocodingService.geocode({address: loc}, (results, status) => {
  //             if (results && status === "OK") {
  //               console.log({lat:results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()})
  //               // a = {lat:results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}

  //               // setLatLng([...latLng, {lat:results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}])}
  //             }
  //           })
  //     })
  //     console.log(newLocArr)
  //     setLatLng(newLocArr)
  //   }, [geocodingService, arr])
  // useEffect(()=>{
  //     if (!geocodingService || !arr) return;
  //     geocodingService.geocode({ address }, (results, status) => {
  //           if (results && status === "OK") {
  //             setLatLng([...latLng, {lat:results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}])
  //           }
  //         })
  //   }, [geocodingService, arr])
  // console.log(latLng)

  // console.log(users)
  // const berlinLoc = useGeocoding(users)
  // console.log(berlinLoc)
  // // // const {lat, lng} = useGeocoding()
  // console.log(useGeocoding("10 Front St, Toronto"))

  // function getLoc(value) {
  //   setGeo(value);
  // }

  // let berlinLoc;
  // if (apiIsLoaded) {
  //   berlinLoc = useGeocoding("Berlin");
  //   return berlinLoc;
  // }
  // console.log(berlinLoc)

  // useEffect(() => {
  //   console.log("before")
  //   {<Geocoding getLoc={getLoc} />}
  //   console.log("after")
  // },[users])
  // console.log(geo)

  // const locArr = useGeocoding(a)
  // console.log(locArr)

  function onMarkerClick(marker) {
    setInfowindowOpen(true);
    setSelectPlace(marker);
  }

  // const [activeMarker, setActiveMarker] = React.useState(null);
  // const handleActiveMarker = (marker) => {
  //   if (marker === activeMarker) {
  //     return;
  //   }
  //   setActiveMarker(marker); //id:3
  // };

  // console.log(arr)

  // const onClose = () => {
  //   setInfowindowOpen(false)
  //   setSelectPlace(null);
  //   console.log(123)
  // };

  function onClose() {
    setInfowindowOpen(false);
    setSelectPlace(null);
    console.log(123);
  }

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

  // const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [markerPoint, setMarkerPoint] = useState();

  // function getMapData(location) {
  //   try {
  //     setIsLoading(true);
  //     const geocoder = new window.google.maps.Geocoder();
  //     geocoder.geocode({ address: location }, async (results, status) => {
  //       if (status === "OK" && results) {
  //         // const a = results[0].address_components
  //         // console.log(a)

  //         // for (let i = 0; i < a.length; i++) {
  //         //   if(a[i].types[0] === "postal_code") {
  //         //     console.log(a[i].types[0])
  //         //   }
  //         // }

  //         const locationPosition = {
  //           lat: results[0].geometry.location.lat(),
  //           lng: results[0].geometry.location.lng(),
  //         };
  //         console.log(locationPosition)
  //         return locationPosition

  //         // setMarkerPoint(locationPosition);
  //         // setMarkers([
  //         //   ...markers,
  //         //   {
  //         //     id: markers.length + 1,
  //         //     name: location,
  //         //     position: {
  //         //       lat: locationPosition.lat,
  //         //       lng: locationPosition.lng,
  //         //     },
  //         //   },
  //         // ]);
  //         // setSearchWord("");
  //       }
  //     });

  //     setIsLoading(false);
  //   } catch (error) {
  //     alert("検索処理でエラーが発生しました！");
  //     setIsLoading(false);
  //     throw error;
  //   }
  // }

  //Catch the location data from firebase, make into the array.
  const [usersLocation, setUsersLocation] = useState([]); //Array of zipcode

  // const result = words.filter((word) => word.length > 6);
  // const a = users.filter(user => user.location)
  // console.log(users)

  // const bb = aa.map(a => {
  //   return useGeocoding(a)
  // })
  // console.log(bb)

  // console.log(locationFromAddProfile)
  // let locationFromAddProfile
  // const [locationFromAddProfile, setLocationFromAddProfile] = useState()
  // useEffect(()=>{
  //   const a = users.map((user) => {
  //     if (!user.location) {
  //       return { ...user, position: null };
  //     } else {
  //       return {
  //         ...user,
  //         // postion: ()=>{getMapData(user.location)}
  //         position: useGeocoding(user.location)
  //       };
  //     }
  //   });
  //   setLocationFromAddProfile(a)

  // }, [users])
  // const locationFromAddProfile = users.map((user) => {
  //   if (user.location) {
  //     return useGeocoding(user.location)
  //     // return console.log(useGeocoding(user.location))
  //     // return {
  //     //   ...user,
  //     //   postion: ()=>{useGeocoding(user.location)}
  //     //   // postion: ()=>{getMapData(user.location)}
  //     //   // postion: 123
  //     // };
  //   } else {
  //     return { ...user, position: null };
  //   }
  // });
  // console.log(locationFromAddProfile)

  const [markers, setMarkers] = useState(sampleMarkers);

  // const onPlaceChanged = (place) => {
  //   if (place) {
  //     setInputValue(place.formatted_address || place.name);
  //   }

  //   // Keep focus on input element
  //   inputRef.current && inputRef.current.focus();
  // };

  // useAutocomplete({
  //   inputField: inputRef && inputRef.current,
  //   onPlaceChanged,
  // });
  // const inputRef = useRef(null);
  // const [inputValue, setInputValue] = useState('');

  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  // };

  // console.log(inputValue)

  // const [data, setData] = useState();

  // const onPlaceChanged = (place) => {
  //   if (place) {
  //     setInputValue(place.formatted_address || place.name);
  //   }

  //   // Keep focus on input element
  //   inputRef.current && inputRef.current.focus();
  // };

  // const autocompleteInstance = useAutocomplete({
  //   inputField: inputRef && inputRef.current,
  //   onPlaceChanged,
  // });

  // useEffect(() => {
  //   if (autocompleteInstance?.getPlace()) {
  //     const { formatted_address, name } = autocompleteInstance.getPlace();
  //     console.log(123)

  //     setData((prev) => {
  //       return {
  //         ...prev,
  //         place: formatted_address || name,
  //       };
  //     });
  //   }
  // }, [inputValue]);

  // const [isLoading, setIsLoading] = useState(false);
  // const [searchWord, setSearchWord] = useState("");
  // const [markerPoint, setMarkerPoint] = useState();

  // const [markerPoint, setMarkerPoint] = useState(center);
  // const [markerPoint, setMarkerPoint] = useState({key: "apple", lat:0, lng:0});
  // const [markerPoint, setMarkerPoint] = useState(center);
  // console.log(center)
  // const locArr = useGeocoding(arr)
  // console.log(locArr)
  // const [markerRef, marker] = useAdvancedMarkerRef();
  // console.log(markerRef, marker)
  return (
    <>
      {/* <div>
        {users.map((user) => (
          <div key={user.id}>
            {user.position_vague.lat} {user.position_vague.lng}
          </div>
        ))}
      </div> */}
      <Map
        zoom={11}
        center={center}
        gestureHandling={"greedy"}
        disableDefaultUI={false} //trueにすると、ズームのボタンなどが全て非表示になる
        style={{ minWidth: 500, minHeight: 500 }}
        mapId={import.meta.env.VITE_GOOGLE_MAPS_ID} //To use a marker, map ID is needed
        // onClick={() => setActiveMarker(null)}
      >
        {users.map((user) => (
          //{markers.map(({ id, name, position }) => (
          <AdvancedMarker
            key={user.id}
            // ref={markerRef}
            // onClick={() => setInfowindowOpen(true)}
            onClick={() => onMarkerClick(user)}
            position={user.position}
            title={"AdvancedMarker that opens an Infowindow when clicked."}
          >
            <Pin background={"#22ccff"} borderColor={"#1e89a1"} scale={1}>
              👩‍💻
            </Pin>
          </AdvancedMarker>
          // <AdvancedMarker
          //   key={user.id}
          //   // position = {useGeocoding('Berlin')}
          //   position={user.position}
          //   // onClick={() => setInfowindowOpen(true)}
          //   onClick={() => onMarkerClick(user)}

          // />
        ))}

        {/* {selectPlace &&  ( */}
        {infowindowOpen && (
          <InfoWindow
            // anchor={marker}
            position={selectPlace.position}
            maxWidth={200}
            onCloseClick={() => setInfowindowOpen(false)}
          >
            {/* <InfoWindow
            position={selectPlace.position}
            // onCloseClick={()=>onClose()}
            onCloseClick={() => setInfowindowOpen(false)} // なくても動く
          > */}
            I'm in {selectPlace.name}!
            {/* <p style={{ backgroundColor: "yellow" }}>
              I'm ! I'm in {selectPlace.name}!
            </p> */}
          </InfoWindow>
        )}
      </Map>
      {/* <input ref={inputRef} value={inputValue} onChange={handleInputChange} /> */}
      {/* <button
            type="button"
            onClick={() => getMapData("Gropiusstr.6")}
            // onClick={ abc }
            // onClick={() => abc() }
          >
            検索
          </button> */}
      {/* <div className="searchBox-container">
          <input
            type="text"
            style={{ width: "100%" }}
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
          ></input>
          <button
            type="button"
            onClick={() => getMapData()}
            // onClick={ abc }
            // onClick={() => abc() }
          >
            検索
          </button>
        </div> */}
    </>
  );
}
