import React, { useState, useRef, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import "../styles/FormProfile.scss";
import { db } from "../firebase/BaseConfig";
import { collection, addDoc, serverTimestamp, updateDoc, doc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useAutocomplete, } from "@vis.gl/react-google-maps";
import { FormInputText } from "../form-components/FormInputText";
import { FormInputRadio } from "../form-components/FormInputRadio";
import { FormInputCheckbox } from "../form-components/FormInputCheckbox";
import { FormInputDropdown } from "../form-components/FormInputDropdown";
import { Button, Paper, Typography, Container, Stack, Alert } from "@mui/material";
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
import { useUsersData } from "../context/UsersProvider";

// export default function FormProfile() {
  export default function FormProfile({ defaultValues }) {

  // const defaultValues: UserProfileType = {
  //   id: 0,
  //   timestamp: serverTimestamp(),
  //   place: {
  //     address: "",
  //     position: {
  //       lat: 0,
  //       lng: 0
  //     },
  //   },
  //   name: "",
  //   learnerORmentor: "",
  //   learningDuration: "",
  //   workingDuration: "",
  //   programmingLanguages: [],
  //   languages: [],
  //   uid: ""
  // };

  const [userProfile, setUserProfile] = useState<UserProfileType>(defaultValues)


  const { currentUser, loading, logInUserProfile } = useAuth();

  useEffect(() => {
    if (logInUserProfile) setUserProfile(logInUserProfile)
  }, [logInUserProfile])
  // const { logInUserProfile } = useUsersData();
  // console.log(typeof(userProfile))
  console.log(currentUser)



  // const inputRef = useRef<HTMLInputElement>(null);
  // const [inputValue, setInputValue] = useState("");
  const [place, setPlace] = useState<Place>({ address: "", position: { lat: 0, lng: 0 } });

  const [saved, setSaved] = useState(false);

  // const methods = useForm<UserProfileType>({ userProfile }); //Not working
  const methods = useForm<UserProfileType>({defaultValues}); //OK
  const learnerORmentor = methods.watch("learnerORmentor")

  // Store the user data when clicking the submit button
  const onSubmit = (data: UserProfileType) => {
      console.log(data)
      const addDataRef = doc(db, 'users', currentUser.uid)
      setDoc(addDataRef, 
        {...data,
        uid: currentUser?.uid,
        id: nanoid(),
        timestamp: serverTimestamp(),
        // datetime: new Date(),
        place: place
      }

      )
      // setInputValue("");
      setSaved(true)


      // console.log(data)
      // addDoc(collection(db, "users"), {
      //   ...data,
      //   uid: currentUser?.uid,
      //   id: nanoid(),
      //   timestamp: serverTimestamp(),
      //   // datetime: new Date(),
      //   place: place
      // });
      // // setInputValue("");
      // setSaved(true)
  };

  const handleReset = () => {
    methods.reset(defaultValues);
    // setInputValue("")
  };

  const onUpdate = () => {
    methods.reset(defaultValues);

  }

  // Place autocomplete function
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(event.target.value);
  // };

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const onPlaceChanged = (place: any) => {
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

  // if (autocompleteInstance) {
  //   autocompleteInstance.setFields([
  //     "formatted_address",
  //     "geometry.location",
  //   ]);
  //   autocompleteInstance.setComponentRestrictions({ country: ["de"] });
  // }

  // useEffect(() => {
  //   if (autocompleteInstance?.getPlace()) {
  //     const { formatted_address, geometry } = autocompleteInstance.getPlace();
  //     const lat = geometry?.location
  //     const lng = geometry?.location

  //     setPlace((prev) => {
  //       return {
  //         ...prev,
  //         address: formatted_address,
  //         position: {
  //           lat: lat?.lat(),
  //           lng: lng?.lng()
  //         },
  //       };
  //     });
  //   }
  // }, [inputValue]);

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
            <PlaceAutoComplete setPlace={setPlace} defaultPlace={userProfile?.place?.address} />
            <FormInputText name="name" label="Name" />
            <FormInputRadio
              name={"learnerORmentor"}
              label={"I am a "}
              options={options_learnerORmentor}
            />
            {learnerORmentor === "learner" && (<FormInputRadio
              name={"learningDuration"}
              label={"I have been learning for "}
              options={options_LearningDuration}
            />)}
            {learnerORmentor === "mentor" && (<FormInputRadio
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
