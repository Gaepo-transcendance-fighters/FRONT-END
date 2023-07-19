"use client";

import Modal from "@mui/material/Modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  MouseEvent,
  useRef,
} from "react";
import { Box, Typography, Card, TextField } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import "./ProtectedModal.css";
import { IChatRoom } from "./RoomTypeButton";

const style = {
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

const style2 = {
  width: "100",
  height: "136px",
  bgcolor: "rgb(18, 163, 255)",
  border: 0,
  borderRadius: "10px",
  color: "white",
  m: 4,
};

export default function ProtectedModal({
  open2,
  handleClose2,
  isRight,
  setIsRight,
  aRoom,
  fail,
  setFail,
}: {
  open2: boolean;
  handleClose2: () => void;
  isRight: boolean;
  setIsRight: Dispatch<SetStateAction<boolean>>;
  aRoom: IChatRoom | undefined;
  fail : boolean;
  setFail : Dispatch<SetStateAction<boolean>>;
}) {
  const pwRef = useRef("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    pwRef.current = e.target.value;
  };
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    setFail(false);
    e.preventDefault();
    console.log("aRoom?.password", aRoom?.password);
    if (pwRef.current == aRoom?.password) {
      setIsRight(true);
      handleClose2();
      setFail(false);
    } else {
      setIsRight(false);
      setFail(true);
    }
    pwRef.current = "";
    console.log("onClick : ", e);
  };
  return (
    <Modal
      open={open2}
      onClose={handleClose2}
      aria-labelledby="protected-room-modal"
      aria-describedby="enter-password-modal"
    >
      <Box sx={style}>
        <button className="xbutton" onClick={handleClose2}>
          X
        </button>
        <Box sx={style2}>
          <div className="prlock">
            <LockRoundedIcon
              sx={{ height: "100%", width: "100%", color: "#6c899b" }}
            />
          </div>
          <Box className="BoxContainer">
            <input
              className="input"
              type="password"
              placeholder="password"
              onChange={onChange}
            ></input>
            <button className="submitButton" onClick={onClick}>
              submit
            </button>
          </Box>
          <div className="failMsg">
            {!fail ? null : (
              <Typography sx={{ fontSize: "16px" }}>
                Please check your password!
              </Typography>
            )}
          </div>
        </Box>
      </Box>
    </Modal>
  );
}

{
  /* <Typography id="protected-room-modal" variant="h6" component="h2">
  Text in a modal
</Typography>

<Typography id="enter-password-modal" sx={{ mt: 2 }}>
  Duis mollis
</Typography> */
}

{
  /* <Box sx={style}>
  <Typography id="protected-room-modal" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="enter-password-modal" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box> */
}
