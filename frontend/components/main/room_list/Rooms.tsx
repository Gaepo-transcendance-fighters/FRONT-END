"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import "@/components/main/room_list/RoomList.css";
import MemberList from "../member_list/MemberList";
import CreateRoomButton from "./CreateRoomButton";
import Room from "./Room";
import { IChatRoom0 } from "@/components/public/Layout";
import { useRoom } from "@/context/RoomContext";

export default function Rooms({
  roomsProp,
  channelType,
}: {
  roomsProp: IChatRoom0[];
  channelType: boolean;
}) {
  const [isRight, setIsRight] = useState(false);
  const [aRoom, setARoom] = useState<IChatRoom0>();
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );
  const { roomState, roomDispatch } = useRoom();

  useEffect(() => {
    isRight ? roomDispatch({ type: "SET_ISOPEN", value: true }) : null;
  }, [isRight]);

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
        {roomsProp.map((room, idx) => {
          return (
            <Room
              key={idx}
              room={room}
              idx={idx}
              setARoom={setARoom}
              setIsRight={setIsRight}
              isRight={isRight}
              aRoom={aRoom}
            />
          );
        })}
      </div>
      {roomState.isOpen &&
        portalContainer &&
        createPortal(
          <MemberList
            aRoom={aRoom}
            isRight={isRight}
            setIsRight={setIsRight}
          />,
          portalContainer
        )}
    </>
  );
}
