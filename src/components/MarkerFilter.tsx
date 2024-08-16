import React from "react";
import Box from "@mui/material/Box";
import '../styles/MarkerFilter.scss'

export default function MarkerFilter(props: { setFilter: (arg0: string) => void; }) {
  return (
    <Box
      sx={{
        height: "80px",
        borderRadius: 1,
        margin: "20px"
      }}
    >
      <div className="filter-tab">
        <div onClick={()=>props.setFilter("learner")}>Learner</div>
        <div onClick={()=>props.setFilter("mentor")}>Mentor</div>
        <div onClick={()=>props.setFilter("cafes")}>Cafes</div>
        <div onClick={()=>props.setFilter("all")}>Show ALL</div>
        {/* <div style={{backgroundColor:"#22ccff"}} onClick={()=>props.setFilter("learner")}>Learner</div>
        <div style={{backgroundColor:"yellow"}} onClick={()=>props.setFilter("mentor")}>Mentor</div>
        <div style={{backgroundColor:"pink"}} onClick={()=>props.setFilter("cafes")}>Cafes</div>
        <div onClick={()=>props.setFilter("all")}>Show ALL</div> */}
      </div>
    </Box>
  );
}
