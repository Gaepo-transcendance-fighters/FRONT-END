"use client";

import { useEffect, useState, Dispatch, SetStateAction } from "react";
import Rooms from "./Rooms";
import {
  IChatRoom0,
  Mode,
} from "@/components/public/Layout";
import { useRoom } from "@/context/RoomContext";

export default function RoomTypeButton() {
  const [nonDmrooms, setNonDmRooms] = useState<IChatRoom0[]>([]);
  const [dmRooms, setDmRooms] = useState<IChatRoom0[]>([]);
  const [disabled, setDisabled] = useState(true);
  const { rooms } = useRoom();

  const DivideRoom = () => {
    rooms.map((room) => {
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
  }, [rooms]);

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
      />
    </>
  );
}
