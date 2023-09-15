// RoomEnter.ts

import { IChatRoom, ReturnMsgDto } from "@/type/RoomType";
import { Socket } from "socket.io-client";
import { Mode } from "@/type/RoomType";
import { RoomContextData, RoomAction } from "@/context/RoomContext";
import { UserContextData } from "@/context/UserContext";
import { Dispatch } from "react";
import { useAuth } from "@/context/AuthContext";

const RoomEnter = (
  room: IChatRoom,
  roomState: RoomContextData,
  userState: UserContextData,
  roomDispatch: Dispatch<RoomAction>,
  chatSocket: Socket
) => {
  if (!chatSocket) return;
  if (roomState.currentRoom && roomState.currentRoom.mode !== Mode.PRIVATE) {
    console.log("[RoomEnter 조건문 안에 들어왔따. ]");
    chatSocket.emit(
      "chat_goto_lobby",
      {
        channelIdx: roomState.currentRoom.channelIdx,
        userIdx: parseInt(localStorage.getItem("idx")!),
      },
      (ret: ReturnMsgDto) => {}
    );
  }
  roomDispatch({ type: "SET_CUR_ROOM", value: room });
  roomDispatch({ type: "SET_IS_OPEN", value: true });
};

export default RoomEnter;
