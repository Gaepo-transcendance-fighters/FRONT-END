"use client";

import Layout from "@/components/public/Layout";
import { useEffect } from "react";
import { io } from "socket.io-client";

const userId = localStorage.getItem("idx");
// export const socket = io("http://localhost:4000/chat");
export const socket = io("http://localhost:4000/chat", {
  query: { userId: userId },
});

const Page = () => {
  console.log(socket.id);
  return (
    <>
      <Layout></Layout>
    </>
  );
};

export default Page;
