"use client";

import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

export const useRequireAuth = (redirectUrl: string = "/login") => {
  const router = useRouter();
  // const { authState, authDispatch } = useAuth();
  // const { userDispatch } = useUser();

  const getCookies = () => {
    const cookies = document.cookie;
    if (cookies === "") return "";
    const value = cookies.split("=")[1];
    return value;
  };

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
    
    // const cookies_value = getCookies();

    // if (cookies_value) {
      // const nickname = secureLocalStorage.getItem("nickname") as string;
      // const idx = secureLocalStorage.getItem("idx") as string;
      // const email = secureLocalStorage.getItem("email") as string;
      // const imgUri = secureLocalStorage.getItem("imgUri") as string;
      // const token = secureLocalStorage.getItem("token") as string;
      // const auth = secureLocalStorage.getItem("check2Auth") as string;

      // if (!idx || !nickname || !email || !imgUri || !token) {
      //   console.log("im gone", nickname);
      //   return router.push(redirectUrl);
      // }
      // userDispatch({ type: "SET_USER_IDX", value: parseInt(idx) });
      // userDispatch({ type: "CHANGE_NICK_NAME", value: nickname });
      // userDispatch({ type: "CHANGE_IMG", value: imgUri });
      // authDispatch({
      //   type: "SET_ID",
      //   value: parseInt(idx),
      // });
      // authDispatch({
      //   type: "SET_NICKNAME",
      //   value: nickname,
      // });
      // authDispatch({
      //   type: "SET_IMGURL",
      //   value: imgUri,
      // });
      // authDispatch({
      //   type: "SET_AUTHORIZATION",
      //   value: token,
      // });
      // authDispatch({
      //   type: "SET_CHECK2AUTH",
      //   value: Boolean(auth),
      // });
      // authDispatch({
      //   type: "SET_EMAIL",
      //   value: email,
      // });
    //   console.log("👉🏻 [useRequireAuth] You are moved to /");
    //   return router.push("/");
    // } else if (cookies_value === "") router.push(redirectUrl);
  }, []);
};
