"use client";

import { useState } from "react";
import { CardContent } from "@mui/material";
import Title from "./Title";
import RoomTypeButton from "./RoomTypeButton";

export default function RoomList() {
  const [showPtcptsList, setShowPtcptsList] = useState(false);
  return (
    <>
      <CardContent
        id="portal"
        sx={{ pb: 0 }}
        className={showPtcptsList ? "flactivate" : "deflactivate"}
      ></CardContent>
      <CardContent sx={{ "&:last-child": { pb: 0 } }}>
        <Title title={"chatroomlist"} text={"Chat Room List"} />
        <RoomTypeButton
          showPtcptsList={showPtcptsList}
          setShowPtcptsList={setShowPtcptsList}
        />
      </CardContent>
    </>
  );
}
