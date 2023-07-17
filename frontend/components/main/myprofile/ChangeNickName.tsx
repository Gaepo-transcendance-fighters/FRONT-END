import {
  Avatar,
  Button,
  Card,
  Box,
  CardContent,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Typography,
  Input,
} from "@mui/material";
import { useState } from "react";
const ChangeNickNameModalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  bgcolor: "#65d9f9",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ChangeNickName = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box sx={ChangeNickNameModalStyle} borderRadius={"10px"}></Box>
    </Modal>
  );
};

export default ChangeNickName;
