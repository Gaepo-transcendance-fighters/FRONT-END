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
import { IChatRoom } from "../main/room_list/RoomTypeButton";
import { useAuth } from "@/context/AuthContext";
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

const Layout = () => {
  const [friendList, setFriendList] = useState<IFriend[]>([]);
  const [chatRoomList, setChatRoomList] = useState<IChatRoom[]>([]);
  const [blockList, setBlockList] = useState<IFriend[]>([]);

  const { isLoggedIn } = useAuth();

  /*
    owner,
    channelIdx,
    password : true / false
  */

  // useEffect(() => {
  //   const MainEnter = (json) => {
  //     setFriendList(json.friend);
  //     setChatRoomList(json.channel);
  //     setBlockList(json.blockList);
  //   }
  //   socket.on("main_enter", MainEnter, json);

  //   return () => {
  //     socket.off("main_enter", MainEnter, json);
  //   }
  // }, []);

  useRequireAuth();

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     socket.emit("main_enter", "intra_id", 상태코드);
  //   }
  // }, []); // 이거 string일수도있다고 하심

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
        <CardContent sx={{ height: "35vh", backgroundColor: main.main5 }}>
          <Myprofile />
          <InviteGame />;
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
        <CardContent sx={{ height: "35vh", backgroundColor: main.main2 }}>
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
        <RoomList chatRoomList={chatRoomList} />
      </Stack>
    </Box>
  );
};

export default Layout;
