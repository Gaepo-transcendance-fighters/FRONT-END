"use client";

import Layout from "@/components/public/Layout";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ModalPortal } from "@/components/public/ModalPortal";
import { useModalContext } from "@/context/ModalContext";
import InviteGame from "@/components/main/InviteGame/InviteGame";
import { useGame } from "@/context/GameContext";
import { GameType } from "@/type/type";
import { server_domain } from "../page";
import { ReturnMsgDto } from "@/type/RoomType";
import { useRoom } from "@/context/RoomContext";
import { IChatRoom } from "@/type/RoomType";

const Page = () => {
  const param = useSearchParams();
  const router = useRouter();
  const { gameDispatch } = useGame();
  const [client, setClient] = useState(false);
  const { authState, authDispatch } = useAuth();
  const { roomState, roomDispatch } = useRoom();
  const { openModal, closeModal } = useModalContext();
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (param.get("from") === "game") {
      const handlePopState = (e: PopStateEvent) => {
        e.preventDefault();
        router.replace("/home");
      };

      window.addEventListener("popstate", handlePopState);
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, []);

  useEffect(() => {
    setClient(true);
    console.log("🕚", server_domain);
    if (authState.chatSocket === undefined) {
      console.log("go to /");
      router.push("/");
      return;
    }
    console.log(`🐒`, authState.chatSocket);

    console.log(
      "chat socket connect",
      authState.chatSocket.connected,
      authState.chatSocket.disconnected
    );
    authState.chatSocket.connect();

    console.log("chat socket connect", authState.chatSocket.connected);
    const askInvite = ({
      userIdx,
      userNickname,
    }: {
      userIdx: number;
      userNickname: string;
    }) => {
      console.log("😍", userIdx, userNickname);
      openModal({
        children: <InviteGame nickname={userNickname} idx={userIdx} />,
      });
    };

    const recieveInvite = ({
      inviteUserIdx, // 초대 한 사람
      inviteUserNickname,
      targetUserIdx, // 초대 받은 사람
      targetUserNickname,
      answer,
    }: {
      inviteUserIdx: number; // 초대 한 사람
      inviteUserNickname: string;
      targetUserIdx: number; // 초대 받은 사람
      targetUserNickname: string;
      answer: number;
    }) => {
      if (answer === 0) {
        closeModal();
      } else if (answer === 1) {
        gameDispatch({ type: "SET_GAME_MODE", value: GameType.FRIEND });
        const target = { nick: inviteUserNickname, id: inviteUserIdx };
        gameDispatch({ type: "B_PLAYER", value: target });
        if (roomState.currentRoom?.mode !== "private") {
          authState.chatSocket!.emit(
            "chat_goto_lobby",
            {
              channelIdx: roomState.currentRoom!.channelIdx,
              userIdx: authState.userInfo.id,
            },
            (ret: ReturnMsgDto) => {
              console.log("ChatCreateRoom chat_goto_lobby ret : ", ret);
              if (ret.code === 200) {
                roomDispatch({ type: "SET_CUR_ROOM", value: null });
                roomDispatch({ type: "SET_IS_OPEN", value: false });
              }
            }
          );
        }
        closeModal();
        router.push("./optionselect");
      }
    };
    const GoToLobby = (payload: IChatRoom[]) => {
      roomDispatch({ type: "SET_NON_DM_ROOMS", value: payload });
    };
    authState.chatSocket.on("chat_goto_lobby", GoToLobby);
    authState.chatSocket.on("chat_receive_answer", recieveInvite);
    authState.chatSocket.on("chat_invite_answer", askInvite);
    return () => {
      if (!authState.chatSocket) return;
      authState.chatSocket.off("chat_receive_answer");
      authState.chatSocket.off("chat_invite_answer");
    };
  }, [authState.chatSocket]);

  useEffect(() => {
    if (authState.chatSocket === undefined) return;
    const interval = setInterval(() => {
      authState.chatSocket!.emit("health_check", {}, (res: ReturnMsgDto) => {
        if (res.code === 200) {
          setCount(3);
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      if (!authState.chatSocket) return;
      authState.chatSocket.off("health_check");
    };
  }, [count, setCount]);

  useEffect(() => {
    const interval_check = setInterval(() => {
      setCount((prev) => prev - 1);
      // console.log("count : ", count);
    }, 1000);
    if (count < 0) {
      // console.log("count : 0 end ");
      router.replace("/login");
    }

    return () => {
      clearInterval(interval_check);
    };
  }, [count, setCount]);

  if (!client) return <></>;

  return (
    <>
      <Layout></Layout>
      <ModalPortal />
    </>
  );
};

export default Page;
