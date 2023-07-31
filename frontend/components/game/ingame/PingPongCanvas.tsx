import React, { useEffect, useRef, useState } from "react";

const Pong = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paddleHeight = 50;
  const paddleWidth = 10;

  const paddleY = useRef([225, 225]);

  const [ball, setBall] = useState({ x: 500, y: 250 });
  const ballRadius = 5;

  // Speed
  let speedY = 2;
  let speedX = 2;

  // Direction
  let directionX = 1;
  let directionY = 1;

  // Score for Both Players
  const [score, setScore] = useState([0, 0]);

  // Render Everything on Canvas
  const renderCanvas = () => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    const width = canvasRef.current.width;
    const height = canvasRef.current.height;

    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "white";

    context.fillRect(10, paddleY.current[0], paddleWidth, paddleHeight);
    context.fillRect(width - 20, paddleY.current[1], paddleWidth, paddleHeight);

    context.beginPath();
    context.arc(ball.x, ball.y, ballRadius, 2 * Math.PI, 0, false);
    context.fillStyle = "white";
    context.fill();

    context.beginPath();
    context.setLineDash([4]);
    context.moveTo(500, 0);
    context.lineTo(500, 500);
    context.strokeStyle = "grey";
    context.stroke();

    // Score
    context.font = "32px Courier New";
    context.fillText(score[0].toString(), 20, height - 30);
    context.fillText(score[1].toString(), width - 50, height - 30);
  };

  const moveBall = () => {
    if (!canvasRef.current) return;
    // Update Ball Position
    ball.x += directionX * speedX;
    ball.y += directionY * speedY;

    // Top Wall
    if (ball.y < ballRadius) {
      directionY = 1;
    }

    // Bottom Wall
    if (ball.y > canvasRef.current.height - ballRadius) {
      directionY = -1;
    }

    // Left Paddle
    if (
      ball.x < paddleWidth + 10 &&
      ball.y > paddleY.current[0] &&
      ball.y < paddleY.current[0] + paddleHeight
    ) {
      directionX = 1;
    }

    // Right Paddle
    if (
      ball.x > canvasRef.current.width - (paddleWidth + 20) &&
      ball.y > paddleY.current[1] &&
      ball.y < paddleY.current[1] + paddleHeight
    ) {
      directionX = -1;
    }

    // Left Wall
    if (ball.x < ballRadius) {
      setScore([score[0], score[1] + 1]);
      ball.x = 500;
      ball.y = 250;
    }

    // Right Wall
    if (ball.x > canvasRef.current.width - ballRadius) {
      setScore([score[0] + 1, score[1]]);
      ball.x = 500;
      ball.y = 250;
    }

    setBall({ x: ball.x, y: ball.y });
  };

  const movePaddle = (e: KeyboardEvent) => {
    if (!canvasRef.current) return;
    // Use arrow keys to move the right player's paddle
    if (e.key === "ArrowUp") {
      paddleY.current[0] -= 15;
    } else if (e.key === "ArrowDown") {
      paddleY.current[0] += 15;
    }

    // Keep the paddle within canvas bounds
    if (paddleY.current[0] < 0) paddleY.current[1] = 0;
    if (paddleY.current[0] > canvasRef.current.height - paddleHeight)
      paddleY.current[0] = canvasRef.current.height - paddleHeight;

    // Render updated canvas with paddle's new position
    renderCanvas();
  };

  const animate = () => {
    moveBall();
    renderCanvas();
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = 1000;
      canvasRef.current.height = 500;
    }
    renderCanvas();
    window.addEventListener("keydown", movePaddle);

    // Animation loop (updates every frame)
    animate();

    // Clean up event listener
    return () => {
      window.removeEventListener("keydown", movePaddle);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Pong;
