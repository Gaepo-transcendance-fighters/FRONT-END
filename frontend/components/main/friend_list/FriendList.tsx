"use client";

import {
  ToggleButton,
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import Friend from "./Friend";
import { useEffect, useState } from "react";

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

const mockBlockList = [
  {
    name: "hoslim",
    isOnline: true,
    imgUrl: "",
  },
  {
    name: "hoslim",
    isOnline: true,
    imgUrl: "",
  },
  {
    name: "hoslim",
    isOnline: true,
    imgUrl: "",
  },
  {
    name: "hoslim",
    isOnline: true,
    imgUrl: "",
  },
];

const FriendList = () => {
  const [select, setSelect] = useState<boolean>(false);

  const showList = select ? mockBlockList : mockFriendList;

  return (
    <>
      <Box
        sx={{
          height: "61vh",
          backgroundColor: "#3478c5",
          mx: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#3356b9",
            margin: "10px",
            borderRadius: "5px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Typography
            color={"#ffffff"}
            fontSize={"large"}
            align="center"
            sx={{
              verticalAlign: "middle",
            }}
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
          <Stack width={"max-content"}>
            <ToggleButton
              value="show"
              selected={select}
              onChange={() => setSelect(!select)}
              sx={{
                backgroundColor: "#48a0ed",
                color: "black",
                padding: 0,
                "&:hover": {
                  backgroundColor: "#48a0ed",
                },
                "&.Mui-selected, &.Mui-selected:hover": {
                  backgroundColor: "#3478c5",
                },
              }}
            >
              {select ? "Block" : "Friend"}
            </ToggleButton>
          </Stack>
          {showList.map((friend, idx) => (
            <Friend key={idx} prop={friend} />
          ))}
        </Card>
      </Box>
    </>
  );
};

export default FriendList;
