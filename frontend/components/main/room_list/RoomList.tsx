"use client";

import Title from "./Title";
import RoomTypeButton from "./RoomTypeButton";
import { CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import ChatPtcptsList from "../chat_participants_list/ChatPtcptsList";

export default function RoomList() {
  const [showPtcptsList, setShowPtcptsList] = useState(false);
  useEffect(() => {
    console.log("showPtcptsList has changed to ", showPtcptsList);
  }, [showPtcptsList]);
  return (
    <>
      {/* {showPtcptsList ? <CardContent id="portal" className="flactivate"></CardContent> : ""} */}
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
