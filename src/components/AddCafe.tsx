import React, { useState, useRef, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import "../styles/AddProfile.scss";
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
  options_cafeDetail
} from "../Props/props";
import { Place, CafeDetail } from "../interfaces/interfaces";
import { useAuth } from "../context/AuthProvider";
import CheckIcon from '@mui/icons-material/Check';
import { PlaceAutoComplete } from "./PlaceAutoComplete";

export default function AddCafe() {

  // const { currentUser } = useAuth();

  const defaultValues: CafeDetail = {
    id: 0,
    dateTime: new Date(),
    place: {
      address: "",
      position: {
        lat: 0,
        lng: 0
      },
    },
    // name: "",
    cafe_detail: [],
  };

  // const inputRef = useRef<HTMLInputElement>(null);
  // const [inputValue, setInputValue] = useState("");
  const [place, setPlace] = useState<Place>({ address: "", position: { lat: 0, lng: 0 } });

  const [saved, setSaved] = useState(false);

  const methods = useForm<CafeDetail>({ defaultValues });
  // const learnerORmentor = methods.watch("learnerORmentor")

  // Store the user data when clicking the submit button
  const onSubmit = (data: CafeDetail) => {
    // console.log(data)
    // console.log(place)
    addDoc(collection(db, "cafes"), {
      ...data,
      // uid: currentUser?.uid,
      id: nanoid(),
      datetime: new Date(),
      place: place
    });
    // setInputValue("");
    setSaved(true)
  };

  const handleReset = () => {
    methods.reset(defaultValues);
    // setInputValue("")
  };


  return (
    <>
      <h1>Add Cafe</h1>
      <FormProvider {...methods}>
        <Container maxWidth="sm" component="form" onSubmit={methods.handleSubmit(onSubmit)}>
          {saved && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Added your selected cafe.
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
            <PlaceAutoComplete setPlace={setPlace} />
            <FormInputCheckbox
              name={"cafe_detail"}
              label={"Cafe enviroment"}
              options={options_cafeDetail}
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
