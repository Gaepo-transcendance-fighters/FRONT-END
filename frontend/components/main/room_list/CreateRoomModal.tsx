"use client";

import React, { useState } from "react";
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import "@/components/main/room_list/RoomList.css";

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

export default function CreateRoomModal({ prop }: { prop: () => void }) {
  const [value, setValue] = useState("");

  const handleClose = () => {
    prop();
  };

  return (
    <>
      <Box sx={style}>
        <Card sx={{ margin: 1, backgroundColor: "#50aef8" }}>
        {/* <Box sx={{ margin: 1, backgroundColor: "#50aef8", borderRadius: "4px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}> */}
        {/* Box로 하면 버튼이 튀어나옴 */}
          <Box margin={1}>
            <Typography>방 생성 하기</Typography>
          </Box>
          <Card sx={{ margin: 1, backgroundColor: "#3b85d8" }}>
            <Stack margin={1}>
              <Typography>방 제목: </Typography>
            </Stack>
            <Stack margin={1}>
              <Typography>비밀번호 :</Typography>
              <TextField
                sx={{ backgroundColor: "#ffffff" }}
                value={value}
                type="password"
                autoComplete="false"
                onChange={(e) => setValue(e.currentTarget.value)}
              />
            </Stack>
          </Card>
          <Stack margin={1}>
            <Typography fontSize={"small"}>**주의사항</Typography>
            <Typography fontSize={"small"}>
              비밀번호를 입력하지 않으면 다른 사용자에게 공개됩니다.
            </Typography>
            <Typography fontSize={"small"}>
              추후 설정으로 비밀번호를 바꾸거나 추가할수도 있습니다.
            </Typography>
            <Button
              variant="contained"
              sx={{ margin: "auto" }}
              onClick={handleClose}
            >
              방 생성
            </Button>
          </Stack>
        </Card>
        {/* </Box> */}
      </Box>
    </>
  );
}
