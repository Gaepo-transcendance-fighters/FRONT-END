"use client";

import { Box, Button, Card, CardContent, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { main } from "@/type/type";
import { useRouter } from "next/navigation";
import { useModalContext } from "@/context/ModalContext";
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

const InviteGame = ({ prop }: { prop: string }) => {
  const { closeModal } = useModalContext();
  const { authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const recieveInvite = ({
      inviteUserIdx, // 초대 한 사람
      inviteUserNickname,
      targetUserIdx, // 초대 받은 사람
      targetUserNickname,
      answer,
    }: {
      inviteUserIdx: number; // 초대 한 사람
      inviteUserNickname: string;
      targetUserIdx: number; // 초대 받은 사람
      targetUserNickname: string;
      answer: number;
    }) => {
      if (answer === 0) closeModal();
      else if (answer === 1) router.push("./optionselect");
    };
    socket.on("chat_invite_answer", recieveInvite);

    return () => {
      socket.off("chat_invite_answer");
    };
  }, []);

  const handleYes = () => {
    socket.emit("chat_invite_answer", {
      inviteUserIdx: prop,
      targetUserIdx: authState.id,
      answer: 1,
    });
  };

  const handleNo = () => {
    socket.emit("chat_invite_answer", {
      inviteUserIdx: prop,
      targetUserIdx: authState.id,
      answer: 0,
    });
  };
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
          {prop} 님께서 친선전 경기를 요청하셨습니다.
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
            onClick={handleYes}
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
            onClick={handleNo}
          >
            거절
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default InviteGame;
