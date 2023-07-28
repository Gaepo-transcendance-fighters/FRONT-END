"use client";

import Modal from "@mui/material/Modal";
import {
  ChangeEvent,
  useRef,
  MouseEvent,
  Dispatch,
  SetStateAction,
  LegacyRef,
  useEffect,
} from "react";
import "./ProtectedModal.css";
import { IChatRoom } from "./RoomTypeButton";
import { Box, Typography } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

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
  setIsRight,
  room,
  setFail,
  setARoom,
  fail,
}: {
  open: boolean;
  handleClose: () => void;
  isRight: boolean;
  setIsRight: Dispatch<SetStateAction<boolean>>;
  room: IChatRoom;
  setFail: Dispatch<SetStateAction<boolean>>;
  fail: boolean;
  setARoom: Dispatch<SetStateAction<IChatRoom | undefined>>;
}) {
  const pwRef = useRef("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    pwRef.current = e.target.value;
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    setFail(false);
    e.preventDefault();
    if (pwRef.current == room.password) {
      setIsRight(true);
      handleClose();
      setFail(false);
      setARoom(room);
    } else {
      setIsRight(false);
      setFail(true);
    }
    pwRef.current = "";
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
              ref={inputRef}
              autoFocus={true}
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
