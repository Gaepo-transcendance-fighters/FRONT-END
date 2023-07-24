"use client";

import { Card, Typography, Stack, Tooltip } from "@mui/material";
import { IFriend } from "./FriendList";
import Image from "next/image";
import FriendProfile from "./FriendProfile";
import { main } from "@/font/color";

const loginOn = <Image src="/logon1.png" alt="online" width={10} height={10} />;

const loginOff = (
  <Image src="/logoff.png" alt="offline" width={10} height={10} />
);

const Friend = ({ prop }: { prop: IFriend }) => {
  return (
    <>
      <Card sx={{ margin: 1, backgroundColor: main.main0 }}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Tooltip title={prop.name} arrow>
            <Typography
              margin={1}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {prop.name}
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
