"use client";

import "@/components/main/room_list/RoomList.css";
import Title from "../room_list/Title";
import Members from "./Members";
import { useEffect } from "react";
import "@/components/main/member_list/MemberList.css";
import { useRoom } from "@/context/RoomContext";

export default function MemberList({
}: {
}) {
  const { roomState } = useRoom();

  // useEffect(() => {
  //   isRight ? setIsRight(false) : null;
  // }, [isRight]);
  return (
    <>
      {roomState.isOpen ? (
        <>
          <Title title={"memtitle"} text={"Members List"} />
          <Members />
        </>
      ) : null}
    </>
  );
}
