"use client";

import {
  Card,
  CardContent,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import FriendList from "../main/friend_list/FriendList";
import RoomList from "../main/room_list/RoomList";
import ChatWindow from "../chat_window/ChatWindow";
import GameStartButton from "../gameStartButton/GameStartButton";
import Myprofile from "../main/myprofile/MyProfile";

const font = createTheme({
  typography: {
    fontFamily: "neodgm",
  },
});

const Layout = () => {
  return (
    <ThemeProvider theme={font}>
      <Card sx={{ display: "flex" }}>
        <Stack
          sx={{
            width: "20vw",
            height: "100vh",
            backgroundColor: "#3478c5",
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
      </Card>
    </ThemeProvider>
  );
};

export default Layout;
