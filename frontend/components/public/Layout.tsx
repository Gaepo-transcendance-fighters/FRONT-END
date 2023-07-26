"use client";

import { CardContent, Stack, Box } from "@mui/material";
import FriendList from "../main/friend_list/FriendList";
import RoomList from "../main/room_list/RoomList";
import ChatWindow from "../main/chat_window/ChatWindow";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import GameStartButton from "../gameStartButton/GameStartButton";
import Myprofile from "../main/myprofile/MyProfile";

const Layout = () => {
  useRequireAuth();
  return (
    <Box sx={{ display: "flex" }}>
      <Stack
        sx={{
          width: "20vw",
          height: "100vh",
          backgroundColor: "#3478c5",
          padding: 0,
          margin: 0,
        }}
      >
        <CardContent sx={{ height: "35vh", backgroundColor: "#253F8A" }}>
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
        </CardContent>
        <ChatWindow />
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
        <RoomList />
      </Stack>
    </Box>
  );
};

export default Layout;
