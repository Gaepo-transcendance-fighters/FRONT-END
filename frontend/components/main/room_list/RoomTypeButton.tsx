// use client;

import { useEffect, useState, useRef } from "react";
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import List from "./List";

// dm 이냐 아니냐
//          V
// pw 있냐 없냐
//         V = public
//     V = protected

export interface IChatRoom {
  channelIdx : number,
  participants : Array<string>,
  channelType : chatRoomType,
  password : string,
}

export enum chatRoomType {
  dm,
  nonDm,
}

export const mockChatRoomList: IChatRoom[] = [
  {
    channelIdx : 0,
    participants: ["hoslim"],
    channelType: chatRoomType.dm,
    password : "",
  },
  {
    channelIdx : 1, // dm은 channelIdx !dm이랑 따로 한다 했나?
    participants: ["jeekim"],
    channelType: chatRoomType.nonDm,
    password : "asdf",
  },
  {
    channelIdx : 2,
    participants: ["jaekim", "haryu", "wochae"],
    channelType: chatRoomType.nonDm,
    password : "qwer",
  },
  {
    channelIdx : 3,
    participants: ["hoslimhoslim1231231231231231231231231"],
    channelType: chatRoomType.nonDm,
    password : "",
  },
  {
    channelIdx : 4,
    participants: ["hoslim"],
    channelType: chatRoomType.dm,
    password : "",
  },
  {
    channelIdx : 5, // dm은 channelIdx !dm이랑 따로 한다 했나?
    participants: ["jeekim"],
    channelType: chatRoomType.nonDm,
    password : "asdf",
  },
  {
    channelIdx : 6,
    participants: ["jaekim", "haryu", "wochae"],
    channelType: chatRoomType.nonDm,
    password : "qwer",
  },
  {
    channelIdx : 7,
    participants: ["hoslimhoslim1231231231231231231231231"],
    channelType: chatRoomType.nonDm,
    password : "",
  },
];


export default function RoomTypeButton() {
  const [rooms, setRooms] = useState<IChatRoom[]>([]);
  const [nonDmDisabled, setNonDmDisabled] = useState(true);
  const [dmDisabled, setDmDisabled] = useState(false);
  // const [roomType, setRoomType] = useState(true); // true - !dm, false - dm
  const roomTypeRef = useRef(true);
  useEffect(() => {
    mockChatRoomList.map((room, idx) => {
      console.log("rooms : ", rooms);
      if (room.channelType != chatRoomType.dm) {
        console.log("room : ", room);
        setRooms((prev) => {return [...prev, room];});
        console.log("after setRooms rooms : ", rooms);
    }
    })
  },[]);
  const NonDmBtnClick = () => {
    setRooms([]);
    roomTypeRef.current = true;
    setNonDmDisabled((prev) => !prev);
    setDmDisabled(false);
    console.log("hi");
    mockChatRoomList.map((room, idx) => {
      console.log("rooms : ", rooms);
      if (room.channelType != chatRoomType.dm) {
        console.log("room : ", room);
        setRooms((prev) => {return [...prev, room];});
        console.log("after setRooms rooms : ", rooms);
    }
    })

  }
  const DmBtnClick = () => {
    setRooms([]);
    roomTypeRef.current = false;
    setNonDmDisabled(false);
    setDmDisabled(true);
  }

  return (
    <>
      <div>
        <button className="notdm typebutton" onClick={NonDmBtnClick} disabled={nonDmDisabled}>Public / Protected</button>
        <button className="dm typebutton" onClick={DmBtnClick} disabled={dmDisabled}>DM</button>
      </div>
      <List roomsProp={rooms} channelType={roomTypeRef.current}/>
    </>
  );
}
