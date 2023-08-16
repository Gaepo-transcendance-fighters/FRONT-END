"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Modal,
  Typography,
} from "@mui/material";

import { useRouter } from "next/navigation";
import { main } from "@/components/public/Layout";
import { useEffect, useState } from "react";
import PingPong from "@/components/game/ingame/PingPong";
import { useGame } from "@/context/GameContext";
import { gameSocket } from "@/app/optionselect/page";
import useModal from "@/hooks/useModal";
import Modals from "@/components/public/Modals";

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

const GamePlaying = () => {
  const router = useRouter();
  const [client, setClient] = useState<boolean>(false);
  const { gameState, gameDispatch } = useGame();
  const { isShowing, toggle } = useModal();
  const { isShowing: isShowing2, toggle: toggle2 } = useModal();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const BackToMain = () => {
    router.push("/");
    gameDispatch({ type: "SCORE_RESET" });
  };

  const handleOpenModal_redir = () => {
    setOpenModal(true);
    setTimeout(() => {
      router.push("./gameresult");
    }, 2000);
  };

  useEffect(() => {
    setClient(true);
    const preventGoBack = (e: PopStateEvent) => {
      e.preventDefault();
      toggle();
    };

    const preventRefresh = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      router.push("/");
    };
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);
    window.addEventListener("beforeunload", preventRefresh);

    gameSocket.on("game_queue_quit", (res: number) => {
      console.log("상대가 나감", res);
      //게임 종료 로직 추가 필요
      gameDispatch({ type: "A_SCORE", value: 5 });
      gameDispatch({ type: "B_SCORE", value: 0 });
      setOpenModal(true);
      setTimeout(() => {
        router.push("./gameresult");
      }, 2000);
    });
    return () => {
      window.removeEventListener("popstate", preventGoBack);
      window.removeEventListener("beforeunload", () => ({}));
    };
  }, []);

  if (!client) return <div>로딩중</div>;

  return (
    <>
      <Card sx={{ display: "flex" }}>
        <Stack
          sx={{
            width: "100%",
            height: "100vh",
            backgroundColor: main.main1,
            padding: 0,
            margin: 0,
          }}
        >
          <Button onClick={() => router.push("./gameresult")}>
            결과창보기
          </Button>
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card
              style={{
                width: "40%",
                height: "10vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem",
                border: "2px solid black",
              }}
            >
              <Typography sx={{ fontSize: "3rem" }}>
                {gameState.aScore} : {gameState.bScore}
              </Typography>
            </Card>
          </CardContent>

          <CardContent sx={{ mx: "auto" }}>
            <Card
              style={{
                width: "max-content",
                height: "max-content",
                border: "2px solid black",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: main.main3,
              }}
            >
              <Card
                style={{
                  width: "max-content",
                  padding: "20px",
                  margin: "30px",
                  height: "15%",
                  border: "2px solid black",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                Player 1
              </Card>

              <PingPong />

              <Card
                style={{
                  width: "max-content",
                  padding: "20px",
                  margin: "30px",
                  height: "15%",
                  border: "2px solid black",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                Player 2
              </Card>
            </Card>
          </CardContent>

          <CardContent
            style={{
              width: "100%",
              height: "30vh",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card
              style={{
                width: "20%",
                height: "5vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid black",
                backgroundColor: "#05BEFF",
              }}
            >
              Mode: {gameState.gameMode} || Speed: {gameState.ballSpeedOption}{" "}
              || Map: {gameState.mapType}
            </Card>
            <Modals
              isShowing={isShowing}
              hide={toggle}
              message="뒤로가기 멈춰!"
              routing="/"
            />
            <Button onClick={() => setOpenModal(true)}>탈주시</Button>
            <Modals
              isShowing={openModal}
              message="상대방이 탈주했습니다. 결과페이지로 이동합니다"
            />
            <Modals
              isShowing={isShowing2}
              hide={toggle2}
              message="새로고침 멈춰!"
            />
          </CardContent>
          <CardContent
            style={{
              width: "100%",
              height: "30vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              style={{
                width: "10%",
                height: "40%",
                border: "2px solid red",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                backgroundColor: "#FB5C12",
              }}
              onClick={BackToMain}
            >
              도망가기
            </Button>
          </CardContent>
        </Stack>
      </Card>
    </>
  );
};
export default GamePlaying;
