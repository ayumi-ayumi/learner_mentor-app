import React, { useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
// import { FormInputProps } from "./FormInputProps";
const options = [
  {
    label: "Dropdown Option 1",
    value: "1",
  },
  {
    label: "Dropdown Option 2",
    value: "2",
  },
];
export const FormInputDropdown = ({
  name,
  control,
  setValue,
  label,
}) => {
  const [languages, setLanguages] = React.useState('');
  // const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (languages) setValue(name, languages);
  }, [name, setValue, languages]);

  const handleChange = (event) => {
    setLanguages(event.target.value);
  };

  console.log(languages)
  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleOpen = () => {
  //   setOpen(true);
  // };


  const generateSingleOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
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
          >
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};