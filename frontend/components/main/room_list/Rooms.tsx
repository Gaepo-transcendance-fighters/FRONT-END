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
  setNonDmRooms,
}: {
  roomsProp: IChatRoom0[];
  channelType: boolean;
  setNonDmRooms: Dispatch<SetStateAction<IChatRoom0[]>>;
}) {
  const [isRight, setIsRight] = useState(false);
  const [aRoom, setARoom] = useState<IChatRoom0>();
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );
  const { isOpen, setIsOpen } = useRoom();

  useEffect(() => {
    isRight ? setIsOpen(true) : null;
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
      <div className={!isOpen ? "list" : "roomclicked"}>
        <CreateRoomButton channelType={channelType}
              setNonDmRooms={setNonDmRooms}
              />
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
      {isOpen &&
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
