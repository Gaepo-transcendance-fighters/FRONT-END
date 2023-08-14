"use client";

import { useEffect, useState } from "react";
import Rooms from "./Rooms";
import { useRoom } from "@/context/RoomContext";

export default function RoomTypeButton() {
  const { roomState, roomDispatch } = useRoom();
  const [disabled, setDisabled] = useState(true);

  /*
  {
    channelList[]? {
      channel {
        owner: string,
        channelIdx: number,
        mode : enum
      }
  }
*/

  /*
// emit - client 
{
	dmList[]? {
	    dmChannel {
	      targetNickname : string,
	      targetIdx : number,
	    }
}
*/
  // useEffect(() => {
  //   const ChatGetRoomList = (json: any) => {
  //     roomDispatch({ type: "SET_NON_ROOMS", value: json.channelList });
  //   };
  //   chatSocket.on("chat_get_roomlist", ChatGetRoomList);

  //   return () => {
  //     chatSocket.off("chat_get_roomlist", ChatGetRoomList);
  //   };
  // }, []);

  // useEffect(() => {
  //   const ChatGetDmRoomList = (json: any) => {
  //     roomDispatch({ type: "SET_DM_ROOMS", value: json.dmList });
  //   };
  //   chatSocket.on("chat_get_DMlist", ChatGetDmRoomList);

  //   return () => {
  //     chatSocket.off("chat_get_DMlist", ChatGetDmRoomList);
  //   };
  // }, []);

  const OnClick = (isNotDm: boolean) => {
    setDisabled(isNotDm);
  };

  const NonDmBtnClick = () => {
    // chatSocket.emit("chat_get_roomlist", (status_code: number) => {
    //   console.log(status_code);
    // });
    OnClick(true);
  };

  const DmBtnClick = () => {
    // chatSocket.emit("chat_get_DMlist", JSON.stringify({userNickname : string, userIdx : number}), (status_code: number) => {
    //   console.log(status_code);
    // });
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
