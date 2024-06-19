import React, { useState, useRef, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import "../styles/FormProfile.scss";
import { db } from "../firebase/BaseConfig";
import { collection, addDoc, } from "firebase/firestore";
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
  options_ProgrammingLanguages,
  defaultValues
} from "../Props/props";
import { Place, UserProfile } from "../interfaces/interfaces";
import { useAuth } from "../context/AuthProvider";
import CheckIcon from '@mui/icons-material/Check';
import { PlaceAutoComplete } from "./PlaceAutoComplete";
import FormProfile from "./FormProfile";
import { useUsersData } from "../context/UsersProvider";
import ShowProfile from "./ShowProfile";
import { useNavigate, Link } from "react-router-dom";


// import Button from '@mui/material/Button';

export default function MyProfile() {

  const { logInUser } = useAuth();
  // console.log(useUsersData())

  // const { currentUser } = useAuth();
  // console.log(currentUser)
  // console.log(logInUser)

  // const defaultValues: UserProfile = {
  //   id: 0,
  //   dateTime: new Date(),
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

  // const inputRef = useRef<HTMLInputElement>(null);
  // const [inputValue, setInputValue] = useState("");
  // const [place, setPlace] = useState<Place>({ address: "", position: { lat: 0, lng: 0 } });

  const [addprofile, setAddprofile] = useState(false);

  // const methods = useForm<UserProfile>({ defaultValues });
  // const learnerORmentor = methods.watch("learnerORmentor")

  // // Store the user data when clicking the submit button
  // const onSubmit = (data: UserProfile) => {
  //   console.log(data)
  //   console.log(place)
  //   addDoc(collection(db, "users"), {
  //     ...data,
  //     uid: currentUser?.uid,
  //     id: nanoid(),
  //     datetime: new Date(),
  //     place: place
  //   });
  //   // setInputValue("");
  //   setSaved(true)
  // };

  // const handleReset = () => {
  //   methods.reset(defaultValues);
  //   // setInputValue("")
  // };
  const navigate = useNavigate();


  return (
    <>
      {
        !logInUser
          ?
          (<>
            <Button
              variant="contained"
              onClick={() => navigate('/addprofile')}
              // style={{ display: addprofile ? "none" : "block" }}
            >
              + Add my profile
            </Button>
            {/* <div>
              {addprofile && <FormProfile defaultValues={defaultValues}/>}
            </div> */}
          </>)
          :
          (<ShowProfile />)
      }
      {/* {
        !logInUser
          ?
          (<>
            <Button
              variant="contained"
              onClick={() => setAddprofile(true)}
              style={{ display: addprofile ? "none" : "block" }}
            >
              + Add my profile
            </Button>
            <div>
              {addprofile && <FormProfile defaultValues={defaultValues}/>}
            </div>
          </>)
          :
          (<ShowProfile />)
      } */}
    </>
  );
}
