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
  options
}) => {
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
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <RadioGroup value={value} onChange={onChange}>
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};