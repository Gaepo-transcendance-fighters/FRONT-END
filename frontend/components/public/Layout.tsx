"use client";

import { CardContent, Stack, Box, Button } from "@mui/material";
import FriendList, { IFriend } from "../main/friend_list/FriendList";
import RoomList from "../main/room_list/RoomList";
import ChatWindow from "../main/chat_window/ChatWindow";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import Myprofile from "../main/myprofile/MyProfile";
import GameStartButton from "../game/GameStartButton";
import InviteGame from "../main/InviteGame/InviteGame";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRoom } from "@/context/RoomContext";
// import { socket } from "@/app/layout";

export const main = {
  main0: "#67DBFB",
  main1: "#55B7EB",
  main2: "#4292DA",
  main3: "#2C70DD",
  main4: "#265ECF",
  main5: "#214C97",
  main6: "#183C77",
};

export enum Mode {
  PRIVATE = "private",
  PUBLIC = "public",
  PROTECTED = "protected",
}

export interface IChatRoom0 {
  channelIdx: number;
  owner: string;
  mode: Mode;
}

export const mockChatRoomList0: IChatRoom0[] = [
  {
    channelIdx: 0,
    owner: "jeekim",
    mode: Mode.PUBLIC,
  },
  {
    channelIdx: 1,
    owner: "jaekim",
    mode: Mode.PROTECTED,
  },
  {
    channelIdx: 2,
    owner: "0123456789",
    mode: Mode.PROTECTED,
  },
  {
    channelIdx: 3,
    owner: "bbbbbbbbbb",
    mode: Mode.PUBLIC,
  },
  {
    channelIdx: 4,
    owner: "0123456789",
    mode: Mode.PROTECTED,
  },
  {
    channelIdx: 5,
    owner: "zzzzzzzzzz",
    mode: Mode.PROTECTED,
  },
];

const Layout = () => {
  const { isLoggedIn } = useAuth();
  const { setRooms } = useRoom();

  // useEffect(() => {
  //   const MainEnter = (json) => {
  //     setRooms(json.channelList);
  //   };
  //   socket.on("main_enter", MainEnter, json);

  //   return () => {
  //     socket.off("main_enter", MainEnter, json);
  //   };
  // }, []);

  // useRequireAuth();

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     socket.emit("main_enter", "intra_id", 상태코드);
  //   }
  // }, [isLoggedIn]);

  // socket.io로 mock data 받았다고 가정했을때.
  useEffect(() => {
    setRooms({ type: "main-enter", payload: mockChatRoomList0 });
  }, []);
  // socket 부분 다 주석처리하고, 이 부분 주석해제하면 웹페이지 정상적으로 띄워짐

  return (
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
  );
};

export default Layout;
