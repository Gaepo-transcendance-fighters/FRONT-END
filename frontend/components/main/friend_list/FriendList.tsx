"use client";

import { Button, Card, CardContent, Typography, Stack } from "@mui/material";
import Friend from "./Friend";

export interface IFriend {
  name: string;
  isOnline: boolean;
}

const mockFriendList: IFriend[] = [
  {
    name: "hoslim",
    isOnline: true,
  },
  {
    name: "jeekim",
    isOnline: true,
  },
  {
    name: "jaekim",
    isOnline: false,
  },
  {
    name: "hoslimhoslim1231231231231231231231231",
    isOnline: true,
  },
];

const FriendList = () => {
  return (
    <>
      <CardContent
        sx={{
          flex: 1,
          padding: 0,
          height: "55vh",
          backgroundColor: "#1c4361",
        }}
      >
        <Typography sx={{ margin: 1 }} color={"#ffffff"}>
          친구 리스트
        </Typography>
        <>
          {mockFriendList.map((friend, idx) => (
            <Friend key={idx} prop={friend} />
          ))}
        </>
      </CardContent>
    </>
  );
};

export default FriendList;
