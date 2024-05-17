import React from "react";
import Box from "@mui/material/Box";
import '../styles/MarkerFilter.scss'

export default function MarkerFilter({ setFilter }) {
  return (
    <Box
      sx={{
        height: "80px",
        borderRadius: 1,
        margin: "20px"
      
      }}
    >
      <div className="filter-tab">
        <div style={{backgroundColor:"#22ccff"}} onClick={()=>setFilter("learner")}>Learner</div>
        <div style={{backgroundColor:"yellow"}} onClick={()=>setFilter("mentor")}>Mentor</div>
        <div onClick={()=>setFilter("all")}>Show ALL</div>
      </div>
    </Box>
  );
}
