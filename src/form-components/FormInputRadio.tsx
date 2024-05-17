import React, { useEffect } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";
// import { FormInputProps } from "./FormInputProps";

// const options_learnerORmentor = [
//   {
//     label: "Learner",
//     value: "learner",
//   },
//   {
//     label: "Mentor",
//     value: "mentor",
//   },
// ];

export const FormInputRadio = ({
  name,
  control,
  label,
  options,
  setValue,
}) => {
  const [radioValue, setRadioValue] = React.useState("");

  useEffect(() => {
    if (radioValue) setValue(name, radioValue);
  }, [name, setValue, radioValue]);

  const handleChange = (event) => {
    setRadioValue(event.target.value);
  };

  const generateRadioOptions = () => {
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
        label={label}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <RadioGroup value={radioValue} onChange={handleChange} row>
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};