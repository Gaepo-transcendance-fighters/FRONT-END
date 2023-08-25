"use client";
import { Box, Button, Card, CardContent, Modal } from "@mui/material";
import { useEffect, useState, forwardRef } from "react";
import { main } from "@/type/type";
import { useRouter } from "next/navigation";
import { socket } from "@/app/page";
import { useAuth } from "@/context/AuthContext";

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

const WaitAccept = ({open}: {open: boolean}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const {authState} = useAuth()

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (open)
      handleOpenModal()
  }, [open])

  return (
    <>
      <Modal open={openModal}>
        <Box sx={modalStyle} borderRadius={"10px"}>
          <Card
            style={{
              width: "100%",
              height: "20%",
              backgroundColor: main.main4,
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
                backgroundColor: main.main4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              승낙대기
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
              Silee 님께 친선전 경기를 요청하였습니다.
              {/* 추후 optionSelect로 라우팅 시키는거 필요. */}
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
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#FF6364",
                  border: "1px solid black",
                }}
                onClick={handleCloseModal}
              >
                취소
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </>
  );
};

export default WaitAccept;

// display: "flex",
// alignItems: "center",
// justifyContent: "center",
