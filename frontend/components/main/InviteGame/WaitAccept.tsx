"use client";

import { Button, Card, CardContent } from "@mui/material";
import { main } from "@/type/type";
import { useModalContext } from "@/context/ModalContext";

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

const WaitAccept = () => {
  const {closeModal} = useModalContext()
  return (
    <>
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
            onClick={closeModal}
          >
            취소
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default WaitAccept;
