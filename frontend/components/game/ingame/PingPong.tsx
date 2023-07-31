"use client";

import { Card } from "@mui/material";
import GameBoard from "./GameBoard";
import GamePaddle from "./GamePaddle";
import { useCallback, useEffect, useState, useRef } from "react";
import GameBall from "./GameBall";

interface IPaddle {
  x: number;
  y: number;
}

interface IBall {
  x: number;
  y: number;
}

const PingPong = () => {
  let ballSpeed = 2;
  let directionX = 1;
  let directionY = -1;

  const [ready, setReady] = useState(true);
  const [myPaddle, setMyPaddle] = useState<IPaddle>({ x: -470, y: 0 });
  const [enemyPaddle, setEnemyPaddle] = useState<IPaddle>({ x: 470, y: 0 });
  const [ball, setBall] = useState<IBall>({ x: 0, y: 0 });

  const handlePaddle = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "ArrowUp") {
        setMyPaddle((prev) => {
          const newY = prev.y - 20;
          if (newY < -200) {
            return prev;
          }
          return { ...prev, y: newY };
        });
      } else if (e.code === "ArrowDown") {
        setMyPaddle((prev) => {
          const newY = prev.y + 20;
          if (newY > 200) {
            return prev;
          }
          return { ...prev, y: newY };
        });
      }
    },
    [myPaddle.y]
  );

  const ballMove = useCallback(() => {
    if (ball.y < -250) directionY = 1;
    if (ball.y > 250) directionY = -1;
    if (ball.x >= 500 || ball.x <= -500) directionX = -directionX;

    const newBallX = ball.x + ballSpeed * directionX;
    const newBallY = ball.y + ballSpeed * directionY;

    setBall({ x: newBallX, y: newBallY });
  }, [ball.x, ball.y, directionX, directionY]);

  const animate = () => {
    ballMove();
    requestAnimationFrame(animate);
  };

  // requestAnimationFrame(animate);

  useEffect(() => {
    window.addEventListener("keydown", handlePaddle);

    return () => {
      window.removeEventListener("keydown", handlePaddle);
    };
  }, [handlePaddle]);

  return (
    <>
      <GameBoard />
      <GamePaddle x={myPaddle.x} y={myPaddle.y} />
      <GamePaddle x={enemyPaddle.x} y={enemyPaddle.y} />
      <GameBall x={ball.x} y={ball.y} />
    </>
  );
};

export default PingPong;
