"use client";

import { Button } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import WaitAccept from "./WaitAccept";
import { IMember, ReturnMsgDto } from "@/type/RoomType";
import { useAuth } from "@/context/AuthContext";
import { useModalContext } from "@/context/ModalContext";
import { useGame } from "@/context/GameContext";
import { GameType } from "@/type/type";
import secureLocalStorage from "react-secure-storage";

const MemberGameButton = ({ prop }: { prop: IMember }) => {
  const router = useRouter();
  const { authState } = useAuth();
  const { openModal, closeModal } = useModalContext();
  const { gameDispatch } = useGame();

  const handleOpenModal = () => {
    if (!authState.chatSocket) return;
    authState.chatSocket.emit("chat_invite_ask", {
      myUserIdx: parseInt(secureLocalStorage.getItem("idx") as string),
      targetUserIdx: prop.userIdx,
    }, (res: ReturnMsgDto) => {
      console.log(res)
      if (res.code === 200) {
        console.log("open", prop.nickname);
        openModal({
          children: <WaitAccept nickname={prop.nickname} />,
        });
      } else if (res.code === 400) {
        closeModal()
      }
    });
  };

  useEffect(() => {
    if (!authState.chatSocket) return;
    const askInvite = () => {
      console.log("friend invited");
      handleOpenModal();
    };
    const recieveInvite = ({
      inviteUserIdx,
      inviteUserNickname,
      targetUserIdx,
      targetUserNickname,
      answer,
    }: {
      inviteUserIdx: number;
      inviteUserNickname: string;
      targetUserIdx: number;
      targetUserNickname: string;
      answer: number;
    }) => {
      console.log("receive invite", answer);
      if (answer === 0) closeModal();
      else if (answer === 1) {
        gameDispatch({ type: "SET_GAME_MODE", value: GameType.FRIEND });
        const target = { nick: targetUserNickname, id: targetUserIdx };
        console.log("target", target);
        gameDispatch({ type: "B_PLAYER", value: target });
        closeModal();
        router.push("./optionselect");
      }
    };
    authState.chatSocket.on("chat_receive_answer", recieveInvite);
    authState.chatSocket.on("chat_invite_ask", askInvite);

    return () => {
      if (!authState.chatSocket) return;
      authState.chatSocket.off("chat_receive_answer");
      authState.chatSocket.off("chat_invite_ask");
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
    </>
  );
};

export default MemberGameButton;
