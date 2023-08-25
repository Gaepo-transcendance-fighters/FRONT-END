"use client";

import { Box, Button, Card, CardContent, Modal } from "@mui/material";
import { useEffect, useState, forwardRef } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/app/page";
import InviteGame from "./InviteGame";
import WaitAccept from "./WaitAccept";
import { IFriend, IMember } from "@/type/type";
import { useAuth } from "@/context/AuthContext";
import { useModalContext } from "@/context/ModalContext";


const Bar = forwardRef((props: any, ref: any) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
));

const MemberGameButton = ({ prop }: { prop: IMember }) => {
  const router = useRouter();
  const { authState } = useAuth();
  const { openModal } = useModalContext();

  const handleOpenModal = () => {
    socket.emit("chat_invite_ask", {
      myUserIdx: authState.id,
      targetUserIdx: prop.userIdx,
    });
    console.log("open")
    openModal({
      children: <WaitAccept open={true} />,
    })
  };

  useEffect(() => {
    const askInvite = ({
      myUserIdx,
      targetUserIdx,
    }: {
      myUserIdx: number;
      targetUserIdx: number;
    }) => {
      handleOpenModal();
    };
    socket.on("chat_invite_ask", askInvite);

    return () => {
      socket.off("chat_invite_ask");
    };
  }, []);

  return (
    <>
      <Button
        type="button"
        sx={{ minWidth: "max-content" }}
        variant="contained"
        onClick={() => handleOpenModal()}
      >
        친선전
      </Button>
      {/* <Bar>
        {!isInvite ? (
          <InviteGame open={openModal} />
        ) : (
          <WaitAccept open={openModal} />
        )}
      </Bar> */}
    </>
  );
};

export default MemberGameButton;
