import React, { useState } from "react";
import { FormControl, MenuItem, Select, OutlinedInput, Checkbox, FormHelperText, FormLabel, FormControlLabel, FormGroup } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { FormInputProps } from "../interfaces/interfaces";

export const FormInputDropdown = ({
  name,
  label,
  options,
}: FormInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: {
          value: true,
          message:
            'Choose your spoken languages',
        },
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl error={!!error} >
          <FormLabel>{label}</FormLabel>
          <Select
            value={value}
            label="Languages"
            multiple
            input={<OutlinedInput />}
            renderValue={(selected) => selected.join(', ')}
          >
            <FormGroup>
              {options?.map((option) => (
                <FormControlLabel
                  // label={value}
                  label={option}
                  key={option}
                  control={
                    <MenuItem key={option} value={option}>
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
                        }} />
                    </MenuItem>
                  }
                />
              ))}
            </FormGroup>
          </Select>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    ></Controller>
  )
}
