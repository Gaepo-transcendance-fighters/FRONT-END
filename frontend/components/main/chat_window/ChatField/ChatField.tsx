"use client";

import { useRoom } from "@/context/RoomContext";
import { Box, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { IChat } from "../ChatWindow";

import DmChat from "./DmChat";
import NonDmChat from "./NonDmChat";

interface Props {
  msgs: IChat[];
  setMsgs: Dispatch<SetStateAction<IChat[]>>;
}

const ChatField = ({ msgs, setMsgs }: Props) => {
  const { roomState } = useRoom();
  return (
    <>
      {roomState.currentRoom?.mode === "private" ? (
        <DmChat msgs={msgs} setMsgs={setMsgs} />
      ) : (
        <NonDmChat msgs={msgs} setMsgs={setMsgs} />
      )}
    </>
  );
};

export default ChatField;
