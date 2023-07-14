"use client";

import "./ChatWindow.css";
import BottomField from "./BottomField";
import ChatField from "./ChatField";
import RoomTitleField from "./RoomTitleField";
import { Box } from "@mui/material";

const ChatWindow = () => {
  return (
    <Box sx={{ margin: "0", padding: "0", height: "55vh", minWidth: "300px" }}>
      <RoomTitleField />
      <ChatField />
      <BottomField />
    </Box>
  );
};

export default ChatWindow;
