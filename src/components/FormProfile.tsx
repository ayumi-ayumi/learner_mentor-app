import React, { useState, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import "../styles/FormProfile.scss";
import { db } from "../firebase/BaseConfig";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { FormInputText } from "../form-components/FormInputText";
import { FormInputRadio } from "../form-components/FormInputRadio";
import { FormInputCheckbox } from "../form-components/FormInputCheckbox";
import { FormInputDropdown } from "../form-components/FormInputDropdown";
import ShowAvatar from './ShowAvatar'
import { Button, Container, Stack, Alert } from "@mui/material";
import {
  options_learnerORmentor,
  options_LearningDuration,
  options_WorkingDuration,
  options_Langugages,
  options_ProgrammingLanguages
} from "../Props/props";
import { Place, UserProfileType } from "../interfaces/interfaces";
import { useAuth } from "../context/AuthProvider";
import CheckIcon from '@mui/icons-material/Check';
import { PlaceAutoComplete } from "./PlaceAutoComplete";
import { useNavigate } from "react-router-dom";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { updateProfile } from "firebase/auth";

// export default function FormProfile() {
export default function FormProfile({ defaultValues }: { defaultValues: UserProfileType | undefined }) {

  const [userProfile, setUserProfile] = useState<UserProfileType | undefined>(defaultValues)
  const [selectedPlace, setSelectedPlace] = useState<Place | undefined>(userProfile?.place);
  const { currentUser, logInUserProfile } = useAuth();
  // const [place, setPlace] = useState<Place>({ address: defaultValues?.place.address, position: defaultValues?.place.position });
  const [avatar, setAvatar] = useState(userProfile?.avatar);
  const [saved, setSaved] = useState(false);
  const methods = useForm<UserProfileType>({ defaultValues });
  const learnerORmentor = methods.watch("learnerORmentor")
  const navigate = useNavigate();
  const homeUrl = "/learner_mentor-app/";


  // useEffect(() => {
  //   if (logInUserProfile) setUserProfile(logInUserProfile)
  // }, [logInUserProfile])

  // Store the user data when clicking the submit button
  const onSubmit = (data: UserProfileType) => {
    console.log(data)
    const addDataRef = doc(db, 'users', currentUser.uid)
    setDoc(addDataRef,
      {
        ...data,
        uid: currentUser?.uid,
        // id: nanoid(),
        // timestamp: serverTimestamp(),
        place: selectedPlace,
        displayName: data.name,
        // place: place,
        avatar: avatar,
        photoURL: avatar,
      })
    //create empty user chats on firestore
    setDoc(doc(db, "userChats", currentUser.uid), {});

    //Update Auth 
    updateProfile(currentUser, {
      displayName: data.name,
      photoURL: avatar,
    });

    setSaved(true)
    navigate(homeUrl);
  };

  const handleReset = () => {
    methods.reset(defaultValues);
  };

  return (
    <>
      <FormProvider {...methods}>
        <Container maxWidth="sm" component="form" onSubmit={methods.handleSubmit(onSubmit)}>
          {saved && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Your profile is save successfully.
          </Alert>}
          <Stack
            style={{
              display: "grid",
              // gridRowGap: "20px",
              // padding: "20px",
              // margin: "10px 300px",
            }}
            className="form-container"
          >
            <ShowAvatar setAvatar={setAvatar} defaultAvatar={userProfile?.avatar} />
            <PlaceAutoComplete onPlaceSelect={setSelectedPlace} defaultPlace={userProfile?.place?.address} />
            <FormInputText name="name" label="Name" />
            <FormInputRadio
              name={"learnerORmentor"}
              label={"I am a "}
              options={options_learnerORmentor}
            />
            {learnerORmentor === "Learner" && (<FormInputRadio
              name={"learningDuration"}
              label={"I have been learning for "}
              options={options_LearningDuration}
            />)}
            {learnerORmentor === "Mentor" && (<FormInputRadio
              name={"workingDuration"}
              label={"I have been working for "}
              options={options_WorkingDuration}
            />)}
            <FormInputCheckbox
              name={"programmingLanguages"}
              label={"My skills"}
              options={options_ProgrammingLanguages}
            />
            <FormInputDropdown
              name="languages"
              label="Languages"
              options={options_Langugages}
            />
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button variant="contained" type="submit">
                Save
              </Button>
              <Button onClick={handleReset}>Reset</Button>
            </Stack>
          </Stack>
        </Container>
      </FormProvider>
    </>
  );
}

// const PlaceAutocomplete = ({ onPlaceSelect }) => {
//   const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const places = useMapsLibrary('places');

//   const [photos, setPhotos] = useState([])
//   useEffect(() => {
//     if (!places || !inputRef.current) return;

//     const options = {
//       fields: ['geometry', 'name', 'formatted_address', 'photos'],
//       componentRestrictions: { country: "de" },
//     };

//     setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
//   }, [places]);

//   useEffect(() => {
//     if (!placeAutocomplete) return;

//     placeAutocomplete.addListener('place_changed', () => {
//       const { name, formatted_address, geometry, photos } = placeAutocomplete.getPlace();
//       const lat = geometry?.location
//       const lng = geometry?.location
//       console.log(photos[0].getUrl())
//       setPhotos(photos)

//       onPlaceSelect({
//         name: name,
//         address: formatted_address,
//         position: {
//           lat: lat?.lat(),
//           lng: lng?.lng()
//         },
//       });
//     });
//   }, [onPlaceSelect, placeAutocomplete]);

//   return (
//     <div className="autocomplete-container">
//       <input ref={inputRef} />
//       {photos && photos.map((photo) => (
//         <img key={photo.html_attributions} src={photo.getUrl()} style={{
//           display: "grid",
//           height/: "80px",
//           width: "60px",
//           // margin: "10px 300px",
//         }}/>
//       ))}
//     </div>
//   );
// };