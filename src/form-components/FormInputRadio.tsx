import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { FormInputProps } from "../interfaces/interfaces";

import { useUsersData } from '../context/UsersProvider'


export const FormInputRadio = ({
  name,
  label,
  options,
}: FormInputProps) => {
  const { control } = useFormContext();
  // const [selectedValue, setSelectedValue] = useState();
  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };

  // const handleRadioChange = () => {
  //   handleChange()
  // }

  // const { logInUserProfile } = useAuth();
  // console.log(logInUserProfile)


  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl {...field} error={!!error}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup>
            {options?.map((option) => (
              <FormControlLabel
                value={option.value}
                control={<Radio checked={field.value === option.value} />}
                label={option.label}
                key={option.value}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    ></Controller>
  );
};