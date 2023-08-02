"use client";

import GameBoard from "./GameBoard";
import GamePaddle from "./GamePaddle";
import { useCallback, useEffect, useState, useRef, useContext } from "react";
import GameBall from "./GameBall";
import { useGame } from "@/context/GameContext";

interface IPaddle {
  x: number;
  y: number;
}

interface IBall {
  x: number;
  y: number;
}

const PingPong = () => {
  const { state, dispatch } = useGame();

  const requireAnimationRef = useRef(0);

  const [ready, setReady] = useState(false);
  const [myPaddle, setMyPaddle] = useState<IPaddle>({ x: -470, y: 0 });
  const [enemyPaddle, setEnemyPaddle] = useState<IPaddle>({ x: 470, y: 0 });
  const [ball, setBall] = useState<IBall>({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ x: 1, y: 1 });

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

  const resetBall = () => {
    setBall((prev) => {
      return { ...prev, x: 0, y: 0 };
    });
  };

  const gameStart = () => {
    setTimeout(() => {
      setReady(true);
    }, 2000);
  };

  const ballMove = useCallback(() => {
    const newLocation = {
      x: ball.x + direction.x * state.ballSpeedOption,
      y: ball.y + direction.y * state.ballSpeedOption,
    };

    if (
      newLocation.x > myPaddle.x &&
      newLocation.x < myPaddle.x + 20 &&
      newLocation.y > myPaddle.y - 50 &&
      newLocation.y < myPaddle.y + 50
    )
      setDirection((prev) => ({ x: -prev.x, y: prev.y }));
    else if (
      newLocation.x > enemyPaddle.x &&
      newLocation.x < enemyPaddle.x + 20 &&
      newLocation.y > enemyPaddle.y - 50 &&
      newLocation.y < enemyPaddle.y + 50
    )
      setDirection((prev) => ({ x: -prev.x, y: prev.y }));

    if (newLocation.y <= -250 || newLocation.y >= 250)
      setDirection((prev) => ({ x: prev.x, y: -prev.y }));

    if (newLocation.x <= -500) {
      dispatch({ type: "B_SCORE", value: state.bScore });
      resetBall();
      setReady(false);
      return;
    }
    if (newLocation.x > 500) {
      dispatch({ type: "A_SCORE", value: state.aScore });
      resetBall();
      setReady(false);
      return;
    }

    setBall(newLocation);
    requireAnimationRef.current = requestAnimationFrame(ballMove);
  }, [ball]);

  useEffect(() => {
    if (!ready) return gameStart();
    window.addEventListener("keydown", handlePaddle);

    requireAnimationRef.current = requestAnimationFrame(ballMove);

    return () => {
      window.removeEventListener("keydown", handlePaddle);
      cancelAnimationFrame(requireAnimationRef.current);
    };
  }, [handlePaddle, ballMove, ready]);

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
