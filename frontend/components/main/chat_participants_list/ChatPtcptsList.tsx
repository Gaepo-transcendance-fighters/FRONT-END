"use client";

import "@/components/main/room_list/RoomList.css";
import "@/components/main/chat_participants_list/ChatPtcptsList.css";
import Title from "../room_list/Title";
import PtcptList from "./PtcptList";
import { IChatRoom } from "../room_list/RoomTypeButton";
import { Dispatch, SetStateAction, useEffect } from "react";

export default function ChatPtcptsList({
  aRoom,
  setIsRight,
  isRight,
  showPtcptsList,
}: {
  aRoom: IChatRoom | undefined;
  setIsRight: Dispatch<SetStateAction<boolean>>;
  isRight: boolean;
  showPtcptsList: boolean;
}) {
  useEffect(() => {
    isRight ? setIsRight(false) : null;
    console.log("isRight : ", isRight);
  }, [isRight]);
  return (
    <>
      {showPtcptsList ? (
        <>
          <Title title={"pltitle"} text={"Participants List"} />
          <PtcptList aRoom={aRoom} />
        </>
      ) : null}
    </>
  );
}
