"use client";

import Layout from "@/components/public/Layout";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { io } from "socket.io-client";

// dev original
// export const chatSocket = io("http://localhost:4000/chat", {
// haryu's server
export const chatSocket = io("http://paulryu9309.ddns.net:4000/chat", {
  query: { userId: 135489 },
});

const Page = () => {
  const param = useSearchParams();
  const router = useRouter();

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

  return (
    <>
      <Layout></Layout>
    </>
  );
};

export default Page;
