// RoomEnter.ts

import { IChatRoom, ReturnMsgDto } from "@/type/RoomType";
import { Mode } from "@/type/RoomType";
import { RoomContextData, RoomAction } from "@/context/RoomContext";
import { UserContextData } from "@/context/UserContext";
import { Dispatch } from "react";
import { useAuth } from "@/context/AuthContext";

const RoomEnter = (
  room: IChatRoom,
  roomState: RoomContextData,
  userState: UserContextData,
  roomDispatch: Dispatch<RoomAction>
) => {
  const { authState } = useAuth();
  if (!authState.chatSocket) return;
  if (roomState.currentRoom && roomState.currentRoom.mode !== Mode.PRIVATE) {
    console.log("[RoomEnter 조건문 안에 들어왔따. ]");
    authState.chatSocket.emit(
      "chat_goto_lobby",
      {
        channelIdx: roomState.currentRoom.channelIdx,
        userIdx: userState.userIdx,
      },
      (ret: ReturnMsgDto) => {}
    );
  }
  roomDispatch({ type: "SET_CUR_ROOM", value: room });
  roomDispatch({ type: "SET_IS_OPEN", value: true });
};

export default RoomEnter;
