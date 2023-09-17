"use client";

import Layout from "@/components/public/Layout";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ModalPortal } from "@/components/public/ModalPortal";
import { useModalContext } from "@/context/ModalContext";
import InviteGame from "@/components/main/InviteGame/InviteGame";
import { useGame } from "@/context/GameContext";
import { GameType } from "@/type/type";
import { server_domain } from "../page";
import { ReturnMsgDto } from "@/type/RoomType";

const Page = () => {
  const param = useSearchParams();
  const router = useRouter();
  const { gameDispatch } = useGame();
  const [client, setClient] = useState(false);
  const { authState, authDispatch } = useAuth();
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
    if (authState.chatSocket === undefined) return router.replace("/");

    console.log("chat socket connect", authState.chatSocket.connected);
    if (!authState.chatSocket.connected) {
      authState.chatSocket.connect();
    }

    const askInvite = ({
      userIdx,
      userNickname,
    }: {
      userIdx: number;
      userNickname: string;
    }) => {
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
      if (answer === 0) closeModal();
      else if (answer === 1) {
        gameDispatch({ type: "SET_GAME_MODE", value: GameType.FRIEND });
        const target = { nick: inviteUserNickname, id: inviteUserIdx };
        console.log("target", target);
        gameDispatch({ type: "B_PLAYER", value: target });
        closeModal();
        router.push("./optionselect");
      }
    };
    authState.chatSocket.on("chat_receive_answer", recieveInvite);
    authState.chatSocket.on("chat_invite_answer", askInvite);
    return () => {
      if (!authState.chatSocket) return;
      authState.chatSocket.off("chat_receive_answer");
      authState.chatSocket.off("chat_invite_answer");
    };
  }, []);

  useEffect(() => {
    if (authState.chatSocket === undefined) return;
    const interval = setInterval(() => {
      authState.chatSocket!.emit("health_check", {}, (res: ReturnMsgDto) => {
        if (res.code === 200) {
          console.log(res.msg);
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
