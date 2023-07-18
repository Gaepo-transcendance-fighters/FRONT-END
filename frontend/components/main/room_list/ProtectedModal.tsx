"use client";

import Modal from "@mui/material/Modal";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Box, Typography, Card } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import "./ProtectedModal.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  height: "300px",
  bgcolor: "rgb(25, 200, 255)",
  border: 0,
  borderRadius: "10px",
  color: "white",
};
const style2 = {
  width: "100",
  height: "236px",
  bgcolor: "rgb(18, 163, 255)",
  border: 0,
  borderRadius: "10px",
  color: "white",
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
        <button className="xbutton" onClick={handleClose2}>X</button>
        <Box sx={style2}>
          <div className="prlock">
            <LockRoundedIcon
              sx={{ height: "100%", width: "100%", color: "#6c899b" }}
            />
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
