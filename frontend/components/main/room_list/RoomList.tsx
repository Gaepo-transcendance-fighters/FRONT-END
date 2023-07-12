"use client";

import Title from "./Title";
import RoomTypeButton from "./RoomTypeButton";
import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
export default function RoomList() {
  const [showFriendList, setShowFriendList] = useState(false);
  useEffect(() => {
    console.log("showFriendList has changed to ", showFriendList);
  }, [showFriendList]);
  return (
    <>
      <CardContent
        sx={{
          backgroundColor: "magenta",
        }}
        className={showFriendList ? "flactivate" : "fldeactivate"}
      ></CardContent>
      <CardContent sx={{ "&:last-child": { pb: 0 } }}>
        <Title />
        <RoomTypeButton
          showFriendList={showFriendList}
          setShowFriendList={setShowFriendList}
        />
      </CardContent>
    </>
  );
}
