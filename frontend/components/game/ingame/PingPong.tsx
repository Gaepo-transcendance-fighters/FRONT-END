"use client";

import { Card } from "@mui/material";
import GameBoard from "./GameBoard";
import GamePaddle from "./GamePaddle";
import { useCallback, useEffect, useState } from "react";

interface IPaddle {
  x: number;
  y: number;
}

const PingPong = () => {
  const [myPaddle, setMyPaddle] = useState<IPaddle>({ x: -430, y: 0 });
  const [enemyPaddle, setEnemyPaddle] = useState<IPaddle>({ x: 430, y: 0 });

  const handlePaddle = useCallback((e: KeyboardEvent) => {
    if (e.code === "ArrowUp") {
      setMyPaddle((prev) => {
        const newY = prev.y - 9;
        if (newY < -window.innerHeight / 2) {
          return prev;
        }
        return { ...prev, y: newY };
      });
    } else if (e.code === "ArrowDown") {
      setMyPaddle((prev) => {
        const newY = prev.y + 9;
        if (newY > window.innerHeight / 2) {
          return prev;
        }
        return { ...prev, y: newY };
      });
    }
  }, []);

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
    </>
  );
};

export default PingPong;
