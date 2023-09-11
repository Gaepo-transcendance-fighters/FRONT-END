"use client";

import GameBoard from "./GameBoard";
import GamePaddle from "./GamePaddle";
import { useEffect, useState } from "react";
import GameBall from "./GameBall";
import { useGame } from "@/context/GameContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ReturnMsgDto } from "@/type/RoomType";

enum EGameStatus {
  ONGOING,
  END,
  JUDGE,
}

interface IGameProps {
  ballX: number;
  ballY: number;
  paddle1: number; // 현재 위치
  paddle2: number; // 현재 위치
  serverTime: number; // ms 단위로, ping check 용 targetFrame: number, // 가변 프레임을 생각하고 집어넣음
  cntPerFrame: number; // 1 - 60 까지 계속 반복됨
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
  const [keyboard, setKeyboard] = useState(0);
  const [gameProps, setGameProps] = useState<IGameProps>({
    ballX: 0,
    ballY: 0,
    paddle1: 0,
    paddle2: 0,
    serverTime: 0,
    cntPerFrame: 0,
  });

  const upPaddle = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.code === "ArrowUp") {
      setKeyboard(0);
    } else if (e.code === "ArrowDown") {
      setKeyboard(0);
    }
    // if (e.code === "ArrowUp") {
    //   authState.gameSocket.emit("game_move_paddle", {
    //     userIdx: authState.id,
    //     paddle: 0,
    //     serverTime: gameProps.serverTime,
    //     clientTime: Date.now(),
    //     cntPerFrame: gameProps.cntPerFrame,
    //   });
    // } else if (e.code === "ArrowDown") {
    //   authState.gameSocket.emit("game_move_paddle", {
    //     userIdx: authState.id,
    //     paddle: 0,
    //     serverTime: gameProps.serverTime,
    //     clientTime: Date.now(),
    //     cntPerFrame: gameProps.cntPerFrame,
    //   });
    // }
  };

  const downPaddle = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.code === "ArrowUp") {
      setKeyboard(1);
    } else if (e.code === "ArrowDown") {
      setKeyboard(-1);
    }
    // if (e.code === "ArrowUp") {
    //   authState.gameSocket.emit("game_move_paddle", {
    //     userIdx: authState.id,
    //     paddle: 1,
    //     serverTime: gameProps.serverTime,
    //     clientTime: Date.now(),
    //     cntPerFrame: gameProps.cntPerFrame,
    //   });
    // } else if (e.code === "ArrowDown") {
    //   authState.gameSocket.emit("game_move_paddle", {
    //     userIdx: authState.id,
    //     paddle: -1,
    //     serverTime: gameProps.serverTime,
    //     clientTime: Date.now(),
    //     cntPerFrame: gameProps.cntPerFrame,
    //   });
    // }
  };

  useEffect(() => {
    if (!authState.gameSocket) return console.log("no connection to gamesocket")

    setClient(true);

    authState.gameSocket.emit("game_start", { userIdx: authState.userInfo.id });
    authState.gameSocket.on("game_start", (res) => {
      console.log("game_start", res);
    });

    authState.gameSocket.emit("game_frame");
    authState.gameSocket.on("game_frame", (res: IGameProps) => {
      setGameProps(res);
      authState.gameSocket!.emit("game_move_paddle", {
        userIdx: authState.userInfo.id,
        paddle: keyboard,
        serverTime: gameProps.serverTime,
        clientTime: Date.now(),
        cntPerFrame: gameProps.cntPerFrame,
      });
    });

    authState.gameSocket.on(
      "game_move_paddle",
      ({ code, msg }: { code: number; msg: string }) => {
        if (code === 200) {
          console.log("success");
        }
      }
    );
    
    authState.gameSocket.on("game_pause_score", (data: IGameEnd) => {
      console.log("game_pause_score");
      authState.gameSocket!.emit(
        "game_pause_score",
        { userIdx: authState.userInfo.id },
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

    window.addEventListener("keydown", downPaddle);
    window.addEventListener("keyup", upPaddle);

    return () => {
      if (!authState.gameSocket) return console.log("no connection to gamesocket")
      authState.gameSocket.off("game_start");
      authState.gameSocket.off("game_frame");
      authState.gameSocket.off("game_move_paddle");
      authState.gameSocket.off("game_pause_score");

      window.removeEventListener("keydown", downPaddle);
      window.removeEventListener("keyup", upPaddle);
    };
  }, [keyboard]);

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
