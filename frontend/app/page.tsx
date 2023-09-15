"use client";

import Layout from "@/components/public/Layout";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ModalPortal } from "@/components/public/ModalPortal";
import { useModalContext } from "@/context/ModalContext";
import { useUser } from "@/context/UserContext";
import InviteGame from "@/components/main/InviteGame/InviteGame";

export const server_domain = process.env.NEXT_PUBLIC_SERVER_URL_4000;

export default function HomePage() {
  const router = useRouter();
  const [client, setClient] = useState(false);
  const { authState, authDispatch } = useAuth();
  const { userDispatch } = useUser();

  useEffect(() => {
    setClient(true);

    console.log(`${server_domain}/chat`)

    const socket = io(`${server_domain}/chat`, {
      query: { userId: localStorage.getItem("idx") },
      autoConnect: false,
    });

    const gameSocket = io(`${server_domain}/game/playroom`, {
      query: { userId: localStorage.getItem("idx") },
      autoConnect: false,
    });

    authDispatch({ type: "SET_CHAT_SOCKET", value: socket });
    authDispatch({ type: "SET_GAME_SOCKET", value: gameSocket });

    const nickname = localStorage.getItem("nickname");
    const idx = localStorage.getItem("idx");
    const email = localStorage.getItem("email");
    const imgUri = localStorage.getItem("imgUri");
    const token = localStorage.getItem("token");
    const auth = localStorage.getItem("check2Auth");

    if (!idx || !nickname || !email || !imgUri || !token) {
      userDispatch({ type: "SET_USER_IDX", value: parseInt(idx!) });
      userDispatch({ type: "CHANGE_NICK_NAME", value: nickname! });
      userDispatch({ type: "CHANGE_IMG", value: imgUri! });
      authDispatch({
        type: "SET_ID",
        value: parseInt(idx!),
      });
      authDispatch({
        type: "SET_NICKNAME",
        value: nickname!,
      });
      authDispatch({
        type: "SET_IMGURL",
        value: imgUri!,
      });
      authDispatch({
        type: "SET_AUTHORIZATION",
        value: token!,
      });
      authDispatch({
        type: "SET_CHECK2AUTH",
        value: Boolean(auth!),
      });
      authDispatch({
        type: "SET_EMAIL",
        value: email!,
      });
      router.replace("/home");
    }
    router.replace("/login")
  }, []);

  return null;
}
