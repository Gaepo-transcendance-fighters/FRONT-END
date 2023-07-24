"use client";

import "./ChatWindow.css";
import BottomField from "./BottomField/BottomField";
import ChatField from "./ChatField/ChatField";
import RoomTitleField from "./RoomTitleField/RoomTitleField";
import { Box } from "@mui/material";
import { useState } from "react";

const ChatWindow = () => {
  const [isInRoom, setIsInRoom] = useState(true);

  return (
    <Box sx={{ margin: "0", padding: "0", height: "60vh", minWidth: "300px" }}>
      {isInRoom ? 
      <>
        <RoomTitleField status={isInRoom} setFunction={setIsInRoom} />
        <ChatField />
        <BottomField />
      </> : null}
    </Box>
  );
};

export default ChatWindow;
