"use client";

import Layout from "@/components/public/Layout";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ModalPortal } from "@/components/public/ModalPortal";
import { useModalContext } from "@/context/ModalContext";
import InviteGame from "@/components/main/InviteGame/InviteGame";
import { socket } from "../page";

const Page = () => {
  const param = useSearchParams();
  const router = useRouter();
  const [client, setClient] = useState(false);
  const {authDispatch} = useAuth()
  const { openModal } = useModalContext();

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
    authDispatch({type: "SET_ID", value: parseInt(localStorage.getItem('idx')!)})
    setClient(true);
    socket.connect();
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
    socket.on("chat_invite_answer", askInvite);
    return () => {
      socket.off("chat_invite_answer");
    };
  }, []);

  if (!client) return <></>;

  return (
    <>
      <Layout></Layout>
      <ModalPortal />
    </>
  );
};

export default Page;
