"use client";

import { Card, Typography, Stack, Tooltip } from "@mui/material";
import Image from "next/image";
import FriendProfile from "./FriendProfile";
import { main } from "@/font/color";
import { useEffect } from "react";

const loginOn = <Image src="/logon1.png" alt="online" width={10} height={10} />;

const loginOff = (
  <Image src="/logoff.png" alt="offline" width={10} height={10} />
);

<<<<<<< HEAD
interface IFriend {
  friendNickname: string;
  friendIdx: number;
  isOnline: boolean;
}

interface IBlock {
  targetNickname: string;
  targetIdx: number;
}

=======
>>>>>>> origin
interface IUserProp {
  friendNickname: string;
  friendIdx: number;
  isOnline: boolean;
  targetNickname?: string;
  targetIdx?: number;
}

const Friend = ({ prop }: { prop: IUserProp }) => {
  useEffect(() => {
    console.log("friend", prop);
  }, []);
  return (
    <>
      <Card sx={{ margin: 1, backgroundColor: main.main0 }}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Tooltip
            title={
              !prop.targetNickname ? prop.friendNickname : prop.targetNickname
            }
            arrow
          >
            <Typography
              margin={1}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {!prop.targetNickname ? prop.friendNickname : prop.targetNickname}
            </Typography>
          </Tooltip>
          <Stack direction={"row"} alignItems={"center"}>
            {prop.isOnline ? loginOn : loginOff}
            <FriendProfile prop={prop} />
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

export default Friend;
