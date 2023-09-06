"use client";

import Layout from "@/components/public/Layout";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ModalPortal } from "@/components/public/ModalPortal";
import { useModalContext } from "@/context/ModalContext";
import InviteGame from "@/components/main/InviteGame/InviteGame";

// dev original
// export const socket = io("http://localhost:4000/chat", {
// haryu's server

// const userId =
//   typeof window !== "undefined" ? localStorage.getItem("idx") : null;
// // export const socket = io("http://localhost:4000/chat", {
//   // haryu's server
// export const socket = io("http://localhost:4000/chat", {
//   query: { userId: userId },
// });

const userId =
  typeof window !== "undefined" ? localStorage.getItem("idx") : null;

export const socket = io("http://localhost:4000/chat", {
  // haryu's server
  // export const socket = io("http://paulryu9309.ddns.net:4000/chat", {
  query: { userId: userId },
  autoConnect: false, //혹시 페이지에서 connect를 하면 새로고침 할 때마다 연결을 시도할까?
});

export const gameSocket = io("http://localhost:4000/", {
  // export const gameSocket = io("http://paulryu9309.ddns.net:4000/game", {
  query: { userId: userId },
  autoConnect: false,
});

const Page = () => {
  const param = useSearchParams();
  const router = useRouter();
  const [client, setClient] = useState(false);
  const { openModal } = useModalContext();

  useEffect(() => {
    if (param.get("from") === "game") {
      const handlePopState = (e: PopStateEvent) => {
        e.preventDefault();
        router.replace("/?from=game");
      };

      window.addEventListener("popstate", handlePopState);
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, []);

  useEffect(() => {
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
