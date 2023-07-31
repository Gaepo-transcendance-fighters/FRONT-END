"use client";

import { useEffect, useState, Dispatch, SetStateAction } from "react";
import Rooms from "./Rooms";
import { IChatRoom0, Mode, mockChatRoomList0 } from "@/components/public/Layout";

export default function RoomTypeButton({
  showMembersList,
  setShowMembersList,
}: {
  showMembersList: boolean;
  setShowMembersList: Dispatch<SetStateAction<boolean>>;
}) {
  const [nonDmrooms, setNonDmRooms] = useState<IChatRoom0[]>([]);
  const [dmRooms, setDmRooms] = useState<IChatRoom0[]>([]);
  const [disabled, setDisabled] = useState(true);

  const DivideRoom = () => {
    mockChatRoomList0.map((room) => {
      if (room.mode != Mode.PRIVATE) {
        setNonDmRooms((prev) => {
          return [...prev, room];
        });
      } else {
        setDmRooms((prev) => {
          return [...prev, room];
        });
      }
    });
  };

  useEffect(() => {
    DivideRoom();
  }, []);

  const OnClick = (isNotDm: boolean) => {
    setNonDmRooms([]);
    setDmRooms([]);
    DivideRoom();

    setDisabled(isNotDm);
  };

  const NonDmBtnClick = () => {
    OnClick(true);
  };

  const DmBtnClick = () => {
    OnClick(false);
  };

  return (
    <>
      <div>
        <button
          className="notdm typebutton"
          onClick={NonDmBtnClick}
          disabled={disabled}
        >
          Public / Protected
        </button>
        <button
          className="dm typebutton"
          onClick={DmBtnClick}
          disabled={!disabled}
        >
          DM
        </button>
      </div>
      <Rooms
        roomsProp={disabled ? nonDmrooms : dmRooms}
        channelType={disabled}
        showMembersList={showMembersList}
        setShowMembersList={setShowMembersList}
        />
    </>
  );
}
