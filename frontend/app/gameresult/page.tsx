"use client";

import { Button, Card, CardContent, Stack, Typography } from "@mui/material";

import { useRouter } from "next/navigation";
import { main } from "@/type/type";
import { useGame } from "@/context/GameContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { server_domain } from "../page";
import { IGameLog } from "@/type/GameType";
import { useAuth } from "@/context/AuthContext";
import { ReturnMsgDto } from "@/type/RoomType";

const GameResult = () => {
  const { gameState, gameDispatch } = useGame();
  const { authState } = useAuth();
  const [client, setClient] = useState(false);
  const [gameLog, setGameLog] = useState<IGameLog | null>(null);
  const [user1Score, setUser1Score] = useState<number>(0);
  const [user2Score, setUser2Score] = useState<number>(0);

  const router = useRouter();

  const BackToMain = () => {
    authState.gameSocket!.disconnect();
    gameDispatch({ type: "SCORE_RESET" });
    if (!authState.chatSocket) return;
    authState.chatSocket.emit(
      "BR_set_status_online",
      {
        userNickname: authState.userInfo.nickname,
      },
      (ret: ReturnMsgDto) => {}
    );
    router.replace("/home?from=game");
  };

  const fetchData = async () => {
    await axios({
      method: "get",
      url: `${server_domain}/game-result?gameKey=${gameState.roomId}`,
    }).then((res) => {
      console.log(res.data);
      const gameLog: IGameLog = res.data;
      setGameLog(gameLog);
      const user1Score = gameLog.score.split(" : ")[0];
      const user2Score = gameLog.score.split(" : ")[1];
      setUser1Score(Number(user1Score));
      setUser2Score(Number(user2Score));
    });
  };

  useEffect(() => {
    setClient(true);
    fetchData();

    const goToBack = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      router.replace("/home?from=game");
    };

    addEventListener("beforeunload", goToBack);

    return () => {
      removeEventListener("beforeunload", goToBack);
    };
  }, []);

  if (!client) return <></>;

  return (
    <Card sx={{ display: "flex" }}>
      <Stack
        sx={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url("/background.png")`,
          padding: 0,
          margin: 0,
        }}
      >
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
            <Typography sx={{ fontSize: "3rem" }}>Result</Typography>
          </Card>
        </CardContent>

        <CardContent>
          <Card
            sx={{ display: "flex", gap: "10%", flexDirection: "row" }}
            style={{
              width: "100%",
              height: "65vh",
              border: "2px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: main.main3,
            }}
          >
            <Card
              style={{
                width: "35%",
                height: "70%",
                border: "2px solid black",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                fontSize: "2rem",
                backgroundColor: "#49EC62",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  gap: "8vh",
                  flexDirection: "column",
                }}
              >
                <Card>
                  <Typography sx={{ fontSize: "2rem" }}>
                    {gameLog?.user1Nickname}
                  </Typography>
                </Card>
                <Card>
                  <Typography sx={{ fontSize: "2rem" }}>
                    {user1Score}
                  </Typography>
                </Card>
                <Card
                  sx={{ minWidth: "max-content" }}
                  style={{
                    width: "80%",
                    height: "70%",
                    border: "2px solid black",
                    fontSize: "1.5rem",
                    backgroundColor: "White",
                  }}
                >
                  <Stack
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "2rem" }}>
                      Win Rate:{" "}
                      {gameLog &&
                        Math.round(
                          gameLog.user1win /
                            (gameLog.user1lose + gameLog.user1win)
                        ) * 100}
                      %
                    </Typography>
                  </Stack>
                  <Stack
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "2rem" }}>
                      {gameLog && gameLog.user1rankpoint}
                    </Typography>
                  </Stack>
                </Card>
              </Stack>
            </Card>
            <Card
              style={{
                width: "35%",
                height: "70%",
                border: "2px solid black",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                fontSize: "2rem",
                backgroundColor: "#FF6364",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  gap: "8vh",
                  flexDirection: "column",
                }}
              >
                <Card
                //   닉네임 클릭시, 프로필 모달 띄우는 파트
                //   onClick={}
                >
                  <Typography sx={{ fontSize: "2rem" }}>
                    {gameLog?.user2Nickname}
                  </Typography>
                </Card>
                <Card>
                  <Typography sx={{ fontSize: "2rem" }}>
                    {user2Score}
                  </Typography>
                </Card>
                <Card
                  sx={{ minWidth: "max-content" }}
                  style={{
                    width: "80%",
                    height: "70%",
                    border: "2px solid black",
                    fontSize: "1.5rem",
                    backgroundColor: "White",
                  }}
                >
                  <Stack
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "2rem" }}>
                      Win Rate:{" "}
                      {gameLog &&
                        Math.round(
                          gameLog?.user2win /
                            (gameLog?.user2lose + gameLog?.user2win)
                        ) * 100}
                      %
                    </Typography>
                  </Stack>
                  <Stack
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "2rem" }}>
                      {gameLog && gameLog.user2rankpoint}
                    </Typography>
                  </Stack>
                </Card>
              </Stack>
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
          <Button
            style={{
              width: "30%",
              height: "50%",
              border: "2px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              backgroundColor: "White",
            }}
            onClick={BackToMain}
          >
            메인화면으로 돌아가기
          </Button>
        </CardContent>
      </Stack>
    </Card>
  );
};
export default GameResult;
