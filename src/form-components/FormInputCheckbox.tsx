import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "../interfaces/interfaces";

export const FormInputCheckbox= ({
  name,
  control,
  label,
  options,
  setValue,
} : FormInputProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  // we are handling the selection manually here
  const handleSelect = (value: string) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems) => [...prevItems, value]);
    }
  };
  // we are setting form value manually here
  useEffect(() => {
    setValue(name, selectedItems);
  }, [name, selectedItems, setValue]);
  
  return (
    <FormControl size={"small"} variant={"outlined"}>
      <FormLabel component="legend">{label}</FormLabel>
      <div>
        {typeof(options)!== "undefined" && (options.map((option) => {
          return (
            <FormControlLabel
              control={
                <Controller
                  name={name}
                  render={() => {
                    return (
                      <Checkbox
                        checked={selectedItems.includes(option.value)}
                        onChange={() => handleSelect(option.value)}
                      />
                    );
                  }}
                  control={control}
                />
              }
              label={option.label}
              key={option.value}
            />
          );
        }))}
      </div>
    </FormControl>
  );
};