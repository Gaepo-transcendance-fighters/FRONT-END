"use client";

import { CardContent } from "@mui/material";
import Title from "./Title";
import RoomTypeButton from "./RoomTypeButton";
import { useRoom } from "@/context/RoomContext";

export default function RoomList() {
  const { roomState } = useRoom();

  return (
    <>
      <CardContent
        id="portal"
        sx={{ pb: 0 }}
        className={roomState.isOpen ? "memactivate" : "memdeactivate"}
      ></CardContent>
      <CardContent sx={{ "&:last-child": { pb: 0 } }}>
        <Title title={"chatroomlist"} text={"Chat Room List"} />
        <RoomTypeButton />
      </CardContent>
    </>
  );
}
