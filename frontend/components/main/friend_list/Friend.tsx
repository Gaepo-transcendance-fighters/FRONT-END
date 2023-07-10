"use client";

import { Button, Card, Typography, Stack, Tooltip } from "@mui/material";
import { IFriend } from "./FriendList";
import Image from "next/image";

const loginOn = <Image src="/logon.png" alt="online" width={10} height={10} />;

const loginOff = (
  <Image src="/logoff.png" alt="offline" width={10} height={10} />
);

const Friend = ({ prop }: { prop: IFriend }) => {
  return (
    <>
      <Card sx={{ margin: 1, backgroundColor: "#FFFFFF" }}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Tooltip title={prop.name} arrow>
            <Typography
              margin={1}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
              }}
            >
              {prop.name}
            </Typography>
          </Tooltip>
          <Stack direction={"row"} alignItems={"center"}>
            {prop.isOnline ? loginOn : loginOff}
            <Button type="button">더보기</Button>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

export default Friend;
