"use client";

import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { IFriend } from "./FriendList";
import Image from "next/image";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#65d9f9",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const FriendProfile = ({ prop }: { prop: IFriend }) => {
  const [open, setOpen] = useState<boolean>(false);

  const onClickHandler = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="button" onClick={onClickHandler}>
        더보기
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle} borderRadius={"10px"}>
          <Stack direction={"row"} width={"100%"}>
            <Box
              sx={{
                borderRadius: "70%",
                width: "max-content",
                overflow: "hidden",
              }}
              mx={5}
            >
              <Image
                src="https://dummyimage.com/100x100/1f0c1f/edeeff.png&text=user+img"
                alt="user img"
                width={100}
                height={100}
              />
            </Box>
            <Stack
              sx={{
                width: "15vw",
              }}
              spacing={1}
            >
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                닉네임:
                <br />
                {prop.name}
              </Typography>
              <Stack direction={"row"} spacing={2}>
                <Button sx={{ minWidth: "max-content" }} variant="contained">
                  친선전
                </Button>
                <Button sx={{ minWidth: "max-content" }} variant="contained">
                  DM
                </Button>
                <Button sx={{ minWidth: "max-content" }} variant="contained">
                  더보기
                </Button>
              </Stack>
            </Stack>
          </Stack>
          <br />
          <Stack>전적</Stack>
        </Box>
      </Modal>
    </>
  );
};

export default FriendProfile;
