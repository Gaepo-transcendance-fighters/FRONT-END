"use client";

import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useReducer,
} from "react";
import Rooms from "./Rooms";
import { IChatRoom0, Mode } from "@/components/public/Layout";
import { useRoom } from "@/context/RoomContext";

export default function RoomTypeButton() {
  const [dmRooms, setDmRooms] = useState<IChatRoom0[]>([]);
  const { roomState, roomDispatch } = useRoom();
  const [disabled, setDisabled] = useState(true);

  const DivideRoom = () => {
    roomState.rooms.map((room) => {
      if (room.mode != Mode.PRIVATE) {
        roomDispatch({ type: "SET_ROOMS", value: [room] });
      } else {
        setDmRooms((prev) => {
          return [...prev, room];
        });
      }
    });
  };

  useEffect(() => {
    DivideRoom();
  }, [roomState.rooms]);

  const OnClick = (isNotDm: boolean) => {
    roomDispatch({ type: "SET_ROOMS", value: [] });
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
        roomsProp={disabled ? roomState.rooms : dmRooms}
        channelType={disabled}
      />
    </>
  );
}
