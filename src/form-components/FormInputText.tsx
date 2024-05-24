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

// export const FormInputText = ({ name, control, label }: FormInputProps) => {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({
//         field: { onChange, value },
//         fieldState: { error },
//         formState,
//       }) => (
//         <TextField
//           helperText={error ? error.message : null}
//           size="small"
//           error={!!error}
//           onChange={onChange}
//           value={value}
//           fullWidth
//           label={label}
//           variant="outlined"
//         />
//       )}
//     />
//   );
// };

