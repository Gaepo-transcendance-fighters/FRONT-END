"use client";

import { Card, CardContent, Stack } from "@mui/material";
import FriendList from "../main/friend_list/FriendList";

const Layout = () => {
  return (
    <Card sx={{ display: "flex" }}>
      <Stack sx={{ width: "20vw", height: "100vh", backgroundColor: "yellow" }}>
        <CardContent sx={{ height: "35vh", backgroundColor: "brown" }}>
          my profile
        </CardContent>
        <FriendList />
      </Stack>
      <Stack sx={{ width: "60vw", height: "100vh", backgroundColor: "green" }}>
        <CardContent sx={{ height: "35vh", backgroundColor: "blue" }}>
          game start
        </CardContent>
        <CardContent>chatting window</CardContent>
      </Stack>
      <CardContent
        sx={{ width: "20vw", height: "100vh", backgroundColor: "magenta" }}
      >
        room list
      </CardContent>
    </Card>
  );
};

export default Layout;
