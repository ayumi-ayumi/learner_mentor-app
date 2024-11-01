import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Chat_Input";
import '../../styles/Chat.scss'
import { ChatContext } from "../../context/ChatContext";

export default function Chat() {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
      </div>
      <Messages />
      <Input />
    </div>
  );
};