"use client";

import { Button } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import WaitAccept from "./WaitAccept";
import { IChatRoom, IMember, ReturnMsgDto } from "@/type/RoomType";
import { useAuth } from "@/context/AuthContext";
import { useModalContext } from "@/context/ModalContext";
import { useGame } from "@/context/GameContext";
import { GameType } from "@/type/type";
import secureLocalStorage from "react-secure-storage";
import { useRoom } from "@/context/RoomContext";

const MemberGameButton = ({ prop }: { prop: IMember }) => {
  const router = useRouter();
  const { authState } = useAuth();
  const { openModal, closeModal } = useModalContext();
  const { gameDispatch } = useGame();
  const { roomDispatch } = useRoom();

  const handleOpenModal = () => {
    if (!authState.chatSocket) return;
    authState.chatSocket.emit(
      "chat_invite_ask",
      {
        myUserIdx: parseInt(secureLocalStorage.getItem("idx") as string),
        targetUserIdx: prop.userIdx,
      },
      (res: ReturnMsgDto) => {
        console.log(res);
        if (res.code === 200) {
          console.log("open", prop.nickname);
          openModal({
            children: <WaitAccept nickname={prop.nickname} />,
          });
        } else if (res.code === 400) {
          closeModal();
        }
      }
    );
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
        roomDispatch({ type: "SET_IS_OPEN", value: false });
        roomDispatch({ type: "SET_CUR_ROOM", value: null });
        closeModal();
        router.push("./optionselect");
      }
    };

    const MemGoToLobby = (payload: IChatRoom[]) => {
      console.log("MemGoToLobby : ", payload);
      roomDispatch({ type: "SET_NON_DM_ROOMS", value: payload });
    };
    authState.chatSocket.on("chat_goto_lobby", MemGoToLobby);
    authState.chatSocket.on("chat_receive_answer", recieveInvite);
    authState.chatSocket.on("chat_invite_ask", askInvite);

    return () => {
      if (!authState.chatSocket) return;
      authState.chatSocket.off("chat_goto_lobby", MemGoToLobby);
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
