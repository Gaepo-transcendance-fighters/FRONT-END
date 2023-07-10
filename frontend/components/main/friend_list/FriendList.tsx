"use client";

import {
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import Friend from "./Friend";

export interface IFriend {
  name: string;
  isOnline: boolean;
  imgUrl: string;
}

const mockFriendList: IFriend[] = [
  {
    name: "hoslim",
    isOnline: true,
    imgUrl: "",
  },
  {
    name: "jeekim",
    isOnline: true,
    imgUrl: "",
  },
  {
    name: "jaekim",
    isOnline: false,
    imgUrl: "",
  },
  {
    name: "hoslimhoslim1231231231231231231231231",
    isOnline: true,
    imgUrl: "",
  },
  {
    name: "hoslim",
    isOnline: true,
    imgUrl: "",
  },
  {
    name: "jeekim",
    isOnline: true,
    imgUrl: "",
  },
  {
    name: "jaekim",
    isOnline: false,
    imgUrl: "",
  },
  {
    name: "hoslimhoslim1231231231231231231231231",
    isOnline: true,
    imgUrl: "",
  },
  {
    name: "hoslim",
    isOnline: true,
    imgUrl: "",
  },
  {
    name: "jeekim",
    isOnline: true,
    imgUrl: "",
  },
  {
    name: "jaekim",
    isOnline: false,
    imgUrl: "",
  },
  {
    name: "hoslimhoslim1231231231231231231231231",
    isOnline: true,
    imgUrl: "",
  },
];

const FriendList = () => {
  return (
    <>
      <CardContent
        sx={{
          height: "55vh",
          backgroundColor: "#4270d6",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#3356b9",
            margin: "10px",
            borderRadius: "5px",
          }}
        >
          <Typography
            color={"#ffffff"}
            fontSize={"large"}
            align="center"
            sx={{ verticalAlign: "middle" }}
          >
            친구 리스트
          </Typography>
        </Box>
        <Card
          sx={{
            backgroundColor: "#253f8a",
            overflow: "scroll",
            height: "48vh",
            padding: "10px",
          }}
        >
          {mockFriendList.map((friend, idx) => (
            <Friend key={idx} prop={friend} />
          ))}
        </Card>
      </CardContent>
    </>
  );
};

export default FriendList;
