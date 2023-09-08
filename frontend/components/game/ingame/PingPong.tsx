"use client";

import GameBoard from "./GameBoard";
import GamePaddle from "./GamePaddle";
import { useEffect, useState } from "react";
import GameBall from "./GameBall";
import { useGame } from "@/context/GameContext";
import { gameSocket } from "@/app/page";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ReturnMsgDto } from "@/type/RoomType";

enum EGameStatus {
  ONGOING,
  END,
  JUDGE,
}

interface IGameProps {
  ballX: number,
  ballY: number,
  paddle1: number, // 현재 위치 
  paddle2: number, // 현재 위치
  serverTime: number, // ms 단위로, ping check 용 targetFrame: number, // 가변 프레임을 생각하고 집어넣음
  cntPerFrame: number, // 1 - 60 까지 계속 반복됨
}

interface IGameEnd {
  userIdx1: number;
  userScore1: number;
  userIdx2: number;
  userScore2: number;
  issueDate: number;
  gameStatus: EGameStatus; // 게임 속행, 게임 종료, 연결문제 판정승, 0, 1, 2
}

const PingPong = () => {
  const [client, setClient] = useState(false);
  const router = useRouter();
  const { gameState, gameDispatch } = useGame();
  const { authState } = useAuth();
  const [gameProps, setGameProps] = useState<IGameProps>({
    ballX: 0,
    ballY: 0,
    paddle1: 0,
    paddle2: 0,
    serverTime: 0,
    cntPerFrame: 0,
  });

  const movePaddle = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.code === "ArrowUp") {
      gameSocket.emit("game_move_paddle", {
        userIdx: authState.id,
        paddle: 1,
        serverTime: gameProps.serverTime,
        clientTime: Date.now(),
        cntPerFrame: gameProps.cntPerFrame,
      });
    } else if (e.code === "ArrowDown") {
      gameSocket.emit("game_move_paddle", {
        userIdx: authState.id,
        paddle: -1,
        serverTime: gameProps.serverTime,
        clientTime: Date.now(),
        cntPerFrame: gameProps.cntPerFrame,
      });
    } else {
      gameSocket.emit("game_move_paddle", {
        userIdx: authState.id,
        paddle: 0,
        serverTime: gameProps.serverTime,
        clientTime: Date.now(),
        cntPerFrame: gameProps.cntPerFrame,
      });
    }
  };

  useEffect(() => {
    setClient(true);
    gameSocket.emit("game_start", { userIdx: authState.id });
    gameSocket.on("game_start", (res) => {
      console.log("game_start", res);
    });
    gameSocket.emit("game_frame");
    gameSocket.on("game_frame", (res: IGameProps) => {
      console.log("game_frame", res);
      setGameProps(res);
    });

    gameSocket.on(
      "game_move_paddle",
      ({ code, msg }: { code: number; msg: string }) => {
        console.log("game_move_paddle", code, msg);
        if (code === 200) {
          console.log("success");
        }
      }
    );
    gameSocket.on("game_pause_score", (data: IGameEnd) => {
      console.log("game_pause_score");
      gameSocket.emit(
        "game_pause_score",
        { userIdx: authState.id },
        (res: ReturnMsgDto) => {
          console.log(res);
          if (res.code === 200) {
            gameDispatch({ type: "A_SCORE", value: data.userScore1 });
            gameDispatch({ type: "B_SCORE", value: data.userScore2 });
            if (
              data.gameStatus === EGameStatus.END ||
              data.gameStatus === EGameStatus.JUDGE
            ) {
              gameDispatch({ type: "SCORE_RESET" });
              router.push("/gameresult");
            }
          }
        }
      );
    });

    // window.addEventListener("keydown", movePaddle);

    return () => {
      gameSocket.off("game_start");
      gameSocket.off("game_frame");
      gameSocket.off("game_move_paddle");
      gameSocket.off("game_pause_score");

      // window.removeEventListener("keydown", movePaddle);
    };
  }, []);

  if (!client) return <></>;

  return (
    <>
      <div
        style={{
          padding: "49px",
          backgroundImage: `url("/map/wall/${
            gameState.mapType === 0
              ? "map1"
              : gameState.mapType === 1
              ? "map2"
              : "map3"
          }.png")`,
          backgroundRepeat: "repeat",
          backgroundSize: "50.2px 50.24px",
        }}
      >
        <GameBoard />
      </div>
      <GamePaddle x={-470} y={gameProps.paddle1} />
      <GamePaddle x={470} y={gameProps.paddle2} />
      <GameBall x={gameProps.ballX} y={gameProps.ballY} />
    </>
  );
};

export default PingPong;
