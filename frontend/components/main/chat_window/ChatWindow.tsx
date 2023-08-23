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
  sender?: string;
  msg: string;
  msgDate: string;
}

const ChatWindow = () => {
  const { roomState } = useRoom();
  const [prevRoom, setPrevRoom] = useState(0);
  const [msgs, setMsgs] = useState<IChat[]>([]);

  // 방전환시 채팅내역 초기화
  useEffect(() => {
    console.log("!!!", roomState.currentRoom?.channelIdx);
    if (!roomState.currentRoom?.channelIdx) return;
    console.log("prev", prevRoom);
    console.log("channel", roomState.currentRoom.channelIdx);
    if (!roomState.currentRoom) setMsgs([]);
    // else if (roomState.currentRoom.channelIdx !== prevRoom) setMsgs([]);
    setPrevRoom(roomState.currentRoom?.channelIdx);
    console.log("[ChatWindow:33] last content of 방전환시 채팅내역 초기화")
  }, [roomState.currentRoom?.channelIdx]);

  useEffect(() => {
    console.log("chatwindow", msgs);
  }, [msgs]);

  useEffect(()=> {
    if (roomState.isOpen === true)
      console.log("[ChatWindow:41] isOpen is true")
    else
      console.log("[ChatWindow:43] isOpen is false")
  }, [roomState.isOpen])

  useEffect(() => {

  }, [])

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
