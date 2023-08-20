"use client";

import BottomField from "./BottomField/BottomField";
import ChatField from "./ChatField/ChatField";
import RoomTitleField from "./RoomTitleField/RoomTitleField";
import LobbyWindow from "./LobbyWindow";
import { Box } from "@mui/material";
import { useRoom } from "@/context/RoomContext";
import { useEffect, useState } from "react";

export interface IChat {
  channelIdx: number | undefined;
  senderIdx: number | undefined;
  msg: string;
  msgDate: string;
}

const ChatWindow = () => {
  const { roomState } = useRoom();
  const [msgs, setMsgs] = useState<IChat[]>([]);

  // 방전환시 채팅내역 초기화
  useEffect(() => {
    setMsgs([]);
  }, [roomState.currentRoom]);

  return (
    <Box sx={{ margin: "0", padding: "0", height: "60vh", minWidth: "300px" }}>
      {roomState.isOpen ? (
        <>
          <RoomTitleField setMsgs={setMsgs} />
          <ChatField msgs={msgs} setMsgs={setMsgs} />
          <BottomField setMsgs={setMsgs} />
        </>
      ) : (
        <LobbyWindow />
      )}
    </Box>
  );
};

export default ChatWindow;
