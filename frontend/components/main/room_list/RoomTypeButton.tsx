// use client;

import { useEffect, useState, useRef } from "react";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import List from "./List";

// dm 이냐 아니냐
//          V
// pw 있냐 없냐
//         V = public
//     V = protected

export interface IChatRoom {
  channelIdx: number;
  participants: Array<string>;
  channelType: chatRoomType;
  password: string;
}

export enum chatRoomType {
  dm,
  nonDm,
}

export const mockChatRoomList: IChatRoom[] = [
  {
    channelIdx: 0,
    participants: ["hoslim"],
    channelType: chatRoomType.dm,
    password: "",
  },
  {
    channelIdx: 1, // dm은 channelIdx !dm이랑 따로 한다 했나?
    participants: ["jeekim"],
    channelType: chatRoomType.nonDm,
    password: "asdf",
  },
  {
    channelIdx: 2,
    participants: ["jaekim", "haryu", "wochae"],
    channelType: chatRoomType.nonDm,
    password: "qwer",
  },
  {
    channelIdx: 3,
    participants: ["hoslimhoslim1231231231231231231231231"],
    channelType: chatRoomType.nonDm,
    password: "",
  },
  {
    channelIdx: 4,
    participants: ["2hoslim"],
    channelType: chatRoomType.dm,
    password: "",
  },
  {
    channelIdx: 5, // dm은 channelIdx !dm이랑 따로 한다 했나?
    participants: ["2jeekim"],
    channelType: chatRoomType.nonDm,
    password: "asdf",
  },
  {
    channelIdx: 6,
    participants: ["2jaekim", "haryu", "wochae"],
    channelType: chatRoomType.nonDm,
    password: "qwer",
  },
  {
    channelIdx: 7,
    participants: ["2hoslimhoslim1231231231231231231231231"],
    channelType: chatRoomType.nonDm,
    password: "",
  },
];

export default function RoomTypeButton() {
  const [nonDmrooms, setNonDmRooms] = useState<IChatRoom[]>([]);
  const [dmRooms, setDmRooms] = useState<IChatRoom[]>([]);
  const [nonDmDisabled, setNonDmDisabled] = useState(true);
  const [dmDisabled, setDmDisabled] = useState(false);
  const roomTypeRef = useRef(true);
  const DivideRoom = () => {
    mockChatRoomList.map((room, idx) => {
      if (room.channelType != chatRoomType.dm) {
        setNonDmRooms((prev) => {
          return [...prev, room];
        });
      } else {
        setDmRooms((prev) => {
          return [...prev, room];
        });
      }
    });
  }
  useEffect(() => {
    DivideRoom();
  }, []);
  const NonDmBtnClick = () => {
    setNonDmRooms([]);
    setDmRooms([]);
    DivideRoom();
    
    roomTypeRef.current = true;
    setNonDmDisabled((prev) => !prev);
    setDmDisabled(false);
  };
  const DmBtnClick = () => {
    setNonDmRooms([]);
    setDmRooms([]);
    DivideRoom();

    roomTypeRef.current = false;
    setNonDmDisabled(false);
    setDmDisabled(true);
  };

  return (
    <>
      <div>
        <button
          className="notdm typebutton"
          onClick={NonDmBtnClick}
          disabled={nonDmDisabled}
        >
          Public / Protected
        </button>
        <button
          className="dm typebutton"
          onClick={DmBtnClick}
          disabled={dmDisabled}
        >
          DM
        </button>
      </div>
      <List roomsProp={roomTypeRef.current ? nonDmrooms : dmRooms} channelType={roomTypeRef.current} />
    </>
  );
}
