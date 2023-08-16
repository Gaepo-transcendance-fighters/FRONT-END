"use client";

import { useEffect, useState } from "react";
import Rooms from "./Rooms";
import { IChatRoom, useRoom } from "@/context/RoomContext";
import { chatSocket } from "@/app/page";
import { useUser } from "@/context/UserContext";

export default function RoomTypeButton() {
  const { roomState, roomDispatch } = useRoom();
  const [disabled, setDisabled] = useState(true);
  const { userState } = useUser();

  useEffect(() => {
    const ChatGetDmRoomList = (json?: IChatRoom[]) => {
      json ? roomDispatch({ type: "SET_DM_ROOMS", value: json }) : null;
    };
    chatSocket.on("chat_get_DMList", ChatGetDmRoomList);

    return () => {
      chatSocket.off("chat_get_DMList", ChatGetDmRoomList);
    };
  }, []);

  const OnClick = (isNotDm: boolean) => {
    setDisabled(isNotDm);
  };

  useEffect(() => {
    const ChatGetRoomList = (json?: IChatRoom[]) => {
      json ? roomDispatch({ type: "SET_NON_DM_ROOMS", value: json }) : null;
    };
    chatSocket.on("chat_get_roomList", ChatGetRoomList);

    return () => {
      chatSocket.off("chat_get_roomList", ChatGetRoomList);
    };
  }, []);

  const NonDmBtnClick = () => {
    chatSocket.emit("chat_get_roomList", (status_code: number) => {});
    OnClick(true);
  };

  const DmBtnClick = () => {
    chatSocket.emit(
      "chat_get_DMList",
      JSON.stringify({
        userNickname: userState.nickname,
        userIdx: userState.userIdx,
      }),
      (status_code: any) => {
        // 아직 안 정해짐
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
