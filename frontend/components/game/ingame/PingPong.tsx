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
  let ballSpeed = 4;

  const [ready, setReady] = useState(true);
  const [myPaddle, setMyPaddle] = useState<IPaddle>({ x: -470, y: 0 });
  const [enemyPaddle, setEnemyPaddle] = useState<IPaddle>({ x: 470, y: 0 });
  const [ball, setBall] = useState<IBall>({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ x: 1, y: 1 });
  const ballRef = useRef<IBall>({ x: 0, y: 0 });

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
    const newLocation = {
      x: ball.x + direction.x * ballSpeed,
      y: ball.y + direction.y * ballSpeed,
    };

    if (newLocation.x <= -500 || newLocation.x > 500)
      setDirection((prev) => ({ x: -prev.x, y: prev.y }));
    if (newLocation.y <= -250 || newLocation.y >= 250)
      setDirection((prev) => ({ x: prev.x, y: -prev.y }));

    setBall(newLocation);
    requestAnimationFrame(ballMove);
  }, [ball]);

  requestAnimationFrame(ballMove);

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
