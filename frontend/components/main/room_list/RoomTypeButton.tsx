// use client;

import { useEffect, useState } from "react";
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import List from "./List";

export interface IChatRoom {
  channelIdx : number,
  participants : Array<string>,
  channelType : chatRoomType,
}

export enum chatRoomType {
  dm,
  public,
  protected
}

export const mockChatRoomList: IChatRoom[] = [
  {
    channelIdx : 0,
    participants: ["hoslim"],
    channelType: chatRoomType.dm,
  },
  {
    channelIdx : 1, // dm은 channelIdx !dm이랑 따로 한다 했나?
    participants: ["jeekim"],
    channelType: chatRoomType.public,
  },
  {
    channelIdx : 2,
    participants: ["jaekim", "haryu", "wochae"],
    channelType: chatRoomType.protected,
  },
  {
    channelIdx : 3,
    participants: ["hoslimhoslim1231231231231231231231231"],
    channelType: chatRoomType.protected,
  },
  {
    channelIdx : 0,
    participants: ["hoslim"],
    channelType: chatRoomType.dm,
  },
  {
    channelIdx : 1, // dm은 channelIdx !dm이랑 따로 한다 했나?
    participants: ["jeekim"],
    channelType: chatRoomType.public,
  },
  {
    channelIdx : 2,
    participants: ["jaekim", "haryu", "wochae"],
    channelType: chatRoomType.protected,
  },
  {
    channelIdx : 3,
    participants: ["hoslimhoslim1231231231231231231231231"],
    channelType: chatRoomType.protected,
  },
  {
    channelIdx : 0,
    participants: ["hoslim"],
    channelType: chatRoomType.dm,
  },
  {
    channelIdx : 1, // dm은 channelIdx !dm이랑 따로 한다 했나?
    participants: ["jeekim"],
    channelType: chatRoomType.public,
  },
  {
    channelIdx : 2,
    participants: ["jaekim", "haryu", "wochae"],
    channelType: chatRoomType.protected,
  },
  {
    channelIdx : 3,
    participants: ["hoslimhoslim1231231231231231231231231"],
    channelType: chatRoomType.protected,
  },
];


export default function RoomTypeButton() {
  const [rooms, setRooms] = useState<IChatRoom[]>([]);
  const [nonDmDisabled, setNonDmDisabled] = useState(true);
  const [dmDisabled, setDmDisabled] = useState(false);
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

    setNonDmDisabled(false);
    setDmDisabled(true);
  }

  return (
    <>
      <div>
        <button className="notdm typebutton" onClick={NonDmBtnClick} disabled={nonDmDisabled}>Public / Protected</button>
        <button className="dm typebutton"onClick={DmBtnClick} disabled={dmDisabled}>DM</button>
      </div>
      <List roomsProp={rooms}/>
    </>
  );
}
