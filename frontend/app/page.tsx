"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import secureLocalStorage from "react-secure-storage";
import { useUser } from "@/context/UserContext";

export const server_domain = process.env.NEXT_PUBLIC_SERVER_URL_4000;

export default function HomePage() {
  const router = useRouter();
  const [client, setClient] = useState(false);
  const { authState, authDispatch } = useAuth();
  const { userDispatch } = useUser();

  useEffect(() => {
    console.log(`${server_domain}/chat`);

    const socket = io(`${server_domain}/chat`, {
      query: { userId: secureLocalStorage.getItem("idx") },
      autoConnect: false,
    });

    const gameSocket = io(`${server_domain}/game/playroom`, {
      query: { userId: secureLocalStorage.getItem("idx") },
      autoConnect: false,
    });

    authDispatch({ type: "SET_CHAT_SOCKET", value: socket });

    console.log(socket);
    authDispatch({ type: "SET_GAME_SOCKET", value: gameSocket });

    const nickname = secureLocalStorage.getItem("nickname") as string;
    const idx = secureLocalStorage.getItem("idx") as string;
    const email = secureLocalStorage.getItem("email") as string;
    const imgUri = secureLocalStorage.getItem("imgUri") as string;
    const token = secureLocalStorage.getItem("token") as string;
    const auth = secureLocalStorage.getItem("check2Auth") as string;

    console.log(
      `
      page localstorage:
        ${idx},
        ${nickname},
        ${email},
        ${imgUri},
        ${token},
        ${auth}
      `
    );

    if (idx && nickname && email && imgUri && token) {
      console.log("road to home");

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
      console.log("go to home");
      return router.replace("/home");
    }
    console.log("go to login");
    return router.replace("/login");
  }, []);

  return null;
}
