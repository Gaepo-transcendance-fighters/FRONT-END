"use client";

import "@/components/main/room_list/RoomList.css";
import "@/components/main/chat_participants_list/ChatPtcptsList.css";
import Title from "../room_list/Title";
import PtcptList from "./PtcptList";
import { IChatRoom } from "../room_list/RoomTypeButton";

export default function ChatPtcptsList({
  aRoom,
}: {
  aRoom: IChatRoom | undefined;
}) {
  return (
    <>
      <Title title={"pltitle"} text={"Participants List"} />
      <PtcptList aRoom={aRoom} />
    </>
  );
}
