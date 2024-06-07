import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "../interfaces/interfaces";
import React from "react";

export const FormInputText = ({ name, label }: FormInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field,
        fieldState: { error },
      }) => (
        <TextField
          {...field}
          error={!!error}
          helperText={error?.message}
          size="small"
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};


