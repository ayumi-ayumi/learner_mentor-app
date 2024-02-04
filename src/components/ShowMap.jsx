import React, { useState, useEffect, useRef } from "react";
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
  useAutocomplete,
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

  const center = { lat: 52.52, lng: 13.41 }; //Berlin
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
    const postData = collection(db, "users");
    const queryRef = query(postData, orderBy("datetime", "asc"));
    onSnapshot(queryRef, (post) => {
      setUsers(post.docs.map((doc) => ({ ...doc.data() })));
    });

    /* リアルタイムで取得 */
    // onSnapshot(users, (snap) => {
    //   setUsers(snap.docs.map((doc) => ({ ...doc.data() })));
    // });
  }, []);

  const onClose = () => {
    setSelectPlace(null);
  };

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
  const [markers, setMarkers] = useState(sampleMarkers)
  // console.log(markers)
  // setMarkers([...markers, {
  //   id: 1,
  //   name: "Treptower Park",
  //   position: { lat: 52.488449, lng: 13.469631 },
  // }])
  // setFruits([...fruits, 'ドリアン'])


  // const inputRef = useRef(null);
  // const [inputValue, setInputValue] = useState("");

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

  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  // };

  // console.log(inputValue)

  // const inputRef = useRef(null);
  // const [inputValue, setInputValue] = useState('');
  // const [data, setData] = useState();

  // const onPlaceChanged = () => {
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

  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  // };
  // console.log(autocompleteInstance)

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

  
  const [isLoading, setIsLoading] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [markerPoint, setMarkerPoint] = useState();
  // const [markerPoint, setMarkerPoint] = useState(center);
  // const [markerPoint, setMarkerPoint] = useState({key: "apple", lat:0, lng:0});
  // const [markerPoint, setMarkerPoint] = useState(center);
  // console.log(center)
  
  // function abc() {
  //   const new_count = markerPoint + 1;
  //   setMarkerPoint(new_count)
  //   console.log(new_count)
  // }
  // function getMapData() {
  //     // setIsLoading(true);
  //     // geocoderオブジェクトの取得
  //     setMarkerPoint("apple")
  //     console.log(markerPoint)
  //     const geocoder = new window.google.maps.Geocoder();
  //     let getLat = 0;
  //     let getLng = 0;
  //     // 検索キーワードを使ってGeocodeでの位置検索
  //     geocoder.geocode({ address: searchWord }, async (results, status) => {
  //       if (status === 'OK' && results) {
  //         // console.log(results)
  //         // getLat = results[0].geometry.location.lat();
  //         // getLng = results[0].geometry.location.lng();
  //         // const center = {
  //         //       lat: results[0].geometry.location.lat(),
  //         //       lng: results[0].geometry.location.lng()
  //         //     };
  //           //   setMarkerPoint(center); // ここで検索対象の緯度軽度にマーカーの位置を変更
  //           //   // setMarkerPoint({lat: getLat, lng: getLng}); // ここで検索対象の緯度軽度にマーカーの位置を変更
            
  //           const searchWordPosition = {
  //             lat: results[0].geometry.location.lat(),
  //             lng: results[0].geometry.location.lng()
  //           };
            
  //           console.log(searchWordPosition)
  //           // setMarkerPoint({...markerPoint, lat: 52.6117109,})
  //           // const searchWordPosition = {
  //           //   lat: results[0].geometry.location.lat(),
  //           //   lng: results[0].geometry.location.lng()
  //           // };

  //           // console.log(getLat, getLng)
  //           // console.log(searchWord)
  //           // console.log(searchWordPosition)
  //           // console.log(markerPoint)
  //           // setMarkerPoint("banana");
  //           // console.log(markerPoint)
            
  //         // setPerson({
  //         //   ...person, // Copy the old fields
  //         //   firstName: e.target.value // But override this one
  //         // });

  //           // getNearFood(getLat, getLng);
  //           // setMarkers([...markers, {id: markers.length + 1, name: searchWord,  position: { lat: markerPoint.lat, lng: markerPoint.lng },}])
  //           setSearchWord("")
  //           console.log(markers)
  //         }
        
  //     });

  //     setIsLoading(false);
  // }

  function getMapData() {
    try {
      setIsLoading(true);
      // geocoderオブジェクトの取得
      const geocoder = new window.google.maps.Geocoder();
      // let getLat = 0;
      // let getLng = 0;
      // 検索キーワードを使ってGeocodeでの位置検索
      geocoder.geocode({ address: searchWord }, async (results, status) => {
        if (status === 'OK' && results) {
          // getLat = results[0].geometry.location.lat();
          // getLng = results[0].geometry.location.lng();
          // const center = {
          //       lat: results[0].geometry.location.lat(),
          //       lng: results[0].geometry.location.lng()
          //     };
            //   setMarkerPoint(center); // ここで検索対象の緯度軽度にマーカーの位置を変更
            //   // setMarkerPoint({lat: getLat, lng: getLng}); // ここで検索対象の緯度軽度にマーカーの位置を変更
            
            const searchWordPosition = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            };
            
            // setMarkerPoint({...markerPoint, lat: 52.6117109,})
            setMarkerPoint(searchWordPosition)
            setMarkers([...markers, {id: markers.length + 1, name: searchWord,  position: { lat: searchWordPosition.lat, lng: searchWordPosition.lng },}])
            // const searchWordPosition = {
            //   lat: results[0].geometry.location.lat(),
            //   lng: results[0].geometry.location.lng()
            // };

            // console.log(getLat, getLng)
            // console.log(searchWord)
            // console.log(searchWordPosition)
            // console.log(markerPoint)
            // setMarkerPoint("banana");
            // console.log(markerPoint)
            
          // setPerson({
          //   ...person, // Copy the old fields
          //   firstName: e.target.value // But override this one
          // });

            // getNearFood(getLat, getLng);
            setSearchWord("")
          }
        
      });

      setIsLoading(false);
    } catch (error) {
      alert('検索処理でエラーが発生しました！');
      setIsLoading(false);
      throw error;
    }
  }
  console.log(markers)


  return (
    <APIProvider apiKey={API_KEY} libraries={['places']}>
      {/* <div>
        {users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div> */}
      <div id="map">
        <Map
          zoom={11}
          center={center}
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
        {/* <input ref={inputRef} value={inputValue} onChange={handleInputChange} /> */}
          <input type="text"  style={{ width: '100%' }} onChange={(e) => { setSearchWord(e.target.value) }}></input>
          <button
            type="button"
            onClick={() => getMapData() }
            // onClick={ abc }
            // onClick={() => abc() }
          >
            検索
          </button>
      </div>
    </APIProvider>
  );
}
