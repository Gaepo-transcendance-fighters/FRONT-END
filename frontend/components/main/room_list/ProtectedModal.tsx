"use client";

import Modal from "@mui/material/Modal";
import {
  ChangeEvent,
  MouseEvent,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  useRef,
} from "react";
import "./ProtectedModal.css";
import { Box, Typography } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { useRoom } from "@/context/RoomContext";
import { IChatRoom0 } from "@/context/RoomContext";
import { socket } from "@/app/page";

const box = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "333px",
  height: "200px",
  bgcolor: "rgb(25, 200, 255)",
  border: 0,
  borderRadius: "10px",
  color: "white",
};

const box2 = {
  width: "100",
  height: "136px",
  bgcolor: "rgb(18, 163, 255)",
  border: 0,
  borderRadius: "10px",
  color: "white",
  m: 4,
};

export default function ProtectedModal({
  open,
  handleClose,
  room,
  setFail,
  fail,
}: {
  open: boolean;
  handleClose: () => void;
  room: IChatRoom0;
  setFail: Dispatch<SetStateAction<boolean>>;
  fail: boolean;
}) {
  const { roomDispatch } = useRoom();
  const pwRef = useRef("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    pwRef.current = e.target.value;
  };

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFail(false);
    socket.emit(
      "chat_enter",
      JSON.stringify({
        userNickname: "jujeon",
        userIdx: 98029,
        channelIdx: room.channelIdx,
        password: pwRef.current,
      }),
      (statusCode: number) => {
        if (statusCode === 200) {
          handleClose();
          setFail(false);
          roomDispatch({ type: "SET_CURRENTROOM", value: room });
        } else {
          setFail(true);
        }
      }
    );
    pwRef.current = "";
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      setFail(false);
      socket.emit(
        "chat_enter",
        JSON.stringify({
          userNickname: "intra_id",
          userIdx: 98029,
          channelIdx: room.channelIdx,
          password: pwRef.current,
        }),
        (statusCode: number) => {
          if (statusCode === 200) {
            handleClose();
            setFail(false);
            roomDispatch({ type: "SET_CURRENTROOM", value: room });
          } else {
            setFail(true);
          }
        }
      );
      pwRef.current = "";
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="protected-room-modal"
      aria-describedby="enter-password-modal"
    >
      <Box sx={box}>
        <button className="prxbutton" onClick={handleClose}>
          X
        </button>
        <Box sx={box2}>
          <div className="prlock">
            <LockRoundedIcon
              sx={{ height: "100%", width: "100%", color: "#6c899b" }}
            />
          </div>
          <Box className="prboxcontainer">
            <input
              className="prinput"
              type="password"
              placeholder="password"
              onChange={onChange}
              autoFocus={true}
              onKeyDown={onKeyDown}
            ></input>
            <button className="prsubmitbutton" onClick={onClick}>
              submit
            </button>
          </Box>
          <div className="prfailmsg">
            {!fail ? null : (
              <Typography sx={{ fontSize: "16px" }}>
                Please check your password
              </Typography>
            )}
          </div>
        </Box>
      </Box>
    </Modal>
  );
}
