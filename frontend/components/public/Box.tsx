"use client";

import { Card, CardContent, Stack } from "@mui/material";
import GameStartButton from '../gameStartButton/GameStartButton'

const Box = () => {
  return (
    <Card sx={{ display: "flex" }}>
      <CardContent sx={{ flex: 1, height: "100vh", backgroundColor: "yellow" }}>
        friend list
      </CardContent>
      <Stack sx={{ flex: 3, height: "100vh", backgroundColor: "green" }}>
        <CardContent sx={{ height: "35vh", backgroundColor: "White" }}>
          game start
        <GameStartButton />
        </CardContent>

        <CardContent>chatting window</CardContent>
      </Stack>
      <CardContent
        sx={{ flex: 1, height: "100vh", backgroundColor: "magenta" }}
      >
        room list
      </CardContent>
    </Card>
  );
};

export default Box;
