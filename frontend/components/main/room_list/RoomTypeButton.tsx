// use client;

import { useEffect, useState, useRef, Dispatch, SetStateAction } from "react";
import List from "./List";

// dm 이냐 아니냐
//          V
// pw 있냐 없냐
//         V = public
//     V = protected

export interface IChatRoom {
  channelIdx: number;
  owner: string;
  Ptcpts: Array<string>;
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
    owner: "hoslim",
    Ptcpts: ["hoslim"],
    channelType: chatRoomType.dm,
    password: "",
  },
  {
    channelIdx: 0, // dm은 channelIdx !dm이랑 따로 한다 했나?
    owner: "jeekim",
    Ptcpts: ["jeekim"],
    channelType: chatRoomType.nonDm,
    password: "asdf",
  },
  {
    channelIdx: 1,
    owner: "jaekim",
    Ptcpts: ["jaekim", "haryu", "wochaeefwoijewfoisjdoifjoisdjfoisidjfksjdkl"],
    channelType: chatRoomType.nonDm,
    password: "qwer",
  },
  {
    channelIdx: 2,
    owner: "0123456789",
    Ptcpts: ["hoslimhoslim1231231231231231231231231"],
    channelType: chatRoomType.nonDm,
    password: "",
  },
  {
    channelIdx: 1,
    owner: "aaaaaaaaaa",
    Ptcpts: ["2hoslim"],
    channelType: chatRoomType.dm,
    password: "",
  },
  {
    channelIdx: 3, // dm은 channelIdx !dm이랑 따로 한다 했나?
    owner: "bbbbbbbbbb",
    Ptcpts: ["2jeekim"],
    channelType: chatRoomType.nonDm,
    password: "asdf",
  },
  {
    channelIdx: 4,
    owner: "0123456789",
    Ptcpts: ["2jaekim", "haryu", "wochae"],
    channelType: chatRoomType.nonDm,
    password: "qwer",
  },
  {
    channelIdx: 5,
    owner: "zzzzzzzzzz",
    Ptcpts: ["2hoslimhoslim1231231231231231231231231"],
    channelType: chatRoomType.nonDm,
    password: "",
  },
];

// export default function RoomTypeButton({ ShowPtcptsList, setShowPtcptsList }: { ShowPtcptsList: boolean, setShowPtcptsList:Dispatch<SetStateAction<boolean>> }) {
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
        showPtcptsList={showPtcptsList}
        setShowPtcptsList={setShowPtcptsList}
      />
    </>
  );
}