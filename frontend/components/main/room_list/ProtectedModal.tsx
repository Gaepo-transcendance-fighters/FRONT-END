"use client";

import Modal from "@mui/material/Modal";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Box, Typography, Card } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //여기까지 모달 위치
  width: "400px",
  height: "300px",
  bgcolor: "rgb(25, 200, 255)",
  border: 0,
  borderRadius: "10px",
  // p: 1, // padding,
  color: "white",
  // padding : "1",
};
const style2 = {
  // position: "absolute" as "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%)",
  // width : "300px",
  width: "100",
  //width는 100하면 꽉 채워지는데
  height: "236px",
  //height는 100하면 글 줄 수에따라 바뀐다
  //고정하고 싶어서 px로 정함
  bgcolor: "rgb(18, 163, 255)",
  border: 0,
  borderRadius: "10px",
  // pt: 1, 이걸하면 box가 내려감
  color: "white",
  // padding : "1", 안됨 p로 써야됨
  m: 4,
};

export default function ProtectedModal({
  open2,
  handleClose2,
}: {
  open2: boolean;
  handleClose2: () => void;
}) {
  return (
    <Modal
      open={open2}
      onClose={handleClose2}
      aria-labelledby="protected-room-modal"
      aria-describedby="enter-password-modal"
    >
      <Box sx={style}>
        <Box sx={style2}>
          <div style={{ height: "42px", width: "42px", margin: "auto", padding:"10px" }}>
            <LockRoundedIcon
              sx={{ height: "100%", width: "100%", color: "#6c899b" }}
            />
            {/* <LockRoundedIcon /> */}
          </div>

          {/* <Typography id="protected-room-modal" variant="h6" component="h2">
            Text in a modal
          </Typography>

          <Typography id="enter-password-modal" sx={{ mt: 2 }}>
            Duis mollis
          </Typography> */}
        </Box>
      </Box>
    </Modal>
  );
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
