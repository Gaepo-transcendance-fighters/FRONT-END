"use client";

import Modal from "@mui/material/Modal";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Box, Typography } from "@mui/material";

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
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );
}
