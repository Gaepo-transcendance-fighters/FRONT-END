"use client";

import Layout from "@/components/public/Layout";
import { useEffect } from "react";
import { io } from "socket.io-client";

const userId =
  typeof window === "undefined" ? null : localStorage.getItem("userIdx");
// const userId = 3;
// dev original
export const socket = io("http://localhost:4000/chat", {
  // haryu's server
  // export const socket = io("http://paulryu9309.ddns.net:4000/chat", {
  query: { userId: userId },
});

const Page = () => {
  return (
    <>
      <Layout></Layout>
    </>
  );
};

export default Page;
