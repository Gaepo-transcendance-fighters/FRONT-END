"use client";

import "@/components/main/room_list/RoomList.css";
import Title from "../room_list/Title";
import Members from "./Members";
import { IChatRoom0 } from "@/components/public/Layout";
import { Dispatch, SetStateAction, useEffect } from "react";
import "@/components/main/member_list/MemberList.css";
import { useRoom } from "@/context/RoomContext";

export default function MemberList({
  aRoom,
  setIsRight,
  isRight,
}: {
  aRoom: IChatRoom0 | undefined;
  setIsRight: Dispatch<SetStateAction<boolean>>;
  isRight: boolean;
}) {
  const { isOpen } = useRoom();

  useEffect(() => {
    isRight ? setIsRight(false) : null;
  }, [isRight]);
  return (
    <>
      {isOpen ? (
        <>
          <Title title={"memtitle"} text={"Members List"} />
          <Members aRoom={aRoom} />
        </>
      ) : null}
    </>
  );
}
