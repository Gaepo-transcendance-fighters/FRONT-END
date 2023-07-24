"use client";

import "./ChatWindow.css";
import BottomField from "./BottomField/BottomField";
import ChatField from "./ChatField/ChatField";
import RoomTitleField from "./RoomTitleField/RoomTitleField";
import { Box } from "@mui/material";

const ChatWindow = () => {
  return (
    <Box sx={{ margin: "0", padding: "0", height: "60vh", minWidth: "300px" }}>
      <RoomTitleField />
      <ChatField />
      <BottomField />
    </Box>
  );
};

export default ChatWindow;
