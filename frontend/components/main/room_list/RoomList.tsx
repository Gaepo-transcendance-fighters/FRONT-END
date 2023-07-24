"use client";

import Title from "./Title";
import RoomTypeButton from "./RoomTypeButton";
import { CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import ChatPtcptsList from "../chat_participants_list/ChatPtcptsList";

export default function RoomList() {
  const [showPtcptsList, setShowPtcptsList] = useState(false);
  useEffect(() => {}, [showPtcptsList]);
  return (
    <>
      {showPtcptsList ? (
        <>
          <CardContent
            sx={{
              backgroundColor: "rgb(22, 181, 238)",
            }}
            className="flactivate"
          >
            <ChatPtcptsList />
          </CardContent>
        </>
      ) : (
        ""
      )}

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
