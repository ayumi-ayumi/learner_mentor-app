import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import "../styles/FormProfile.scss";
import { db } from "../firebase/BaseConfig";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { FormInputText } from "../form-components/FormInputText";
import { FormInputRadio } from "../form-components/FormInputRadio";
import { FormInputCheckbox } from "../form-components/FormInputCheckbox";
import { FormInputDropdown } from "../form-components/FormInputDropdown";
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

// export default function FormProfile() {
export default function FormProfile({ defaultValues }: { defaultValues: UserProfileType | undefined }) {

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

  const [userProfile, setUserProfile] = useState<UserProfileType | undefined>(defaultValues)
  const { currentUser, logInUserProfile } = useAuth();
  const [place, setPlace] = useState<Place | undefined>({ address: defaultValues?.place.address, position: defaultValues?.place.position });
  const [saved, setSaved] = useState(false);
  const methods = useForm<UserProfileType>({ defaultValues }); //OK
  const learnerORmentor = methods.watch("learnerORmentor")
  const navigate = useNavigate();

  
  useEffect(() => {
    if (logInUserProfile) setUserProfile(logInUserProfile)
  }, [logInUserProfile])
console.log(userProfile)

  // Store the user data when clicking the submit button
  const onSubmit = (data: UserProfileType) => {
    console.log(data)
    const addDataRef = doc(db, 'users', currentUser.uid)
    setDoc(addDataRef,
      {
        ...data,
        uid: currentUser?.uid,
        id: nanoid(),
        timestamp: serverTimestamp(),
        place: place
      })
    setSaved(true)
    navigate("/");

  };

  const handleReset = () => {
    methods.reset(defaultValues);
    // setInputValue("")
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
