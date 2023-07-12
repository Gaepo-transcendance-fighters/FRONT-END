"use client";

import { Card, CardContent, Stack } from "@mui/material";
import FriendList from "../main/friend_list/FriendList";
import GameStartButton from "../gameStartButton/GameStartButton";
import ModalBasic from "../main/myprofile/ModalBasic";
import Modal from "../main/myprofile/Modal";
import Myprofile from "../main/myprofile/MyProfile";

const Layout = () => {
  return (
    <Card sx={{ display: "flex" }}>
      <Stack
        sx={{
          width: "20vw",
          height: "100vh",
          backgroundColor: "yellow",
          padding: 0,
          margin: 0,
        }}
      >
        <CardContent sx={{ height: "35vh", backgroundColor: "brown" }}>
          my profile
          <Myprofile />
        </CardContent>
        <FriendList />
      </Stack>

      <Stack
        sx={{
          width: "60vw",
          height: "100vh",
          backgroundColor: "green",
          padding: 0,
          margin: 0,
        }}
      >
        <CardContent sx={{ height: "35vh", backgroundColor: "blue" }}>
          game start
          <GameStartButton />
        </CardContent>

        <CardContent>chatting window</CardContent>
      </Stack>

      <Stack
        sx={{
          width: "20vw",
          height: "100vh",
          backgroundColor: "magenta",
          padding: 0,
          margin: 0,
        }}
      >
        <CardContent sx={{ height: "35vh", backgroundColor: "purple" }}>
          room member
        </CardContent>
        <CardContent>room list</CardContent>
      </Stack>
    </Card>
  );
};

export default Layout;
