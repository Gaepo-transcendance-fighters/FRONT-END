"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 150,
  bgcolor: "#65d9f9",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const InviteGame = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Button type="button" onClick={handleOpenModal}>
        더보기
      </Button>
      <Modal open={openModal}>
        <Box sx={modalStyle} borderRadius={"10px"}>
          <Card
            style={{
              width: "100%",
              height: "20%",
              backgroundColor: "#2C70DD",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* 상단 안내메세지 */}
            <CardContent
              style={{
                width: "100%",
                height: "20%",
                backgroundColor: "#2C70DD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              게임초대
            </CardContent>
          </Card>
          <Card
            style={{
              width: "100%",
              height: "90%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CardContent
              style={{
                width: "100%",
                height: "20%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Silee 님께서 친선전 경기를 요청하셨습니다.
            </CardContent>
            <CardContent
              style={{
                width: "60%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
              sx={{ display: "flex", gap: "20%", flexDirection: "row" }}
            >
              <Button
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#49EC62",
                  border: "1px solid black",
                }}
              >
                수락
              </Button>
              <Button
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#FF6364",
                  border: "1px solid black",
                }}
                onClick={handleCloseModal}
              >
                거절
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </>
  );
};

export default InviteGame;

// display: "flex",
// alignItems: "center",
// justifyContent: "center",
