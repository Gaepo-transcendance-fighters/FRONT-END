"use client";

import "@/components/main/room_list/RoomList.css";
import { useRoom } from "@/context/RoomContext";
import { IChatRoom } from "@/type/type";
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { socket } from "@/app/page";
import { useUser } from "@/context/UserContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  bgcolor: "#67dcfb",
  borderRadius: "10px",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditRoomModal({ prop }: { prop: () => void }) {
  const { roomState, roomDispatch } = useRoom();
  const [value, setValue] = useState("");
  const { userState } = useUser();
  const payload = {
    channelIdx: roomState.currentRoom?.channelIdx,
    senderIdx: userState.userIdx, // [번경필요]나중에 나의 userIdx 로 변경필요
    changedPassword: value,
  };

  const handleClose = () => {
    prop();
    socket.emit("BR_chat_room_password", payload);
    console.log("방설정변경 pw: ", value);
  };

  useEffect(() => {
    const roomSettingHandler = (channels: IChatRoom[]) => {
      console.log(channels);
      const targetChannelIdx = roomState.currentRoom?.channelIdx;
      const targetChannel: IChatRoom | undefined = channels.find(
        (channel) => channel.channelIdx === targetChannelIdx
      );
      console.log("찾은 채널:", targetChannel);
      if (targetChannel) {
        roomDispatch({ type: "SET_NON_DM_ROOMS", value: channels });
        roomDispatch({ type: "SET_CUR_ROOM", value: targetChannel });
      } else {
        console.log("error ocurrued!");
      }
    };
    socket.on("BR_chat_room_password", roomSettingHandler);

    return () => {
      socket.off("BR_chat_room_password", roomSettingHandler);
    };
  });

  return (
    <>
      <Box sx={style}>
        <Card sx={{ margin: 1, backgroundColor: "#50aef8" }}>
          <Box margin={1}>
            <Typography>방 정보 변경하기</Typography>
          </Box>
          <Card sx={{ margin: 1, backgroundColor: "#3b85d8" }}>
            <Stack margin={1}>
              <Typography>
                {"방 제목: " + roomState.currentRoom?.owner + "'s room"}
              </Typography>
            </Stack>
            <Stack margin={1}>
              <Typography>비밀번호 :</Typography>
              <TextField
                sx={{ backgroundColor: "#ffffff" }}
                value={value}
                autoComplete="false"
                onChange={(e) => setValue(e.currentTarget.value)}
              />
            </Stack>
          </Card>
          <Stack margin={1}>
            <Typography fontSize={"small"}>**주의사항</Typography>
            <Typography fontSize={"small"}>
              비밀번호를 새로 등록할 수 있습니다.
            </Typography>
            <Typography fontSize={"small"}>
              비밀번호를 등록하지 않으면 공개방이 됩니다.
            </Typography>
            <Button
              variant="contained"
              sx={{ margin: "auto" }}
              onClick={handleClose}
            >
              업데이트
            </Button>
          </Stack>
        </Card>
      </Box>
    </>
  );
}
