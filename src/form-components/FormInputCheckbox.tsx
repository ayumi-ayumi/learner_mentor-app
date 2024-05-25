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
  // control,
  label,
  options,
  // setValue,
} : FormInputProps) => {
  const { control } = useFormContext();
  // const [selectedItems, setSelectedItems] = useState<string[]>([]);
  // we are handling the selection manually here
  // const handleSelect = (value: string) => {
  //   const isPresent = selectedItems.indexOf(value);
  //   if (isPresent !== -1) {
  //     const remaining = selectedItems.filter((item) => item !== value);
  //     setSelectedItems(remaining);
  //   } else {
  //     setSelectedItems((prevItems) => [...prevItems, value]);
  //   }
  // };
  // we are setting form value manually here
  // useEffect(() => {
  //   setValue(name, selectedItems);
  // }, [name, selectedItems, setValue]);
  
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
					</FormGroup>
					<FormHelperText>{error?.message}</FormHelperText>
				</FormControl>
			)}
		></Controller>

    // <FormControl size={"small"} variant={"outlined"}>
    //   <FormLabel component="legend">{label}</FormLabel>
    //   <div>
    //     {typeof(options)!== "undefined" && (options.map((option) => {
    //       return (
    //         <FormControlLabel
    //           control={
    //             <Controller
    //               name={name}
    //               control={control}
    //               render={({ field : { onChange, onBlur, value }}) => {
    //                 return (
    //                   <Checkbox
    //                     // checked={value}
    //                     checked={selectedItems.includes(option.value)}
    //                     // onChange={() => {setSelectedItems(prev => [...prev, value])}}
    //                     onChange={() => handleSelect(option.value)}
    //                   />
    //                 );
    //               }}
    //             />
    //           }
    //           label={option.label}
    //           key={option.value}
    //         />
    //       );
    //     }))}
    //   </div>
    // </FormControl>
  );
};