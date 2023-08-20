"use client";

import { Box, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { IChat } from "../ChatWindow";
import { useRoom } from "@/context/RoomContext";
import DmChatField from "./DmChat";

interface Props {
  msgs: IChat[];
  setMsgs: Dispatch<SetStateAction<IChat[]>>;
}

const ChatField = ({ msgs, setMsgs }: Props) => {
  const { roomState } = useRoom();
  return (
    <>
      {roomState.currentRoom?.mode === "private" ? (
        <DmChatField msgs={msgs} setMsgs={setMsgs} />
      ) : (
        <ChatField msgs={msgs} setMsgs={setMsgs} />
      )}
    </>
  );
};

export default ChatField;
