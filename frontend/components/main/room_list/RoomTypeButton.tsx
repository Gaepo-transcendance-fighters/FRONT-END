"use client";

import { useEffect, useState } from "react";
import Rooms from "./Rooms";
import { useRoom } from "@/context/RoomContext";

export default function RoomTypeButton() {
  const { roomState, dispatch } = useRoom();
  const [disabled, setDisabled] = useState(true);

  const OnClick = (isNotDm: boolean) => {
    dispatch({ type: "SET_ROOMS", value: [] });
    dispatch({ type: "SET_DM", value: [] });

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
        roomsProp={disabled ? roomState.rooms : roomState.DM}
        channelType={disabled}
      />
    </>
  );
}
