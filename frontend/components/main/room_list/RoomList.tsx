"use client";

import { useState } from "react";
import { Card, CardContent } from "@mui/material";
import Title from "./Title";
import RoomTypeButton from "./RoomTypeButton";
import { IChatRoom } from "./RoomTypeButton";
import { main } from "@/font/color";
import { IChatRoom0 } from "@/components/public/Layout";

export default function RoomList({chatRoomList} : {chatRoomList: IChatRoom0[]}) {
  const [showMembersList, setShowMembersList] = useState(false);
  return (
    <>
      <CardContent
        id="portal"
        sx={{ pb: 0 }}
        className={showMembersList ? "memactivate" : "memdeactivate"}
      ></CardContent>
      <CardContent sx={{ "&:last-child": { pb: 0 } }}>
        <Title title={"chatroomlist"} text={"Chat Room List"} />
        <RoomTypeButton
          showMembersList={showMembersList}
          setShowMembersList={setShowMembersList}
          chatRoomList={chatRoomList}
        />
      </CardContent>
    </>
  );
}
