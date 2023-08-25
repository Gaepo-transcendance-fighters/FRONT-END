"use client";

import { Box, Button, Card, CardContent, Modal } from "@mui/material";
import { useEffect, useState, forwardRef } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/app/page";
import InviteGame from "./InviteGame";
import WaitAccept from "./WaitAccept";
import { IFriend, IMember } from "@/type/type";
import { useAuth } from "@/context/AuthContext";

const Bar = forwardRef((props: any, ref: any) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
));

const MemberGameButton = ({ prop }: { prop: IMember }) => {
  const router = useRouter();
  const [isInvite, setIsInvite] = useState(false);
  const { authState } = useAuth();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => {
    socket.emit("chat_invite_ask", {
      myUserIdx: authState.id,
      targetUserIdx: prop.userIdx,
    });
    setIsInvite(true);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const askInvite = ({
      myUserIdx,
      targetUserIdx,
    }: {
      myUserIdx: number;
      targetUserIdx: number;
    }) => {
      console.log("초대 받음");
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
        onClick={handleOpenModal}
      >
        친선전
      </Button>
      <Bar>
        {!isInvite ? (
          <InviteGame open={openModal} />
        ) : (
          <WaitAccept open={openModal} />
        )}
      </Bar>
    </>
  );
};

export default MemberGameButton;

// display: "flex",
// alignItems: "center",
// justifyContent: "center",
