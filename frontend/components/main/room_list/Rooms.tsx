"use client";

import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { createPortal } from "react-dom";
import "@/components/main/room_list/RoomList.css";
import { IChatRoom } from "./RoomTypeButton";
import MemberList from "../member_list/MemberList";
import CreateRoomButton from "./CreateRoomButton";
import Room from "./Room";

export default function Rooms({
  roomsProp,
  channelType,
  showMembersList,
  setShowMembersList,
  chatRoomList,
}: {
  roomsProp: IChatRoom[];
  channelType: boolean;
  showMembersList: boolean;
  setShowMembersList: Dispatch<SetStateAction<boolean>>;
  chatRoomList: IChatRoom[];
}) {
  const [isRight, setIsRight] = useState(false);
  const [aRoom, setARoom] = useState<IChatRoom>();
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    isRight ? setShowMembersList(true) : null;
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
      <div className={!showMembersList ? "list" : "roomclicked"}>
        <CreateRoomButton channelType={channelType} />
        {roomsProp.map((room, idx) => {
          return (
            <Room
              key={idx}
              room={room}
              idx={idx}
              setARoom={setARoom}
              setIsRight={setIsRight}
              setShowMembersList={setShowMembersList}
              isRight={isRight}
              aRoom={aRoom}
            />
          );
        })}
      </div>
      {showMembersList &&
        portalContainer &&
        createPortal(
          <MemberList
            showMembersList={showMembersList}
            aRoom={aRoom}
            isRight={isRight}
            setIsRight={setIsRight}
          />,
          portalContainer
        )}
    </>
  );
}
