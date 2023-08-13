"use client";

import BottomField from "./BottomField/BottomField";
import ChatField from "./ChatField/ChatField";
import RoomTitleField from "./RoomTitleField/RoomTitleField";
import LobbyWindow from "./LobbyWindow";
import { Box } from "@mui/material";
import { useRoom } from "@/context/RoomContext";
import { useState } from "react";

interface IChat {
  username: string;
  senderIdx: number;
  msg: string;
  msgDate: string;
}

const ChatWindow = () => {
  const { roomState } = useRoom();
  // const [msgs, setMsgs] = useState<IChat[]>([]);

  return (
    <Box sx={{ margin: "0", padding: "0", height: "60vh", minWidth: "300px" }}>
      {roomState.isOpen ? (
        <>
          <RoomTitleField/>
          <ChatField />
          <BottomField/>
        </>
      ) : (
        <LobbyWindow />
      )}
    </Box>
  );
};

export default ChatWindow;
