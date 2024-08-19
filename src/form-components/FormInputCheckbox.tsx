import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { FormInputProps } from "../interfaces/interfaces";

export const FormInputCheckbox= ({
  name,
  label,
  options,
} : FormInputProps) => {
  const { control } = useFormContext();
  return ( 
    <Controller
			control={control}
			name={name}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<FormControl error={!!error} > 
					<FormLabel>{label}</FormLabel>
					<FormGroup row={true}>
						{options?.map((option) => (
							<FormControlLabel
								control={
									<Checkbox
										checked={value?.includes(option)}
										onChange={() => {
											if (value.includes(option)) {
												onChange(
													(value as string[]).filter(
														(item) => item !== option
													)
												);
											} else {
												onChange([...value, option]);
											}
										}}
										key={option}
									/>
								}
								label={option}
								key={option}
							/>
						))}
					</FormGroup>
					<FormHelperText>{error?.message}</FormHelperText>
				</FormControl>
			)}
		></Controller>
  );
};