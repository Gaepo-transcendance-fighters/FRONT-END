"use client";

import { Button, Card, Typography, Stack, Tooltip } from "@mui/material";
import { IFriend } from "./FriendList";

const mockup: IFriend = {
  name: "유저123",
  isOnline: true,
};

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
          <Stack direction={"row"}>
            <Typography my={1}>{prop.isOnline ? "O" : "X"}</Typography>
            <Button type="button">더보기</Button>
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

export default Friend;
