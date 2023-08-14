"use client";

import { CardContent, Stack, Box, Button } from "@mui/material";
import FriendList from "../main/friend_list/FriendList";
import RoomList from "../main/room_list/RoomList";
import ChatWindow from "../main/chat_window/ChatWindow";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import Myprofile from "../main/myprofile/MyProfile";
import GameStartButton from "../game/GameStartButton";
import io from "socket.io-client";
import InviteGame from "../main/InviteGame/InviteGame";
import WaitAccept from "../main/InviteGame/WaitAccept";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRoom } from "@/context/RoomContext";
import { UserProvider, useUser } from "@/context/UserContext";
<<<<<<< HEAD
import { chatSocket } from "@/app/page";
=======
>>>>>>> aac5bb08f4a1a5e41062ebeba502c43e7a5756c9
import { useFriend } from "@/context/FriendContext";
import { socket } from "@/app/page";

export const main = {
  main0: "#67DBFB",
  main1: "#55B7EB",
  main2: "#4292DA",
  main3: "#2C70DD",
  main4: "#265ECF",
  main5: "#214C97",
  main6: "#183C77",
  main7: "#48a0ed",
  main8: "#64D9F9",
};

export enum Permission {
  OWNER = "owner",
  ADMIN = "admin",
  MEMBER = "member",
}

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

interface IFriend {
  friendNickname: string;
  isOnline: boolean;
}

interface IBlock {
  targetNickname: string;
  targetIdx: number;
}

interface IUserObject {
  imgUri: string;
  nickname: string;
  userIdx: number;
}
interface IMaindata {
  channelList: IChatRoom0[];
  friendList: IFriend[];
  blockList: IBlock[];
  userObject: IUserObject;
}

const Layout = () => {
<<<<<<< HEAD
  const { authState } = useAuth();
  const { roomDispatch } = useRoom();
=======
  const { state } = useAuth();
  const { roomState, roomDispatch } = useRoom();
>>>>>>> aac5bb08f4a1a5e41062ebeba502c43e7a5756c9
  const { friendState, friendDispatch } = useFriend();
  const { userState, userDispatch } = useUser();

  useRequireAuth();

  useEffect(() => {
    const MainEnter = (data: any) => {
      console.log(data);
      roomDispatch({ type: "SET_NON_ROOMS", value: data.channelList });
      friendDispatch({ type: "SET_FRIENDLIST", value: data.friendList });
      friendDispatch({ type: "SET_BLOCKLIST", value: data.blockList });
      userDispatch({ type: "CHANGE_IMG", value: data.userObject.imgUri });
      userDispatch({
        type: "CHANGE_NICK_NAME",
        value: data.userObject.nickname,
      });
      userDispatch({ type: "SET_USER_IDX", value: data.userObject.userIdx });
    };

    chatSocket.on("main_enter", MainEnter);

    return () => {
      chatSocket.off("main_enter", MainEnter);
    };
  }, []);
  //chatSocket에서 값을 받아와도 dispatch 하는 시간동안 값은 비어있으므로 내부에서 값을 찍어도 안나옴.
  //미세한 찰나일 것임.!

  useEffect(() => {
    if (authState.isLoggedIn) {
      // console.log("in emit");
      chatSocket.emit(
        "main_enter",
        JSON.stringify({ intra: "hoslim" }),
        (data: IMaindata) => {
          // roomDispatch({ type: "SET_NON_ROOMS", value: data.channelList });
          // friendDispatch({ type: "SET_FRIENDLIST", value: data.friendList });
          // friendDispatch({ type: "SET_BLOCKLIST", value: data.blockList });
          // userDispatch({ type: "CHANGE_IMG", value: data.userObject.imgUri });
          // userDispatch({
          //   type: "CHANGE_NICK_NAME",
          //   value: data.userObject.nickname,
          // });
          // userDispatch({
          //   type: "SET_USER_IDX",
          //   value: data.userObject.userIdx,
          // });
        }
      );
    }
<<<<<<< HEAD
  }, [authState.isLoggedIn]);
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     chatSocket.emit("main_enter", "intra_id", 상태코드);
  //   }
  // }, [isLoggedIn]);

  // chatSocket.io로 mock data 받았다고 가정했을때.
  // useEffect(() => {
  //   setRooms({ type: "main-enter", payload: mockChatRoomList0 });
  // }, []);
  // chatSocket 부분 다 주석처리하고, 이 부분 주석해제하면 웹페이지 정상적으로 띄워짐
=======
  }, [state.isLoggedIn]);
>>>>>>> aac5bb08f4a1a5e41062ebeba502c43e7a5756c9

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
          {/* <Myprofile Img={소켓으로받아온 imguri링크} Nickname={소켓으로받아온 닉네임}/> */}
          {/* <InviteGame /> */}
          {/* <WaitAccept /> */}
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
