"use client";

import Modal from "@mui/material/Modal";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Box, Typography, Card } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //여기까지 모달 위치
  width : "400px",
  height : "300px",
  bgcolor: "#67dcfb",
  border: 0,
  borderRadius: "10px",
  // p: 100, // 모달 크기,
  color: "white",
  padding : 1,
};
const style2 = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //여기까지 모달 위치
  width : "400px",
  height : "300px",
  bgcolor: "#67dcfb",
  border: 0,
  borderRadius: "10px",
  // p: 100, // 모달 크기,
  color: "white",
  // padding : "1",
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
        {/* <Box sx={style2}> */}
        <Box sx={{ margin: 1, backgroundColor: "#50aef8", borderRadius: "10px", height : "100%"}}>
        {/* <Box sx={{...style2, margin : 1}}> */}
          <Typography id="protected-room-modal" variant="h6" component="h2">
            Text in a modal
          </Typography>

          <Typography id="enter-password-modal" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
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
