import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, OutlinedInput, ListItemText, Checkbox, FormHelperText, FormLabel, FormControlLabel, FormGroup } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { FormInputProps } from "../interfaces/interfaces";

export const FormInputDropdown = ({
  name,
  // control,
  label,
  options,
  // setValue,
}: FormInputProps) => {
  const { control } = useFormContext();

  const [languages, setLanguages] = useState([]);

  // useEffect(() => {
  //   if (languages) setValue(name, languages);
  // }, [name, setValue, languages]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    setLanguages(event.target.value);
    console.log(123)
  };

  const generateSingleOptions = () => {
    if (typeof options !== "undefined")
      return options.map((option) => {
        return (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={languages.indexOf(option.value as never) > -1} />
            <ListItemText primary={option.value} />
          </MenuItem>
        );
      });
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl error={!!error} >
          <FormLabel>{label}</FormLabel>
          {/* <FormGroup row={true}>
          {options?.map((option) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={value.includes(option.value)}
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
        </FormGroup> */}
          <Select
            onChange={handleChange}
            value={languages}
            label="Languages"
            multiple
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
          >
            <FormGroup>
              {options?.map((option) => (
                <FormControlLabel
                  control={
                    <MenuItem key={option.value} >

                      <Checkbox
                        checked={value.includes(option.value)}
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
                    </MenuItem>

                  }
                  label={option.label}
                  key={option.value}
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
//   return (
//     <FormControl size={"small"}>
//       <InputLabel>{label}</InputLabel>
//       <Controller
//         render={() => (
//           <Select
//             onChange={handleChange}
//             value={languages}
//             label="Languages"
//             multiple
//             input={<OutlinedInput label="Tag" />}
//             renderValue={(selected) => selected.join(', ')}
//           >
//             {generateSingleOptions()}
//           </Select>
//         )}
//         control={control}
//         name={name}
//       />
//     </FormControl>
//   );
// };



// export const FormInputDropdown = ({
//   name,
//   control,
//   label,
//   options,
//   setValue,
// }: FormInputProps) => {
//   const [languages, setLanguages] = useState([]);

//   useEffect(() => {
//     if (languages) setValue(name, languages);
//   }, [name, setValue, languages]);

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const handleChange = (event: any) => {
//     setLanguages(event.target.value);
//   };

//   const generateSingleOptions = () => {
//     if (typeof options !== "undefined")
//       return options.map((option) => {
//         return (
//           <MenuItem key={option.value} value={option.value}>
//             <Checkbox checked={languages.indexOf(option.value as never) > -1} />
//             <ListItemText primary={option.value} />
//           </MenuItem>
//         );
//       });
//   };

//   return (
//     <FormControl size={"small"}>
//       <InputLabel>{label}</InputLabel>
//       <Controller
//         render={() => (
//           <Select
//             onChange={handleChange}
//             value={languages}
//             label="Languages"
//             multiple
//             input={<OutlinedInput label="Tag" />}
//             renderValue={(selected) => selected.join(', ')}
//           >
//             {generateSingleOptions()}
//           </Select>
//         )}
//         control={control}
//         name={name}
//       />
//     </FormControl>
//   );
// };