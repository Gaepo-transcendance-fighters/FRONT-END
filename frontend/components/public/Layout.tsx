"use client";

import { CardContent, Stack, Box, Button } from "@mui/material";
import FriendList from "../main/friend_list/FriendList";
import RoomList from "../main/room_list/RoomList";
import ChatWindow from "../main/chat_window/ChatWindow";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import Myprofile from "../main/myprofile/MyProfile";
import GameStartButton from "../game/GameStartButton";
import InviteGame from "../main/InviteGame/InviteGame";
import { useAuth } from "@/context/AuthContext";

export const main = {
  main0: "#67DBFB",
  main1: "#55B7EB",
  main2: "#4292DA",
  main3: "#2C70DD",
  main4: "#265ECF",
  main5: "#214C97",
  main6: "#183C77",
};

const Layout = () => {
  const { state } = useAuth();
  useRequireAuth();

  return (
    <>
      {!state.isLoggedIn ? (
        <div></div>
      ) : (
        <Box sx={{ display: "flex" }}>
          <Stack
            sx={{
              width: "20vw",
              height: "100vh",
              padding: 0,
              margin: 0,
            }}
          >
            <CardContent
              sx={{
                height: "35vh",
                ml: 1,
                mr: 1,
                mt: 1,
                backgroundColor: "#4292DA",
                borderRadius: "10px",
              }}
            >
              <Myprofile />
            </CardContent>
            <FriendList />
          </Stack>

          <Stack
            sx={{
              width: "60vw",
              height: "100vh",
              padding: 0,
              margin: 0,
            }}
          >
            <CardContent sx={{ height: "37vh" }}>
              <GameStartButton />
            </CardContent>
            <ChatWindow />
          </Stack>

          <Stack
            sx={{
              width: "20vw",
              height: "100vh",
              padding: 0,
              margin: 0,
            }}
          >
            <RoomList />
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Layout;
