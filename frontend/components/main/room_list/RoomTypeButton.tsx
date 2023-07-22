"use client";

import { useEffect, useState, Dispatch, SetStateAction } from "react";
import List from "./List";
import { IFriend } from "../friend_list/FriendList";

export interface IChatRoom {
  channelIdx: number;
  owner: string;
  mems: Array<IFriend>;
  // members: Array<string>;
  channelType: chatRoomType;
  password: string;
}

export enum chatRoomType {
  dm,
  nonDm,
}

export enum permissonType {
  normal,
  owner,
  admin,
  ban,
}

// {
//   name: string;
//   isOnline: boolean;
//   imgUrl: string;
// }
export const mockChatRoomList: IChatRoom[] = [
  {
    channelIdx: 0,
    owner: "hoslim",
    mems: [{ name: "hoslim", isOnline: true, imgUrl: "" }],
    channelType: chatRoomType.dm,
    password: "",
  },
  {
    channelIdx: 0,
    owner: "jeekim",
    mems: [{ name: "jeekim", isOnline: true, imgUrl: "" }],
    channelType: chatRoomType.nonDm,
    password: "0000",
  },
  {
    channelIdx: 1,
    owner: "jaekim",
    mems: [
      { name: "jaekim", isOnline: true, imgUrl: "" },
      { name: "haryu", isOnline: false, imgUrl: "" },
      { name: "wochae", isOnline: true, imgUrl: "" },
      { name: "jaekim", isOnline: true, imgUrl: "" },
      { name: "haryu", isOnline: false, imgUrl: "" },
      { name: "wochae", isOnline: true, imgUrl: "" },
    ],
    channelType: chatRoomType.nonDm,
    password: "0000",
  },
  {
    channelIdx: 2,
    owner: "0123456789",
    mems: [
      { name: "0123456789", isOnline: false, imgUrl: "" },
      { name: "cccccccccc", isOnline: true, imgUrl: "" },
    ],
    channelType: chatRoomType.nonDm,
    password: "",
  },
  {
    channelIdx: 1,
    owner: "aaaaaaaaaa",
    mems: [
      { name: "aaaaaaaaaa", isOnline: false, imgUrl: "" },
      { name: "2hoslim", isOnline: true, imgUrl: "" },
    ],
    channelType: chatRoomType.dm,
    password: "",
  },
  {
    channelIdx: 3,
    owner: "bbbbbbbbbb",
    mems: [
      { name: "bbbbbbbbbb", isOnline: false, imgUrl: "" },
      { name: "2jeekim", isOnline: false, imgUrl: "" },
    ],
    channelType: chatRoomType.nonDm,
    password: "0000",
  },
  {
    channelIdx: 4,
    owner: "0123456789",
    mems: [
      { name: "2jaekim", isOnline: false, imgUrl: "" },
      { name: "haryu", isOnline: false, imgUrl: "" },
    ],
    channelType: chatRoomType.nonDm,
    password: "0000",
  },
  {
    channelIdx: 5,
    owner: "zzzzzzzzzz",
    mems: [
      { name: "zzzzzzzzzz", isOnline: true, imgUrl: "" },
      { name: "2hoslimh", isOnline: false, imgUrl: "" },
    ],
    channelType: chatRoomType.nonDm,
    password: "",
  },
];

export default function RoomTypeButton({
  showPtcptsList,
  setShowPtcptsList,
}: {
  showPtcptsList: boolean;
  setShowPtcptsList: Dispatch<SetStateAction<boolean>>;
}) {
  const [nonDmrooms, setNonDmRooms] = useState<IChatRoom[]>([]);
  const [dmRooms, setDmRooms] = useState<IChatRoom[]>([]);
  const [disabled, setDisabled] = useState(true);

  const DivideRoom = () => {
    mockChatRoomList.map((room) => {
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
  };

  useEffect(() => {
    DivideRoom();
  }, []);

  const OnClick = (isNotDm: boolean) => {
    setNonDmRooms([]);
    setDmRooms([]);
    DivideRoom();

    setDisabled(isNotDm);
  };

  const NonDmBtnClick = () => {
    OnClick(true);
  };

  const DmBtnClick = () => {
    OnClick(false);
  };

  return (
    <>
      <div>
        <button
          className="notdm typebutton"
          onClick={NonDmBtnClick}
          disabled={disabled}
        >
          Public / Protected
        </button>
        <button
          className="dm typebutton"
          onClick={DmBtnClick}
          disabled={!disabled}
        >
          DM
        </button>
      </div>
      <List
        roomsProp={disabled ? nonDmrooms : dmRooms}
        channelType={disabled}
        showPtcptsList={showPtcptsList}
        setShowPtcptsList={setShowPtcptsList}
      />
    </>
  );
}
