import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// import {CategoryData} from './trees';

// type ControlPanelProps = {
//   categories: Array<CategoryData>;
//   onCategoryChange: (value: string | null) => void;
// };

export default function ControlPanel({ filter, setFilter }) {
  // console.log(filter)

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value as string);
  // };

  const style = { 
    fontSize: "0.75em", 
    position: "absolute", 
    right: "0", top: "0", 
    margin: "24px", 
    backgroundColor: "#fff", 
    boxShadow: "0px 0px 13px 7px #a5a3a3" 
  }

  return (
    <div style={style}>
      <FormControl sx={{ m: 1, minWidth: 150 }} >
        <Select
          value={filter}
          // onChange={handleChange}
          displayEmpty
        >
          <MenuItem value={"all"} onClick={() => setFilter("all")}>All</MenuItem>
          <MenuItem value={"learner"} onClick={() => setFilter("learner")}>Learner</MenuItem>
          <MenuItem value={"mentor"} onClick={() => setFilter("mentor")}>Mentor</MenuItem>
          <MenuItem value={"cafes"} onClick={() => setFilter("cafes")}>Cafe</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};