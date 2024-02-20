import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../styles/AddProfile.scss";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
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
  useMapsLibrary,

} from "@vis.gl/react-google-maps";
// import { useGeocoding } from "./hooks/useGeocoding";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function AddProfile() {
  const center = { lat: 52.52, lng: 13.41 }; //Berlin

  const [users, setUsers] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  //Store the user data when clicking the submit button
  const onSubmit = (data) => {
    addDoc(collection(db, "users"), {
      ...data,
      id: nanoid(),
      datetime: new Date(),
      address: location.address,
      postal_code: location.postal_code,
      position: location.position
    });
    // updateDoc(collection(db, "users"), {
    //   position: useGeocoding(location),
    // });
    reset(); //送信後の入力フォーム欄を初期値に戻す
    setInputValue("")
  };
  // console.log(watch());//入力の値を常時監視する

  //Obtain data from firebase
  React.useEffect(() => {
    // const users = getDocs(collection(db, "users"));
    // users.then((snap) => setUsers(snap.docs.map((doc) => ({ ...doc.data() }))));

    const postData = collection(db, "users");
    const queryRef = query(postData, orderBy("datetime", "asc"));
    onSnapshot(queryRef, (post) => {
      setUsers(post.docs.map((doc) => ({ ...doc.data() })));
    });

    /* リアルタイムで取得 */
    // onSnapshot(users, (snap) => {
    //   // console.log(querySnapshot.docs);
    //   setUsers(snap.docs.map((doc) => ({ ...doc.data() })));
    // });
  }, []);
  // console.log(users);

  // const [isLoading, setIsLoading] = useState(false);
  // const [searchWord, setSearchWord] = useState("");
  // const [markerPoint, setMarkerPoint] = useState();

  // function getMapData() {
  //   try {
  //     setIsLoading(true);
  //     // geocoderオブジェクトの取得
  //     // const geocoder = new google.maps.Geocoder();
  //     const geocoder = new window.google.maps.Geocoder();
  //     // let getLat = 0;
  //     // let getLng = 0;
  //     // 検索キーワードを使ってGeocodeでの位置検索
  //     geocoder.geocode({ address: searchWord }, async (results, status) => {
  //       if (status === "OK" && results) {
  //         // getLat = results[0].geometry.location.lat();
  //         // getLng = results[0].geometry.location.lng();
  //         // const center = {
  //         //       lat: results[0].geometry.location.lat(),
  //         //       lng: results[0].geometry.location.lng()
  //         //     };
  //         //   setMarkerPoint(center); // ここで検索対象の緯度軽度にマーカーの位置を変更
  //         //   // setMarkerPoint({lat: getLat, lng: getLng}); // ここで検索対象の緯度軽度にマーカーの位置を変更

  //         const searchWordPosition = {
  //           lat: results[0].geometry.location.lat(),
  //           lng: results[0].geometry.location.lng(),
  //         };

  //         // setMarkerPoint({...markerPoint, lat: 52.6117109,})
  //         setMarkerPoint(searchWordPosition);
  //         // setMarkers([
  //         //   ...markers,
  //         //   {
  //         //     id: markers.length + 1,
  //         //     name: searchWord,
  //         //     position: {
  //         //       lat: searchWordPosition.lat,
  //         //       lng: searchWordPosition.lng,
  //         //     },
  //         //   },
  //         // ]);
  //         setSearchWord("");
  //       }
  //     });

  //     setIsLoading(false);
  //   } catch (error) {
  //     alert("検索処理でエラーが発生しました！");
  //     setIsLoading(false);
  //     throw error;
  //   }
  // }

  //Geocoding function
  const apiIsLoaded = useApiIsLoaded();
  const [latLng, setLatLng] = useState([]);
  const [geocodingService, setGeocodingService] = useState();
  const geocodingLibrary = useMapsLibrary("geocoding");

  useEffect(() => {
    if (!geocodingLibrary) return;
    setGeocodingService(new window.google.maps.Geocoder());
  }, [geocodingLibrary]);
  console.log(apiIsLoaded, geocodingLibrary, geocodingService)

  if(geocodingService){
    geocodingService.geocode({address: '13357', componentRestrictions: {country: 'DE'}}, (results, status) => {
      if (results && status === "OK") {
        // const a = results[0].geometry.location.lat()
        // return results[0].geometry.location.lat()
      // return {lat:results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
      setLatLng({lat:results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()})
        // return a
      }})
    }


  //Autocomplete function
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const [location, setLocation] = useState([]);

  const onPlaceChanged = (place) => {
    if (place) {
      setInputValue(place.formatted_address || place.name);
    }
    // Keep focus on input element
    inputRef.current && inputRef.current.focus();
  };

  const autocompleteInstance = useAutocomplete({
    inputField: inputRef && inputRef.current,
    onPlaceChanged,
  });

  if (autocompleteInstance) {
    autocompleteInstance.setFields([
      "formatted_address",
      "geometry",
      "address_components",
    ]);
    autocompleteInstance.setComponentRestrictions({ country: ["de"] });
    // autocompleteInstance.setTypes(["address"]);
  }

  useEffect(() => {
    if (autocompleteInstance?.getPlace()) {
      const { formatted_address, geometry, address_components } =
        autocompleteInstance.getPlace();
      const postalCode = address_components.find((component) => {
        return component.types.includes("postal_code");
      });
      console.log(address_components)
      setLocation((prev) => {
        return {
          ...prev,
          address: formatted_address,
          postal_code: postalCode.long_name,
          position: {lat: geometry.location.lat(), lng:  geometry.location.lng()}
        };
      });
    }
  }, [inputValue]);

  return (
    <>
      {/* <div>
        {users.map((user) => (
          <>
          <div key={user.id}></div>
          <div key={user.id}>{user.name}{user.position.lat} {user.position.lng}{user.address}{user.postal_code}</div>
          </>
        ))}
      </div> */}
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 1. Learner or Mentor */}
          <div className="input-container">
            <fieldset>
              <legend>Are you a learner or mentor?</legend>
              <input
                type="radio"
                value="Learner"
                id="learner"
                {...register("learnerOrMentor", {
                  required: "Choose learner or mentor",
                })}
              />
              <label htmlFor="learner">Learner</label>

              <input
                type="radio"
                value="Mentor"
                id="mentor"
                {...register("learnerOrMentor", {
                  required: "Choose learner or mentor",
                })}
              />
              <label htmlFor="mentor">Mentor</label>
              {errors.name && <p>{errors.learnerOrMentor.message}</p>}
            </fieldset>
          </div>

          {/* 2. Name */}
          <div className="input-container">
            <label htmlFor="name">Your name?</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Tell me your name" })}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          {/* 3. Location */}
          <div className="input-container">
            <label htmlFor="location">
              Your location? Type the zipcode or your address
            </label>
            <input
              type="text"
              id="location"
              value={inputValue}
              onChange={(e) => handleInputChange(e)}
              ref={inputRef}
              // {...register("location")}
              // {...register("location", {
              //   required: "Type your location",
              //   onChange: (e)=>{handleInputChange(e)},

              // onChange: (e) => {
              //   handleInputChange(e);
              // },
              // value: {inputValue}
              // onChange: {handleInputChange}
              // })}
            />
            {/* <input
              type="text"
              id="location"
              // ref={inputRef}
              // value={inputValue}
              // onChange={handleInputChange}
              // onChange={(e) => handleInputChange(e)}
              {...register("location", { required: "Type your location" })}
            /> */}

            {/* {errors.location && <p>{errors.location.message}</p>} */}
          </div>

          {/* <select {...register("Title", )}>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </select> */}

          {/* 4. What do you currently learn? select*/}
          <div className="input-container">
            <legend>What do you currently learn?</legend>
            <input
              {...register("whatToLearn")}
              type="checkbox"
              value="HTML&CSS"
              id="htmlAndCss"
            />
            <label htmlFor="htmlAndCss">HTML&CSS</label>
            <input
              {...register("whatToLearn")}
              type="checkbox"
              value="JavaScript"
              id="javascript"
            />
            <label htmlFor="javascript">JavaScript</label>
            <input
              {...register("whatToLearn")}
              type="checkbox"
              value="Python"
              id="python"
            />
            <label htmlFor="python">Python</label>
            <input
              {...register("whatToLearn")}
              type="checkbox"
              value="React"
              id="react"
            />
            <label htmlFor="react">React</label>
            <input
              {...register("whatToLearn")}
              type="checkbox"
              value="TypeScript"
              id="typescript"
            />
            <label htmlFor="typescript">TypeScript</label>
            <input
              {...register("whatToLearn")}
              type="checkbox"
              value="PHP"
              id="php"
            />
            <label htmlFor="php">PHP</label>
          </div>

          {/* 5. Skill level "How long have you learned?" radio ['Never','Less than 3 monts', '3-6 months', '6-12 months', 'Over 1 year']*/}
          <div className="input-container">
            <fieldset>
              <legend>How long have you learned?</legend>
              <input
                type="radio"
                value="never"
                id="never"
                {...register("howLongLearned", {
                  // required: "Choose learner or mentor",
                })}
              />
              <label htmlFor="never">Never</label>

              <input
                type="radio"
                value="lessThan3Months"
                id="lessThan3Months"
                {...register("howLongLearned", {
                  // required: "Choose learner or mentor",
                })}
              />
              <label htmlFor="lessThan3Months"> &lt; 3 months</label>

              <input
                type="radio"
                value="3To6Months"
                id="3To6Months"
                {...register("howLongLearned", {
                  // required: "Choose learner or mentor",
                })}
              />
              <label htmlFor="3To6Months">3 - 6 months</label>

              <input
                type="radio"
                value="moreThan6Months"
                id="moreThan6Months"
                {...register("howLongLearned", {
                  // required: "Choose learner or mentor",
                })}
              />
              <label htmlFor="moreThan6Months">&gt; 6 months</label>

              <input
                type="radio"
                value="over1Year"
                id="over1Year"
                {...register("howLongLearned", {
                  // required: "Choose learner or mentor",
                })}
              />
              <label htmlFor="over1Year">&gt; 1 year</label>
            </fieldset>
          </div>

          {/* 6. Languages to speak select*/}
          <div className="input-container">
            <legend>Which Language do you speak?</legend>
            <input
              {...register("languageToSpeak")}
              type="checkbox"
              value="English"
              id="english"
            />
            <label htmlFor="english">English</label>
            <input
              {...register("languageToSpeak")}
              type="checkbox"
              value="Spanish"
              id="spanish"
            />
            <label htmlFor="spanish">Spanish</label>
            <input
              {...register("languageToSpeak")}
              type="checkbox"
              value="French"
              id="french"
            />
            <label htmlFor="french">French</label>
            <input
              {...register("languageToSpeak")}
              type="checkbox"
              value="Chinese"
              id="chinese"
            />
            <label htmlFor="chinese">Chinese</label>
            <input
              {...register("languageToSpeak")}
              type="checkbox"
              value="German"
              id="german"
            />
            <label htmlFor="german">German</label>
            <input
              {...register("languageToSpeak")}
              type="checkbox"
              value="Italian"
              id="italian"
            />
            <label htmlFor="italian">Italian</label>
          </div>
          {/* 7. Want to meet in person or online select */}
          <div className="input-container">
            <legend>Do you want to meet in person or online?</legend>
            <input
              {...register("inPersonOrOnline")}
              type="checkbox"
              value="In person"
              id="inPerson"
            />
            <label htmlFor="inPerson">In person</label>
            <input
              {...register("inPersonOrOnline")}
              type="checkbox"
              value="Online"
              id="online"
            />
            <label htmlFor="online">Online</label>
          </div>

          {/* <input
          type="text"
          placeholder="Email"
          {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        <input
          type="tel"
          placeholder="Mobile number"
          {...register("Mobile number", {
            required: true,
            minLength: 6,
            maxLength: 12,
          })}
        />
        <select {...register("Title", { required: true })}>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </select>

        <input
          {...register("Developer", { required: true })}
          type="radio"
          value="Yes"
        />
        <input
          {...register("Developer", { required: true })}
          type="radio"
          value="No"
        /> */}

          <input type="submit" value="Add Me!" />
        </form>
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
          <div>{markerPoint}</div>
        </div> */}
      </div>
      {/* <input ref={inputRef} value={inputValue} onChange={handleInputChange} /> */}
    </>
  );
}
