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

export interface IFriend {
  friendNickname: string;
  isOnline: boolean;
}

export interface IBlock {
  targetNickname: string;
  targetIdx: number;
}

export interface IUserObject {
  imgUri: string;
  nickname: string;
  userIdx: number;
}

export interface IMaindata {
  channelList: IChatRoom[];
  friendList: IFriend[];
  blockList: IBlock[];
  userObject: IUserObject;
}
