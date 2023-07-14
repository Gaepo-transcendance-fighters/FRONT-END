"use client";

import { Card, CardContent, Stack } from "@mui/material";
import FriendList from "../main/friend_list/FriendList";
import GameStartButton from "../gameStartButton/GameStartButton";
import ModalBasic from "../main/myprofile/ModalBasic";
import Modal from "../main/myprofile/Modal";
import Myprofile from "../main/myprofile/MyProfile";
import RoomList from "../main/room_list/RoomList";
import ChatWindow from "../chat_window/ChatWindow";

const Layout = () => {
  return (
    <Card sx={{ display: "flex" }}>
      <Stack
        sx={{
          width: "20vw",
          height: "100vh",
          backgroundColor: "#4270d6",
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
          backgroundColor: "#6EC2F5",
          padding: 0,
          margin: 0,
        }}
      >
        <CardContent sx={{ height: "35vh", backgroundColor: "blue" }}>
          game start
          <GameStartButton />
        </CardContent>
        <ChatWindow/>
      </Stack>

      <Stack
        sx={{
          width: "20vw",
          height: "100vh",
          backgroundColor: "#3171dd",
          padding: 0,
          margin: 0,
        }}
      >
        {/* <CardContent sx={{ height: "35vh", backgroundColor: "purple" }}>
          room member
        </CardContent> */}
        <CardContent sx={{ "&:last-child": { pb: 0 } }}>
          <RoomList />
        </CardContent>
      </Stack>
    </Card>
  );
};

export default Layout;
