import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from './Chats'

export default function Sidebar (props) {
  console.log(props.sendTo)
  return (
    <div className="sidebar">
      {/* <Navbar /> */}
      <Search sendTo={props.sendTo}/>
      <Chats/>
    </div>
  );
};

