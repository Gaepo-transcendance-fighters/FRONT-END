"use client";

import { IChatRoom } from "./RoomType";

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

export enum GameType {
  FRIEND,
  NORMAL,
  RANK,
}

export interface IFriend {
  friendNickname: string;
  friendIdx: number;
  isOnline: boolean;
}

export interface IFriendData {
  targetNickname: string;
  imgUri: string;
  rank: number;
  win: number;
  lose: number;
  isOnline: boolean;
}

export interface FriendReqData {
  myIdx: number;
  targetNickname: string;
  targetIdx: number;
}

// export interface IUserProp {
//   friendNickname?: string;
//   friendIdx?: number;
//   isOnline?: boolean;
//   userNickname?: string;
//   userIdx?: number;
// }

export interface IUserObject {
  imgUri: string;
  nickname: string;
  userIdx: number;
}

export interface IMaindata {
  channelList: IChatRoom[];
  friendList: IFriend[];
  blockList: IChatBlock[];
  userObject: IUserObject;
}

export interface ICor {
  x: number;
  y: number;
}

export interface IPaddle extends ICor {}

export interface IBall extends ICor {}

export const friendProfileModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 700,
  bgcolor: "#65d9f9",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export interface IChatBlock {
  blockedIntra: string;
  blockedUserIdx: number;
}

export interface IChat {
  channelIdx: number | undefined;
  senderIdx: number | undefined;
  sender?: string;
  msg: string;
  msgDate: string;
}