import React from "react";
import Chats from './Chats'
import Search from "./Search";

export default function Sidebar (props) {
  return (
    <div className="sidebar">
      <Search/>
      <Chats sendTo={props.sendTo}/>
    </div>
  );
};

