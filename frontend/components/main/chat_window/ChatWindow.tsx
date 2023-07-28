"use client";

import BottomField from "./BottomField/BottomField";
import ChatField from "./ChatField/ChatField";
import RoomTitleField from "./RoomTitleField/RoomTitleField";
import LobbyWindow from "./LobbyWindow";
import { Box } from "@mui/material";
import { useState } from "react";

const ChatWindow = () => {
  const [isInRoom, setIsInRoom] = useState<boolean>(true);

  return (
    <Box sx={{ margin: "0", padding: "0", height: "60vh", minWidth: "300px" }}>
      {isInRoom ? (
        <>
          <RoomTitleField setFunction={setIsInRoom} />
          <ChatField />
          <BottomField />
        </>
      ) : (
        <LobbyWindow />
      )}
    </Box>
  );
};

export default ChatWindow;
