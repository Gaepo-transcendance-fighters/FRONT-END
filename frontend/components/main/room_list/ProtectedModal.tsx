"use client";

import Modal from "@mui/material/Modal";
import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  MouseEvent,
  useRef,
} from "react";
import { Box, Typography, Card } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import "./ProtectedModal.css";
import { IChatRoom } from "./RoomTypeButton";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "333px",
  height: "177px",
  bgcolor: "rgb(25, 200, 255)",
  border: 0,
  borderRadius: "10px",
  color: "white",
  pb: 1,
};
const style2 = {
  width: "100",
  bgcolor: "rgb(18, 163, 255)",
  border: 0,
  borderRadius: "10px",
  color: "white",
  m: 4,
};

export default function ProtectedModal({
  open2,
  handleClose2,
  setIsRight,
  // isRight
  // aRoom,
}: {
  open2: boolean;
  handleClose2: () => void;
  // isRight: boolean;
  setIsRight:Dispatch<SetStateAction<boolean>>;
  // aRoom : IChatRoom | undefined;
}) {
  const pwRef = useRef("");
  // pw : 0000
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    pwRef.current = e.target.value;
  };
  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    pwRef.current == "0000" ? setIsRight(true) : setIsRight(false);
    // pwRef.current == aRoom?.password ? setIsRight(true) : setIsRight(false);
    //각 방 pw 들어 갈 자리
    console.log("onSubmit : ", e);
  };
// ref 비워주는 작업?
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
              type="text"
              placeholder="enter the room pw"
              onChange={onChange}
            ></input>
            <button className="submitButton" onClick={onSubmit}>
              submit
            </button>
          </Box>
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
