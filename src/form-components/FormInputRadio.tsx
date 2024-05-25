import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { FormInputProps } from "../interfaces/interfaces";

export const FormInputRadio = ({
  name,
  // control,
  label,
  options,
  // setValue,
}: FormInputProps) => {
  const { control } = useFormContext();

  // const [radioValue, setRadioValue] = useState("");

  // useEffect(() => {
  //   if (radioValue) setValue(name, radioValue);
  // }, [name, setValue, radioValue]);

  // const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
  //   setRadioValue(event.target.value);
  // };

  // const generateRadioOptions = () => {
  //   if (typeof options !== "undefined")
  //   return options.map((singleOption) => (
  //     <FormControlLabel
  //       value={singleOption.value}
  //       label={singleOption.label}
  //       control={<Radio />}
  //       key={singleOption.value}
  //     />
  //   ));
  // };

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
  // return (
  //   <FormControl component="fieldset">
  //     <FormLabel component="legend">{label}</FormLabel>
  //     <Controller
  //       name={name}
  //       control={control}
  //       // label={label}
  //       render={() => (
  //         <RadioGroup value={radioValue} onChange={handleChange} row>
  //           {generateRadioOptions()}
  //         </RadioGroup>
  //       )}
  //     />
  //   </FormControl>
  // );
};