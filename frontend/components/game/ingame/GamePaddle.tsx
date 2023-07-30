import { Box } from "@mui/material";
import React from "react";

const GamePaddle = ({ x, y }: { x: number; y: number }) => {
  return (
    <Box
      component={"div"}
      sx={{
        position: "absolute",
        width: "50px",
        height: "120px",
        backgroundColor: "grey",
        transform: `translate(${x}px, ${y}px)`,
      }}
    ></Box>
  );
};

export default GamePaddle;
