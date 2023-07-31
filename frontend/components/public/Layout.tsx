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
import { IChatRoom, chatRoomType } from "../main/room_list/RoomTypeButton";
import { useAuth } from "@/context/AuthContext";
import { socket } from "@/app/layout";

export const main = {
  main0: "#67DBFB",
  main1: "#55B7EB",
  main2: "#4292DA",
  main3: "#2C70DD",
  main4: "#265ECF",
  main5: "#214C97",
  main6: "#183C77",
};
/*// emit - client
{
	friendList[]? {
		friend {
			friendNickname? : string,
			isOnline : boolean,
    },
    ...
  }
  channelList[]? {
    channel {
      owner : string,
      channelIdx : number,
      mode : enum
    },
    ...
  }
  dmList[]? {
    dmChannel {
      targetNickname : string,
      targetIdx : number,
    },
    ...
  }
  blockList[]?{
    blockedPerson {
      targetNickname : string,
      targetIdx : number,
    },
    ...
  },
  userObject {
	  imgUri : string,
	  myNickname : string,
    userIdx : number,
	}
}
*/
export enum Mode {
  PRIVATE = 'private',
  PUBLIC = 'public',
  PROTECTED = 'protected'
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
    mode: Mode.PUBLIC,
  },
  {
    channelIdx: 5,
    owner: "zzzzzzzzzz",
    mode: Mode.PROTECTED,
  },
];

const Layout = () => {
  const [friendList, setFriendList] = useState<IFriend[]>([]);
  const [chatRoomList, setChatRoomList] = useState<IChatRoom0[]>([]);
  const [blockList, setBlockList] = useState<IFriend[]>([]);

  const { isLoggedIn } = useAuth();

  // useEffect(() => {
  //   const MainEnter = (json) => {
  //     setFriendList(json.friendList); //
  //     setChatRoomList(json.channelList);
  //     setBlockList(json.blockList); //
  //     setUser(json.userObject); //
  //   };
  //   socket.on("main_enter", MainEnter, json);

  //   return () => {
  //     socket.off("main_enter", MainEnter, json);
  //   };
  // }, []);
  useEffect(() => {
    setChatRoomList(mockChatRoomList0);
  },[]);
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
        <RoomList chatRoomList={chatRoomList} />
      </Stack>
    </Box>
  );
};

export default Layout;
