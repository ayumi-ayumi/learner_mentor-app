import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../styles/AddProfile.scss";
import { db } from "../firebase/BaseConfig";
import {
  collection,
  addDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import {
  useAutocomplete,
} from "@vis.gl/react-google-maps";
import { FormInputText } from "../form-components/FormInputText";
import { FormInputRadio } from "../form-components/FormInputRadio";
import { FormInputCheckbox } from "../form-components/FormInputCheckbox";
import { FormInputDropdown } from "../form-components/FormInputDropdown";
import { Button, Paper, Typography } from "@mui/material";
import {
  options_learnerORmentor,
  options_LearningDuration,
  options_WorkingDuration,
  options_Langugages,
} from "../props";
import { Place, UserProfile } from "../interfaces/interfaces";

export default function AddProfile() {
  
  const defaultValues: UserProfile = {
    name: "",
    learnerORmentor: "",
    LearningDuration: "",
    WorkingDuration: "",
    programmingLanguages: [],
    languages: [],
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [place, setPlace] = useState<Place | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserProfile>({ defaultValues: defaultValues });

  // Store the user data when clicking the submit button
  const onSubmit = (data: UserProfile) => {
    console.log(place)
    addDoc(collection(db, "users"), {
      ...data,
      id: nanoid(),
      datetime: new Date(),
      place: place
      // address: place.address,
      // position: place.position,
    });
    reset({ defaultValues: defaultValues }); //送信後の入力フォーム欄を初期値に戻す
    setInputValue("");
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onPlaceChanged = (place) => {
    if (place) {
      setInputValue(place.formatted_address || place.name);
    }
    // Keep focus on input element
    inputRef.current && inputRef.current.focus();
    console.log(inputRef.current)
  };

  const autocompleteInstance = useAutocomplete({
    inputField: inputRef && inputRef.current,
    onPlaceChanged,
  });

  if (autocompleteInstance) {
    autocompleteInstance.setFields([
      "formatted_address",
      "geometry.location",
      // "address_components",
    ]);
    autocompleteInstance.setComponentRestrictions({ country: ["de"] });
    // autocompleteInstance.setTypes(["address"]);
  }

  useEffect(() => {
    if (autocompleteInstance?.getPlace()) {
      const { formatted_address, geometry } = autocompleteInstance.getPlace();
      setPlace((prev) => {
        return {
          ...prev,
          address: formatted_address,
          position: {
            lat: geometry.location.lat(),
            lng: geometry.location.lng(),
          },
        };
      });
    }
  }, [inputValue]);
// console.log(typeof(place.position))
  return (
    <>
      <Paper
        style={{
          display: "grid",
          // gridRowGap: "20px",
          // padding: "20px",
          // margin: "10px 300px",
        }}
        className="form-container"
      >
        <Typography variant="h4">Form Demo</Typography>
        <div className="input-container">
          <label htmlFor="location">Your location?</label>
          <input
            type="text"
            id="location"
            value={inputValue}
            onChange={(e) => handleInputChange(e)}
            ref={inputRef}
          />
        </div>
        <FormInputText name="name" control={control} label="Name" />
        <FormInputRadio
          name={"learnerORmentor"}
          control={control}
          label={"I am a "}
          options={options_learnerORmentor}
          setValue={setValue}
        />
        <FormInputRadio
          name={"LearningDuration"}
          control={control}
          label={"I have been learning for "}
          options={options_LearningDuration}
          setValue={setValue}
        />
        <FormInputRadio
          name={"WorkingDuration"}
          control={control}
          label={"I have been working for "}
          options={options_WorkingDuration}
          setValue={setValue}
        />
        <FormInputCheckbox
          name={"programmingLanguages"}
          control={control}
          label={"Checkbox Input"}
          setValue={setValue}
        />
        <FormInputDropdown
          name="languages"
          control={control}
          label="Languages"
          options={options_Langugages}
          setValue={setValue}
        />
        <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
          Submit
        </Button>
        <Button onClick={() => reset({ defaultValues: defaultValues })} variant={"outlined"}>
          Reset
        </Button>
      </Paper>
    </>
  );
}
