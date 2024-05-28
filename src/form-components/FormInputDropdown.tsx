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
  // const handleChange = (event: any) => {
  //   setLanguages(event.target.value);
  //   console.log(event)
  // };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: { target: { value: any; }; }) => {
    const { target: { value }, } = event;
    setLanguages(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
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
            onChange={handleChange}
            value={value}
            label="Languages"
            multiple
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
          >
            <FormGroup>
              {options?.map((option) => (
                <FormControlLabel
                  label={option.label}
                  key={option.value}
                  control={
                    <MenuItem key={option.value} value={option.value}>
                      <Checkbox checked={value.includes(option.value)}
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
