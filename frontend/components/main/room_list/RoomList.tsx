"use client";

import { useState } from "react";
import { Card, CardContent } from "@mui/material";
import Title from "./Title";
import RoomTypeButton from "./RoomTypeButton";
import { main } from "@/font/color";

export default function RoomList() {
  const [showMembersList, setShowMembersList] = useState(false);
  return (
    <>
      <Card sx={{ margin: 1, borderRadius: "10px" }}>
        <CardContent
          id="portal"
          sx={{ "&:last-child": { pb: 0 }, backgroundColor: main.main2 }}
          className={showMembersList ? "memactivate" : "memdeactivate"}
        ></CardContent>
      </Card>
      <Card
        sx={{
          backgroundColor: main.main2,
          marginLeft: 1,
          marginRight: 1,
          marginBottom: 1,
          borderRadius: "10px",
        }}
      >
        <CardContent>
          <Title title={"chatroomlist"} text={"Chat Room List"} />
          <RoomTypeButton />
        </CardContent>
      </Card>
    </>
  );
}
