"use client";

import Title from "./Title";
import RoomTypeButton from "./RoomTypeButton";
import { CardContent } from "@mui/material";
export default function RoomList() {
  return (
    <>
      <CardContent
        sx={{
          height: "35vh",
          backgroundColor: "magenta",
          "&:last-child": { pb: 0 },
        }}
      >
        1
      </CardContent>
      <CardContent sx={{ "&:last-child": { pb: 0 } }}>
        <Title />
        <RoomTypeButton />
      </CardContent>
    </>
  );
}
