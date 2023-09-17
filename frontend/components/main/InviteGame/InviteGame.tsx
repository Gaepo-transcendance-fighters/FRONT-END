"use client";

import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { main } from "@/type/type";
import { useRouter } from "next/navigation";
import { useModalContext } from "@/context/ModalContext";
import { useAuth } from "@/context/AuthContext";
import { useGame } from "@/context/GameContext";
import { GameType } from "@/type/type";
import secureLocalStorage from "react-secure-storage";

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

const InviteGame = ({ nickname, idx }: { nickname: string; idx: number }) => {
  const { closeModal } = useModalContext();
  const { gameDispatch } = useGame();
  const { authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authState.chatSocket) return;
    // const recieveInvite = ({
    //   inviteUserIdx, // 초대 한 사람
    //   inviteUserNickname,
    //   targetUserIdx, // 초대 받은 사람
    //   targetUserNickname,
    //   answer,
    // }: {
    //   inviteUserIdx: number; // 초대 한 사람
    //   inviteUserNickname: string;
    //   targetUserIdx: number; // 초대 받은 사람
    //   targetUserNickname: string;
    //   answer: number;
    // }) => {
    //   console.log("recieve invite", answer);
    //   if (answer === 0) closeModal();
    //   else if (answer === 1) {
    //     gameDispatch({type: "SET_GAME_MODE", value: GameType.FRIEND})
    //     const target = {nick: targetUserNickname, id: targetUserIdx}
    //     console.log("target", target)
    //     gameDispatch({type: "B_PLAYER", value: target})
    //     closeModal();
    //     router.push("./optionselect");
    //   }
    // };
    // authState.chatSocket.on("chat_receive_answer", recieveInvite);
    authState.chatSocket.on("chat_invite_answer", () => {});

    return () => {
      if (!authState.chatSocket) return;
      authState.chatSocket.off("chat_invite_answer");
      // authState.chatSocket.off("chat_receive_answer");
    };
  }, []);

  const handleYes = () => {
    if (!authState.chatSocket) return;
    authState.chatSocket.emit(
      "chat_invite_answer",
      {
        inviteUserIdx: idx,
        targetUserIdx: parseInt(secureLocalStorage.getItem("idx") as string),
        answer: 1,
      },
      (res: any) => {
        console.log(res);
      }
    );
  };

  const handleNo = () => {
    if (!authState.chatSocket) return;
    authState.chatSocket.emit(
      "chat_invite_answer",
      {
        inviteUserIdx: idx,
        targetUserIdx: parseInt(secureLocalStorage.getItem("idx") as string),
        answer: 0,
      },
      (res: any) => {
        console.log(res);
      }
    );
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
          <Typography>게임초대</Typography>
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
            backgroundColor: main.main2,
          }}
        >
          <Typography>
            {nickname} 님께서 친선전 경기를 요청하셨습니다.
          </Typography>
        </CardContent>
        <CardContent
          style={{
            width: "60%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: main.main2,
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
