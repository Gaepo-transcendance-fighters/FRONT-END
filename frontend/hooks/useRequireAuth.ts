"use client";

import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRequireAuth = (redirectUrl: string = "/login") => {
  const router = useRouter();
  const { authState, authDispatch } = useAuth();
  const {userDispatch} = useUser()

  const getCookies = () => {
    const cookies = document.cookie;
    if (cookies === "") return "";
    const value = cookies.split("=")[1];
    return value;
  };

  useEffect(() => {
    if (document.URL.includes("/login/auth")) return;
    const cookies_value = getCookies();

    if (cookies_value) {
      const nickname = localStorage.getItem("nickname")
      const idx = localStorage.getItem("idx")
      const email = localStorage.getItem("email")
      const imgUri = localStorage.getItem("imgUri")
      const token = localStorage.getItem("token")
      const auth = localStorage.getItem("check2Auth")

      console.log(
        `
        localstorage:
          ${idx},
          ${nickname},
          ${email},
          ${imgUri},
          ${token},
          ${auth}
        `
      )
      if (
        !idx ||
        !nickname ||
        !email ||
        !imgUri ||
        !token 
      ) {
        console.log("im gone", nickname)
        return router.push(redirectUrl);
      }

        userDispatch({ type: "SET_USER_IDX", value: parseInt(idx) });
        userDispatch({ type: "CHANGE_NICK_NAME", value: nickname });
        userDispatch({ type: "CHANGE_IMG", value: imgUri });
        authDispatch({
          type: "SET_ID",
          value: parseInt(idx),
        });
        authDispatch({
          type: "SET_NICKNAME",
          value: nickname,
        });
        authDispatch({
          type: "SET_IMGURL",
          value: imgUri,
        });
        authDispatch({
          type: "SET_AUTHORIZATION",
          value: token,
        });
        authDispatch({
          type: "SET_CHECK2AUTH",
          value: Boolean(auth),
        });
        authDispatch({
          type: "SET_EMAIL",
          value: email,
        });
      return router.push("/home");
    } else if (cookies_value === "") router.push(redirectUrl);
  }, []);
};
