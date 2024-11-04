import React from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import '../../styles/MarkerFilter.scss'

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
      //   // height: "80px",
      //   borderRadius: 1,
      //   margin: "20px 0",
      //   // width:'100%'
      // paddingTop: "100px"
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
