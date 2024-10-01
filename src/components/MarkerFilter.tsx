import React from "react";
import '../styles/MarkerFilter.scss'
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function MarkerFilter(props: { setFilter: (arg0: string) => void; }) {
  const [alignment, setAlignment] = React.useState('all');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <Box
      sx={{
        // height: "80px",
        borderRadius: 1,
        margin: "20px 0",
        // width:'100%'
      }}
    >
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        fullWidth={true}
      >
        <ToggleButton onClick={() => props.setFilter("learner")} value="Learner">Learner</ToggleButton>
        <ToggleButton onClick={() => props.setFilter("mentor")} value="Mentor">Mentor</ToggleButton>
        <ToggleButton onClick={() => props.setFilter("cafes")} value="cafes">Cafes</ToggleButton>
        <ToggleButton onClick={() => props.setFilter("all")} value="show all">Show all</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

// <div className="filter-tab">
//   <div onClick={()=>props.setFilter("learner")}>Learner</div>
//   <div onClick={()=>props.setFilter("mentor")}>Mentor</div>
//   <div onClick={()=>props.setFilter("cafes")}>Cafes</div>
//   <div onClick={()=>props.setFilter("all")}>Show ALL</div>
//   {/* <div style={{backgroundColor:"#22ccff"}} onClick={()=>props.setFilter("learner")}>Learner</div>
//   <div style={{backgroundColor:"yellow"}} onClick={()=>props.setFilter("mentor")}>Mentor</div>
//   <div style={{backgroundColor:"pink"}} onClick={()=>props.setFilter("cafes")}>Cafes</div>
//   <div onClick={()=>props.setFilter("all")}>Show ALL</div> */}
// </div>