"use client";

import Layout from "@/components/public/Layout";
import { io } from "socket.io-client";

const userId = 98029;
export const socket = io("http://localhost:4000/chat", {
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
