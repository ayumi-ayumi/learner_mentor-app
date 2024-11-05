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

export const ControlPanel = (
  //   {
  //   categories,
  //   onCategoryChange
  // }: ControlPanelProps
) => {
  // const handleCategoryChange = useCallback(
  //   (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     onCategoryChange(e.target.value || null);
  //   },
  //   [onCategoryChange]
  // );
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const style = { fontSize: "0.75em", position: "absolute", right: "0", top: "0", margin: "24px", backgroundColor: "#fff" }
  return (
    // <div className="control-panel marker-clustering-control-panel" style={{ fontSize: "0.75em", position: "absolute", width: "248px", right: "0", top: "0", margin: "24px", backgroundColor: "#fff" }}>
    //   <p>
    //     <label>Filter Makers:</label>{' '}
    //     <select
    //     // onChange={handleCategoryChange}
    //     >
    //       <option value={''}>All</option>

    //       <option key="learner" value="learner">Learner</option>
    //       <option key="mentor" value="mentor">Mentor</option>
    //       <option key="cafe" value="cafe">Cafe</option>

    //       {/* {categories.map(category => (
    //         <option key={category.key} value={category.key}>
    //           {category.label} ({category.count})
    //         </option>
    //       ))} */}
    //     </select>
    //   </p>
    // </div>
    <div style={style}>
      <FormControl sx={{ m: 1, minWidth: 150 }} >
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="">Filter Markers</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};