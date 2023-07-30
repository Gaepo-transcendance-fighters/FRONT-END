import { Card } from "@mui/material";

const GameBoard = () => {
  return (
    <Card
      style={{
        position: "relative",
        minWidth: "1000px",
        minHeight: "500px",
        border: "2px solid black",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    ></Card>
  );
};

export default GameBoard;
