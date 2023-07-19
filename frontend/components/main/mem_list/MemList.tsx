"use client";

import "@/components/main/room_list/RoomList.css";
import Title from "../room_list/Title";
import Mems from "./Mems";
import { IChatRoom } from "../room_list/RoomTypeButton";
import { Dispatch, SetStateAction, useEffect } from "react";
import "@/components/main/mem_list/MemList.css";

export default function MemList({
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
  }, [isRight]);
  return (
    <>
      {showPtcptsList ? (
        <>
          <Title title={"pltitle"} text={"Members List"} />
          <Mems aRoom={aRoom} />
        </>
      ) : null}
    </>
  );
}
