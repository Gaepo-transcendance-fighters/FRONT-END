// use client;
import { useEffect, useState } from "react";
import { mockChatRoomList } from "./RoomTypeButton";
import { chatRoomType } from "./RoomTypeButton";
import {IChatRoom} from "./RoomTypeButton";

import "@/components/main/room_list/RoomList.css";

export default function List({roomsProp, channelType}:{roomsProp :IChatRoom[],channelType:boolean }) {
  return (
    <div className="list">
      {channelType ? <button className="add">+</button> : ""}
      {
      roomsProp.map((room) => {
        return <button className="item">{room.participants}</button>;
      })
      }
    </div>
  );
}
