import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../interfaces/interfaces";

export const FormInputRadio = ({
  name,
  control,
  label,
  options,
  setValue,
}: FormInputProps) => {
  const [radioValue, setRadioValue] = useState("");

  useEffect(() => {
    if (radioValue) setValue(name, radioValue);
  }, [name, setValue, radioValue]);

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setRadioValue(event.target.value);
  };

  const generateRadioOptions = () => {
    if (typeof options !== "undefined")
    return options.map((singleOption) => (
      <FormControlLabel
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio />}
        key={singleOption.value}
      />
    ));
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        // label={label}
        render={() => (
          <RadioGroup value={radioValue} onChange={handleChange} row>
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};