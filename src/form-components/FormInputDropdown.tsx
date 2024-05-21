import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { FormInputProps } from "../interfaces/interfaces";

export const FormInputDropdown = ({
  name,
  control,
  label,
  options,
  setValue,
}: FormInputProps) => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    if (languages) setValue(name, languages);
  }, [name, setValue, languages]);

  const handleChange = (event: { target: { value: React.SetStateAction<never[]>; }; }) => {
    setLanguages(event.target.value);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleOpen = () => {
  //   setOpen(true);
  // };


  const generateSingleOptions = () => {
    if (typeof options !== "undefined") 
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
           <Checkbox checked={languages.indexOf(option.value) > -1} />
              <ListItemText primary={option.value} />
          {/* {option.label} */}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl size={"small"}>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select 
          onChange={handleChange} 
          value={languages}
          // open={open}
          label="Languages"
          // onClose={handleClose}
          // onOpen={handleOpen}
          multiple
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          >
          {/* <Select 
          onChange={handleChange} 
          value={languages}
          // open={open}
          label="Languages"
          // onClose={handleClose}
          // onOpen={handleOpen}
          > */}
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};