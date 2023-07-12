// use client;

import { useEffect, useState, useRef } from "react";
import List from "./List";
// todo : 인덱스 누가만든방 자물쇠
// todo : 비번 길이, 닉네임 길이(10자) 정하기
// todo : issue에 방이 999개 넘어가면 어떻게 할건지 정하기
// todd : issue에 닉네임 영어로만 되게 하기, 사이트 다 영어로 구성(exception : 도움말, 채팅 등) ex) ~님의 방 대신 's room 같이 영어로 통일

// dm 이냐 아니냐
//          V
// pw 있냐 없냐
//         V = public
//     V = protected

export interface IChatRoom {
  channelIdx: number;
  owner: string;
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
    owner : "hoslim",
    participants: ["hoslim"],
    channelType: chatRoomType.dm,
    password: "",
  },
  {
    channelIdx: 0, // dm은 channelIdx !dm이랑 따로 한다 했나?
    owner : "jeekim",
    participants: ["jeekim"],
    channelType: chatRoomType.nonDm,
    password: "asdf",
  },
  {
    channelIdx: 1,
    owner : "jaekim",
    participants: ["jaekim", "haryu", "wochaeefwoijewfoisjdoifjoisdjfoisidjfksjdkl"],
    channelType: chatRoomType.nonDm,
    password: "qwer",
  },
  {
    channelIdx: 2,
    owner : "0123456789",
    participants: ["hoslimhoslim1231231231231231231231231"],
    channelType: chatRoomType.nonDm,
    password: "",
  },
  {
    channelIdx: 1,
    owner : "aaaaaaaaaa",
    participants: ["2hoslim"],
    channelType: chatRoomType.dm,
    password: "",
  },
  {
    channelIdx: 3, // dm은 channelIdx !dm이랑 따로 한다 했나?
    owner : "bbbbbbbbbb",
    participants: ["2jeekim"],
    channelType: chatRoomType.nonDm,
    password: "asdf",
  },
  {
    channelIdx: 4,
    owner : "0123456789",
    participants: ["2jaekim", "haryu", "wochae"],
    channelType: chatRoomType.nonDm,
    password: "qwer",
  },
  {
    channelIdx: 5,
    owner : "zzzzzzzzzz",
    participants: ["2hoslimhoslim1231231231231231231231231"],
    channelType: chatRoomType.nonDm,
    password: "",
  },
];

export default function RoomTypeButton() {
  const [nonDmrooms, setNonDmRooms] = useState<IChatRoom[]>([]);
  const [dmRooms, setDmRooms] = useState<IChatRoom[]>([]);
  const [disabled, setDisabled] = useState(true);
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
      />
    </>
  );
}
