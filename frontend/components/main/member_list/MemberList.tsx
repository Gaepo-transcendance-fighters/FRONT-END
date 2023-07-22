"use client";

import "@/components/main/room_list/RoomList.css";
import Title from "../room_list/Title";
import Members from "./Members";
import { IChatRoom } from "../room_list/RoomTypeButton";
import { Dispatch, SetStateAction, useEffect } from "react";
import "@/components/main/member_list/MemberList.css";

export default function MemberList({
  aRoom,
  setIsRight,
  isRight,
  showMembersList,
}: {
  aRoom: IChatRoom | undefined;
  setIsRight: Dispatch<SetStateAction<boolean>>;
  isRight: boolean;
  showMembersList: boolean;
}) {
  useEffect(() => {
    isRight ? setIsRight(false) : null;
  }, [isRight]);
  return (
    <>
      {showMembersList ? (
        <>
          <Title title={"pltitle"} text={"Members List"} />
          <Members aRoom={aRoom} />
        </>
      ) : null}
    </>
  );
}
