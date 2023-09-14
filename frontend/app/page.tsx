"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import secureLocalStorage from "react-secure-storage";

export const server_domain = process.env.NEXT_PUBLIC_SERVER_URL_4000;

export default function HomePage() {
  const router = useRouter();
  const [client, setClient] = useState(false);
  const { authState, authDispatch } = useAuth();

  useEffect(() => {
    setClient(true);

    const socket = io(`${server_domain}/chat`, {
      query: { userId: secureLocalStorage.getItem("idx") },
      autoConnect: false,
    });

    const gameSocket = io(`${server_domain}/game/playroom`, {
      query: { userId: secureLocalStorage.getItem("idx") },
      autoConnect: false,
    });

    authDispatch({ type: "SET_CHAT_SOCKET", value: socket });
    authDispatch({ type: "SET_GAME_SOCKET", value: gameSocket });

    router.replace("/home");
  }, []);

  return null;
}
