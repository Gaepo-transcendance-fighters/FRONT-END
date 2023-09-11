"use client";

import Layout from "@/components/public/Layout";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ModalPortal } from "@/components/public/ModalPortal";
import { useModalContext } from "@/context/ModalContext";
import InviteGame from "@/components/main/InviteGame/InviteGame";

const server_domain = process.env.NEXT_PUBLIC_SERVER_URL_4000;

export default function HomePage() {
  const router = useRouter();
  const [client, setClient] = useState(false);
  const { authState, authDispatch } = useAuth();

  useEffect(() => {
    setClient(true);

    console.log(`${server_domain}/chat`)

    const socket = io(`${server_domain}/chat`, {
      query: { userId: authState.userInfo.id },
      autoConnect: false,
    });

    const gameSocket = io(`${server_domain}/game`, {
      query: { userId: authState.userInfo.id },
      autoConnect: false,
    });

    authDispatch({ type: "SET_CHAT_SOCKET", value: socket });
    authDispatch({ type: "SET_GAME_SOCKET", value: gameSocket });

    router.replace("/home")
  }, []);

  return null;
}
