"use client";

import { ToggleButton, Card, Typography, Box, Stack } from "@mui/material";
import Friend from "./Friend";
import { useEffect, useState } from "react";
import { main } from "@/font/color";

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
    <Box
      sx={{
        height: "61vh",
      }}
    >
      <Stack sx={{ padding: "16px" }}>
        <Box
          sx={{
            backgroundColor: main.main5,
            padding: "7px",
            borderRadius: "10px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Typography
            color={"#ffffff"}
            align="center"
            sx={{
              width: "100%",
              fontSize: "21px",
              verticalAlign: "middle",
              margin: 0,
              padding: 0,
            }}
          >
            {!select ? "Friend List" : "Block List"}
          </Typography>
        </Box>
        <Card
          sx={{
            my: "7px",
            backgroundColor: main.main5,
            overflow: "scroll",
            height: "48vh",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Stack width={"max-content"}>
            <ToggleButton
              value="show"
              selected={select}
              onChange={() => setSelect(!select)}
              sx={{
                backgroundColor: main.main1,
                color: "black",
                padding: 0,
                "&:hover": {
                  backgroundColor: main.main1,
                },
                "&.Mui-selected, &.Mui-selected:hover": {
                  backgroundColor: main.main2,
                },
              }}
            >
              {select ? "Friend" : "Block"}
            </ToggleButton>
          </Stack>
          {showList.map((friend, idx) => (
            <Friend key={idx} prop={friend} />
          ))}
        </Card>
      </Stack>
    </Box>
  );
};

export default FriendList;
