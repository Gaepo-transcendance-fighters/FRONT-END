"use client";

import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import "@/components/main/room_list/RoomList.css";
import Modal from "@mui/material/Modal";
import { useRoom } from "@/context/RoomContext";
import { IChatRoom0, Mode } from "@/components/public/Layout";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  bgcolor: "#67DBFB",
  borderRadius: "10px",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreateRoomModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [value, setValue] = useState("");
  const { setRooms, setNonDmRooms } = useRoom();

  const handleClose = () => {
    setValue("");
    setOpen(false);
  };

  // useEffect(() => {
  //   const ChatCreateRoom = (json) => {
  //     setRooms((prev) => [...prev, json.channel]);
  //   };
  //   socket.on("main_enter", ChatCreateRoom, json);

  //   return () => {
  //     socket.off("main_enter", ChatCreateRoom, json);
  //   };
  // }, []);

  const OnClick = () => {
    // socket.emit("chat_create_room", { password: value }, 상태코드); // 보내주는거?
    // if (정상상태코드) {
    // setNonDmRooms({ type: "empty-nondmroom", payload: [] });
    // setValue("");
    // setOpen(false);
    // }

    setNonDmRooms({ type: "empty-nondmroom", payload: [] });
    setRooms({
      type: "create-room",
      payload: [
        {
          channelIdx: 0,
          owner: "jeeekimmm",
          mode: Mode.PUBLIC,
        },
      ] as IChatRoom0[],
    });
    setValue("");
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-room-modal"
        aria-describedby="create-non-dm-room-modal"
      >
        <Box sx={style}>
          <Card sx={{ margin: 1, backgroundColor: "#55B7EB" }}>
            <Box margin={1}>
              <Typography>방 생성 하기</Typography>
            </Box>
            <Card sx={{ margin: 1, backgroundColor: "#4292DA" }}>
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
                onClick={OnClick}
              >
                방 생성
              </Button>
            </Stack>
          </Card>
        </Box>
      </Modal>
    </>
  );
}
