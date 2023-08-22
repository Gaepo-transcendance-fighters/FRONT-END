"use client";

import Layout from "@/components/public/Layout";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { socket } from "./layout";

// dev original
// export const socket = io("http://localhost:4000/chat", {
// haryu's server

const userId =
  typeof window !== "undefined" ? localStorage.getItem("idx") : null;
// // export const socket = io("http://localhost:4000/chat", {
//   // haryu's server
// export const socket = io("http://paulryu9309.ddns.net:4000/chat", {
//   query: { userId: userId },
// });

const Page = () => {
  const param = useSearchParams();
  const router = useRouter();
  const [client, setClient] = useState(false);

  useEffect(() => {
    if (param.get("from") === "game") {
      const handlePopState = (e: PopStateEvent) => {
        e.preventDefault();
        router.replace("/");
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
  }, []);

  if (!client) return <></>;

  return (
    <>
      <Layout></Layout>
    </>
  );
};

export default Page;
