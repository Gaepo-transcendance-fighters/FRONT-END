"use client";

import { ToggleButton, Card, Typography, Box, Stack } from "@mui/material";
import Friend from "./Friend";
import { useState } from "react";
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

const selectedButton = {
  backgroundColor: main.main1,
  color: "white",
  "&:hover": {
    backgroundColor: main.main1,
  },
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: main.main1,
  },
  borderRadius: "10px",
  py: 0,
  px: 2,
  flex: 1,
};

const unselectedButton = {
  backgroundColor: main.main5,
  color: "white",
  "&:hover": {
    backgroundColor: main.main5,
  },
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: main.main5,
  },
  borderRadius: "10px",
  py: 0,
  px: 2,
  flex: 1,
};

const FriendList = () => {
  const [select, setSelect] = useState<boolean>(false);

  const showList = select ? mockBlockList : mockFriendList;

  return (
    <Card
      sx={{
        height: "60vh",
        borderRadius: "10px",
        margin: 1,
        backgroundColor: main.main2,
      }}
    >
      <Stack sx={{ padding: "16px" }}>
        <Box
          sx={{
            backgroundColor: main.main5,
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
        <Stack
          direction={"row"}
          sx={{ marginTop: 1, height: "max-content", display: "flex" }}
          spacing={2}
        >
          <ToggleButton
            value="show"
            onChange={() => setSelect(false)}
            sx={!select ? selectedButton : unselectedButton}
          >
            Friend
          </ToggleButton>

          <ToggleButton
            value="show"
            onChange={() => setSelect(true)}
            sx={select ? selectedButton : unselectedButton}
          >
            Block
          </ToggleButton>
        </Stack>
        <Card
          sx={{
            my: "7px",
            backgroundColor: main.main5,
            overflow: "scroll",
            height: "45vh",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          {showList.map((friend, idx) => (
            <Friend key={idx} prop={friend} />
          ))}
        </Card>
      </Stack>
    </Card>
  );
};

export default FriendList;
