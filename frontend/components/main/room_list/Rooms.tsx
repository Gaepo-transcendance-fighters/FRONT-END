"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "@/components/main/room_list/RoomList.css";
import MemberList from "../member_list/MemberList";
import CreateRoomButton from "./CreateRoomButton";
import Room from "./Room";
import { IChatRoom0, useRoom } from "@/context/RoomContext";

export default function Rooms({
  currentRoomList,
  channelType,
}: {
  currentRoomList: IChatRoom0[];
  channelType: boolean;
}) {
  // const [isRight, setIsRight] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );
  const { roomState } = useRoom();

  // useEffect(() => {
  //   isRight ? setIsOpen(true) : null;
  // }, [isRight]);

  useEffect(() => {
    const container = document.getElementById("portal");
    setPortalContainer(container);

    return () => {
      setPortalContainer(null);
    };
  }, []);

  return (
    <>
      <div className={!roomState.isOpen ? "list" : "roomclicked"}>
        <CreateRoomButton channelType={channelType} />
        {currentRoomList.map((room, idx) => {
          return (
            <Room
              key={idx}
              room={room}
              idx={idx}
              // setIsRight={setIsRight}
              // isRight={isRight}
            />
          );
        })}
      </div>
      {roomState.isOpen &&
        portalContainer &&
        createPortal(
          <MemberList />,
          // <MemberList isRight={isRight} setIsRight={setIsRight} />,
          portalContainer
        )}
    </>
  );
}
