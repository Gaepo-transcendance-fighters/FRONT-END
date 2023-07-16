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
  protectedRef,
  setProtectedModal,
  closeProtectedModal,
  protectedModal,
}: {
  protectedRef: boolean;
  setProtectedModal: Dispatch<SetStateAction<boolean>>;
  closeProtectedModal: () => void;
  protectedModal: boolean;
}) {
  console.log("protectedRef : ", protectedRef);
  useEffect(() => {
    setProtectedModal(protectedRef);
  }, [protectedRef]);
  return (
    <>
      <Modal
        open={protectedModal}
        onClose={closeProtectedModal}
        aria-labelledby="create-room-modal"
        aria-describedby="create-non-dm-room-modal"
      >
        <Box sx={style}>
          <Typography id="create-room-modal" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="create-non-dm-room-modal" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
