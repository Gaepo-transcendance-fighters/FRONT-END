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

const userId =
  typeof window !== "undefined" ? localStorage.getItem("idx") : null;

export const socket = io(`${server_domain}/chat`, {
  // haryu's server
  // export const socket = io("http://localhost:4000/chat", {
  query: { userId: userId },
});
export const gameSocket = io(`${server_domain}/game`, {
  // export const gameSocket = io("http://localhost:4000/game", {
  query: { userId: userId },
});

export default function HomePage() {
  const router = useRouter();
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
    router.replace("/login");
  }, []);

  return null;
}
