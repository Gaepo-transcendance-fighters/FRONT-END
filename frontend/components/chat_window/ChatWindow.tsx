"use client";

import "./ChatWindow.css";
import { Box } from "@mui/material";
import { main } from "@/font/color";

const ChatWindow = () => {
  return (
    <Box
      sx={{
        margin: "0",
        padding: 0,
        height: "60vh",
        minWidth: "300px",
        backgroundColor: main.main6,
        borderRadius: "10px",
      }}
    ></Box>
  );
};

export default ChatWindow;
