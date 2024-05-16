import React from "react";
import Box from "@mui/material/Box";
import '../styles/MarkerFilter.scss'

export default function MarkerFilter() {
  return (
    <Box
      sx={{
        height: "80px",
        borderRadius: 1,
        margin: "20px"
      
      }}
    >
      <div className="filter-tab">
        <div>Learner</div>
        <div>Mentor</div>
        <div>Show ALL</div>
      </div>
    </Box>
  );
}
