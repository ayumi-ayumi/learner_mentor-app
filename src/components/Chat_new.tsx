import React, { useContext } from "react";
// import Messages from "./Messages";
import Input from "./Chat_Input_new";
import { ChatContext } from "../context/ChatContext";
import '../styles/Chat_new.scss'


const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
      </div>
      {/* <Messages /> */}
      <Input/>
    </div>
  );
};

export default Chat;