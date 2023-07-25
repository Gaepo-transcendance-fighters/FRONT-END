"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRequireAuth = (redirectUrl: string = "/login") => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const localData = localStorage.getItem("loggedIn");
    if (localData === "true") return router.push("/");

    if (!isLoggedIn) router.push(redirectUrl);
  }, []);
};