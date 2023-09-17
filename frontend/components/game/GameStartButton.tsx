"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRoom } from "@/context/RoomContext";

const GameStartButton = () => {
  const router = useRouter();
  const { roomState, roomDispatch } = useRoom();

  const onClick = () => {
    if (roomState.currentRoom?.mode !== "private") {
      roomDispatch({ type: "SET_CUR_ROOM", value: null });
      roomDispatch({ type: "SET_IS_OPEN", value: false });
    }
    router.push("./game");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "normal",
      }}
    >
      <Button
        onClick={onClick}
        variant="outlined"
        style={{
          padding: "40px 60px",
          borderRadius: "15px",
          border: "10px solid",
          backgroundColor: "white",
        }}
      >
        <Image
          src="/CrazyPong.png"
          alt="offline"
          width={250}
          height={150}
        ></Image>
      </Button>
    </div>
  );
};

export default GameStartButton;
