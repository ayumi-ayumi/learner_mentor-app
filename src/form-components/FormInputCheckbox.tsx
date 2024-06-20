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
										checked={value?.includes(option.value)}
										onChange={() => {
											if (value.includes(option.value)) {
												onChange(
													(value as string[]).filter(
														(item) => item !== option.value
													)
												);
											} else {
												onChange([...value, option.value]);
											}
										}}
										key={option.value}
									/>
								}
								label={option.label}
								key={option.value}
							/>
						))}
					</FormGroup>
					<FormHelperText>{error?.message}</FormHelperText>
				</FormControl>
			)}
		></Controller>
  );
};