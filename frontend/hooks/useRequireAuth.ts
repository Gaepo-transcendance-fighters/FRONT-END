"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRequireAuth = (redirectUrl: string = "/login") => {
  const router = useRouter();

  useEffect(() => {
    console.log("🙋🏻 [useRequireAuth] You are in useRequireAuth");
    if (document.URL.includes("/login/auth")) return;
    if (
      !document.URL.includes("/mypage") &&
      !document.URL.includes("/login") &&
      !document.URL.includes("/optionselect") &&
      !document.URL.includes("/inwaiting") &&
      !document.URL.includes("/init") &&
      !document.URL.includes("/home") &&
      !document.URL.includes("/gameresult") &&
      !document.URL.includes("/gameplaying") &&
      !document.URL.includes("/game")
    ) {
      console.log("👉🏻 [useRequireAuth] return useRequireAuth");
      return;
    }
    console.log("👉🏻 [useRequireAuth] You are moved to /");
    return router.push("/");
  }, []);
};
