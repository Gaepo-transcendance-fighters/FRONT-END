"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRequireAuth = (redirectUrl: string = "/login") => {
  const router = useRouter();

  const getCookies = () => {
    const cookies = document.cookie;
    if (cookies === "") return "";
    const value = cookies.split("=")[1];
    return value;
  };

  useEffect(() => {
    if (document.URL.includes("/login/auth")) return;
    const cookies_value = getCookies();
    console.log(document.URL);

    if (cookies_value) {
      if (
        !localStorage.getItem("intra") ||
        !localStorage.getItem("idx") ||
        !localStorage.getItem("authorization")
      )
        return router.push(redirectUrl);
      return router.push("/");
    } else if (cookies_value === "") router.push(redirectUrl);
  }, []);
};
