"use client";

import GameBoard from "./GameBoard";
import GamePaddle from "./GamePaddle";
import { useEffect, useState } from "react";
import GameBall from "./GameBall";
import { useGame } from "@/context/GameContext";
import { gameSocket } from "@/app/page";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

interface IGameProps {
  ballX: number;
  BallY: number;
  paddle1: number; // 현재 위치
  paddle2: number; // 현재 위치
  hit: number; // 0 - no hit, 1 - player 1 paddle 에 hit, 2
  serverTime: number; // ms 단위로, ping check 용
  cntPerFrame: number; // 1 - 60 까지 계속 반복됨
}

const PingPong = () => {
  const [client, setClient] = useState(false);
  const router = useRouter();
  const { gameState, gameDispatch } = useGame();
  const { authState } = useAuth();
  const [gameProps, setGameProps] = useState<IGameProps>({
    ballX: 0,
    BallY: 0,
    paddle1: 0,
    paddle2: 0,
    hit: 0,
    serverTime: 0,
    cntPerFrame: 0,
  });

  // const requireAnimationRef = useRef(0);
  // const [ready, setReady] = useState(false);
  // const [myPaddle, setMyPaddle] = useState<IPaddle>({ x: 0, y: 0 });
  // const [enemyPaddle, setEnemyPaddle] = useState<IPaddle>({ x: 0, y: 0 });
  // const [ball, setBall] = useState<IBall>({ x: 0, y: 0 });
  // const [direction, setDirection] = useState({ x: 1, y: 1 });
  // const [ballStandard, setBallStandard] = useState(0);
  // const [paddleStandard, setPaddleStandard] = useState(0);
  // const [inputcount, setInputcount] = useState(0);

  // 예전 게임 로직
  // const handlePaddle = useCallback(
  //   (e: KeyboardEvent) => {
  //     const now = new Date().getTime();
  //     if (now >= paddleStandard + gameState.latency) {
  //       if (e.code === "ArrowUp") {
  //         setInputcount((prev) => {
  //           return prev - 1;
  //         });
  //         setMyPaddle((prev) => {
  //           const newY = prev.y - 10;
  //           console.log(newY);
  //           if (newY < -200) {
  //             return prev;
  //           }
  //           return { ...prev, y: newY };
  //         });
  //       } else if (e.code === "ArrowDown") {
  //         setInputcount((prev) => {
  //           return prev + 1;
  //         });
  //         setMyPaddle((prev) => {
  //           const newY = prev.y + 10;
  //           console.log(newY);
  //           if (newY > 200) {
  //             return prev;
  //           }
  //           return { ...prev, y: newY };
  //         });
  //       }
  //       const newPaddleStandard = new Date().getTime();
  //       setPaddleStandard(newPaddleStandard);
  //     }
  //   },
  //   [myPaddle.y, gameState.latency]
  // );

  // const resetBall = () => {
  //   setBall((prev) => {
  //     return { ...prev, x: 0, y: 0 };
  //   });
  // };

  // const resetDerection = () => {
  //   setDirection((prev) => {
  //     return { ...prev, x: 1, y: 1 };
  //   });
  // };

  // const gameStart = () => {
  //   setTimeout(() => {
  //     const now = new Date().getTime();
  //     setBallStandard(now);
  //     setPaddleStandard(now);
  //     setReady(true);
  //   }, 2000 + gameState.latency);
  // };

  // const sendDataToServer = () => {
  //   if (!ready) return;

  //   gameSocket.emit("game_move_paddle", {
  //     userIdx: authState.id,
  //     clientDate: Date.now(),
  //     paddleInput: inputcount,
  //   });

  //   setInputcount(0);
  // };

  // const debouncedSendData = debounce(sendDataToServer, 300);

  // const ballMove = useCallback(() => {
  //   const now = new Date().getTime();

  //   if (now >= ballStandard + gameState.latency) {
  //     const newLocation = {
  //       x: ball.x + direction.x * gameState.ballSpeedOption,
  //       y: ball.y + direction.y * gameState.ballSpeedOption,
  //     };

  //     if (
  //       newLocation.x > myPaddle.x &&
  //       newLocation.x < myPaddle.x + 20 &&
  //       newLocation.y > myPaddle.y - 20 &&
  //       newLocation.y < myPaddle.y + 20
  //     ) {
  //       setDirection((prev) => ({ x: -prev.x, y: 1 }));
  //       gameSocket.emit(
  //         "game_predict_ball",
  //         {
  //           roomId: gameState.roomId,
  //           ballPosX: ball.x,
  //           ballPosY: ball.y,
  //           ballDegreeX: direction.x,
  //           ballDegreeY: direction.y,
  //           ballHitDate: Date.now(),
  //         },
  //         (res: {
  //           animationStartDate: number;
  //           ballDegreeX: number;
  //           ballDegreeY: number;
  //           ballNextPosX: number;
  //           ballNextPosY: number;
  //           ballExpectedEventDate: number;
  //         }) => {
  //           console.log(200, "ok", res);
  //         }
  //       );
  //     } else if (
  //       newLocation.x > enemyPaddle.x - 20 &&
  //       newLocation.x < enemyPaddle.x &&
  //       newLocation.y > enemyPaddle.y - 20 &&
  //       newLocation.y < enemyPaddle.y + 20
  //     ) {
  //       setDirection((prev) => ({ x: -prev.x, y: 1 }));
  //       gameSocket.emit("game_predict_ball", {
  //         roomId: gameState.roomId,
  //         ballPosX: ball.x,
  //         ballPosY: ball.y,
  //         ballDegreeX: direction.x,
  //         ballDegreeY: direction.y,
  //         ballHitDate: Date.now(),
  //       });
  //     } else if (
  //       newLocation.x > myPaddle.x &&
  //       newLocation.x < myPaddle.x + 20 &&
  //       newLocation.y > myPaddle.y - 50 &&
  //       newLocation.y < myPaddle.y + 50
  //     ) {
  //       setDirection((prev) => ({ x: -prev.x, y: 2 }));
  //       gameSocket.emit("game_predict_ball", {
  //         roomId: gameState.roomId,
  //         ballPosX: ball.x,
  //         ballPosY: ball.y,
  //         ballDegreeX: direction.x,
  //         ballDegreeY: direction.y,
  //         ballHitDate: Date.now(),
  //       });
  //     } else if (
  //       newLocation.x > enemyPaddle.x - 20 &&
  //       newLocation.x < enemyPaddle.x &&
  //       newLocation.y > enemyPaddle.y - 50 &&
  //       newLocation.y < enemyPaddle.y + 50
  //     ) {
  //       setDirection((prev) => ({ x: -prev.x, y: 2 }));
  //       gameSocket.emit("game_predict_ball", {
  //         roomId: gameState.roomId,
  //         ballPosX: ball.x,
  //         ballPosY: ball.y,
  //         ballDegreeX: direction.x,
  //         ballDegreeY: direction.y,
  //         ballHitDate: Date.now(),
  //       });
  //     }

  //     if (newLocation.y <= -250 || newLocation.y >= 250) {
  //       setDirection((prev) => ({ x: prev.x, y: -prev.y }));
  //       gameSocket.emit("game_predict_ball", {
  //         roomId: gameState.roomId,
  //         ballPosX: ball.x,
  //         ballPosY: ball.y,
  //         ballDegreeX: direction.x,
  //         ballDegreeY: direction.y,
  //         ballHitDate: Date.now(),
  //       });
  //     }

  //     if (newLocation.x <= -500) {
  //       gameDispatch({ type: "B_SCORE", value: gameState.bScore + 1 });
  //       gameSocket.emit(
  //         "game_pause_score",
  //         {
  //           userIdx: gameState.bPlayer.id,
  //           score: gameState.bScore,
  //           getScoreTime: Date.now(),
  //         },
  //         (res: { code: number; msg: string }) => {
  //           console.log(res);
  //         }
  //       );
  //       resetBall();
  //       resetDerection();
  //       setReady(false);
  //       return;
  //     }
  //     if (newLocation.x > 500) {
  //       gameDispatch({ type: "A_SCORE", value: gameState.aScore + 1 });
  //       gameSocket.emit(
  //         "game_pause_score",
  //         {
  //           userIdx: gameState.aPlayer.id,
  //           score: gameState.aScore,
  //           getScoreTime: Date.now(),
  //         },
  //         (res: { code: number; msg: string }) => {
  //           console.log(res);
  //         }
  //       );
  //       resetBall();
  //       resetDerection();
  //       setReady(false);
  //       return;
  //     }
  //     setBall(newLocation);

  //     const newBallStandard = new Date().getTime();
  //     setBallStandard(newBallStandard);
  //   }
  //   requireAnimationRef.current = requestAnimationFrame(ballMove);
  // }, [ball]);
  // useEffect(() => {
  //   setClient(true);
  //   if (gameState.aPlayer.id === authState.id) {
  //     setMyPaddle({ x: 470, y: 0 });
  //     setEnemyPaddle({ x: -470, y: 0 });
  //   } else if (gameState.bPlayer.id === authState.id) {
  //     setMyPaddle({ x: -470, y: 0 });
  //     setEnemyPaddle({ x: 470, y: 0 });
  //   }
  //   gameSocket.on(
  //     "game_predict_ball",
  //     ({
  //       animationStartDate,
  //       ballDegreeX,
  //       ballDegreeY,
  //       ballNextPosX,
  //       ballNextPosY,
  //       ballExpectedEventDate,
  //     }) => {
  //       console.log(200, "ok");
  //       gameDispatch({
  //         type: "SET_SERVER_DATE_TIME",
  //         value: animationStartDate,
  //       });
  //     }
  //   );

  //   gameSocket.on("game_move_paddle", ({ targetLatency, paddleInput }) => {
  //     setEnemyPaddle((prev) => {
  //       const newY = prev.y + paddleInput * 20;

  //       if (newY < -200) {
  //         return { ...prev, y: -200 };
  //       } else if (newY > 200) {
  //         return { ...prev, y: 200 };
  //       }
  //       return { ...prev, y: newY };
  //     });
  //   });
  //   return () => {
  //     gameSocket.off("game_predict_ball");
  //     gameSocket.off("game_move_paddle");
  //   };
  // }, []);

  // useEffect(() => {
  //   if (gameState.aScore === 5 || gameState.bScore === 5) {
  //     gameDispatch({ type: "GAME_RESET", value: resetGameContextData() });
  //     //게임 종료 이벤트 자리
  //     router.push("/gameresult");
  //   }
  // }, [gameState.aScore, gameState.bScore]);

  // useEffect(() => {
  //   gameDispatch({ type: "SET_LATENCY", value: gameState.latency / 2 });
  //   if (!ready) return gameStart();

  //   window.addEventListener("keydown", handlePaddle);
  //   window.addEventListener("keyup", debouncedSendData);

  //   requireAnimationRef.current = requestAnimationFrame(ballMove);

  //   return () => {
  //     window.removeEventListener("keydown", handlePaddle);
  //     window.removeEventListener("keyup", debouncedSendData);

  //     cancelAnimationFrame(requireAnimationRef.current);
  //   };
  // }, [ready, ballMove]);

  const movePaddle = (e: KeyboardEvent) => {
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
    gameSocket.on("game_start", (res) => {
      console.log("game_start", res);
    });
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

    window.addEventListener("keydown", movePaddle);

    return () => {
      gameSocket.off("game_start");
      gameSocket.off("game_frame");

      window.removeEventListener("keydown", movePaddle);
    };
  }, []);

  if (!client) return <></>;

  return (
    <>
      <GameBoard />
      <GamePaddle x={-470} y={gameProps.paddle1} />
      <GamePaddle x={470} y={gameProps.paddle2} />
      <GameBall x={gameProps.ballX} y={gameProps.BallY} />
    </>
  );
};

export default PingPong;
