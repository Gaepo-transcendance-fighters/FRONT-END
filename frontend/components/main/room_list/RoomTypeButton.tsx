"use client";

import { useEffect, useState } from "react";
import Rooms from "./Rooms";
import { IChatGetRoomList, IChatRoom0, useRoom } from "@/context/RoomContext";
import { socket } from "@/app/layout";
import { useUser } from "@/context/UserContext";

export default function RoomTypeButton() {
  const { roomState, roomDispatch } = useRoom();
  const [disabled, setDisabled] = useState(true);
  const { userState } = useUser();

  useEffect(() => {
    const ChatGetDmRoomList = (json: IChatRoom0[]) => {
      console.log("ChatGetDmRoomList : ", json);
      roomDispatch({ type: "SET_DM_ROOMS", value: json });
    };
    socket.on("chat_get_DMList", ChatGetDmRoomList);

    return () => {
      socket.off("chat_get_DMList", ChatGetDmRoomList);
    };
  }, []);

  const OnClick = (isNotDm: boolean) => {
    setDisabled(isNotDm);
  };

  useEffect(() => {
    const ChatGetRoomList = (json: IChatRoom0[]) => {
      roomDispatch({ type: "SET_NON_ROOMS", value: json });
    };
    socket.on("chat_get_roomList", ChatGetRoomList);

    return () => {
      socket.off("chat_get_roomList", ChatGetRoomList);
    };
  }, []);

  const NonDmBtnClick = () => {
    socket.emit("chat_get_roomList", (status_code: number) => {
      console.log(status_code);
    });
    OnClick(true);
  };

  const DmBtnClick = () => {
    socket.emit(
      "chat_get_DMList",
      JSON.stringify({
        userNickname: userState.nickname,
        userIdx: userState.userIdx,
      }),
      (status_code: any) => {
        console.log(status_code);
      }
    );
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
        currentRoomList={disabled ? roomState.nonDmRooms : roomState.dmRooms}
        channelType={disabled}
      />
    </>
  );
}
