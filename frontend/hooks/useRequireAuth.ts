"use client";

import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

export const useRequireAuth = (redirectUrl: string = "/login") => {
  const router = useRouter();
  const { authState, authDispatch } = useAuth();
  const { userDispatch } = useUser();

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
      const nickname = secureLocalStorage.getItem("nickname") as string;
      const idx = secureLocalStorage.getItem("idx") as string;
      const email = secureLocalStorage.getItem("email") as string;
      const imgUri = secureLocalStorage.getItem("imgUri") as string;
      const token = secureLocalStorage.getItem("token") as string;
      const auth = secureLocalStorage.getItem("check2Auth") as string;

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
      );
      if (
        !idx ||
        !nickname ||
        !email ||
        !imgUri ||
        !token
        // !authState.userInfo.id ||
        // !authState.userInfo.nickname ||
        // !authState.userInfo.email ||
        // !authState.userInfo.authorization ||
        // !authState.userInfo.imgUrl
      ) {
        console.log("im gone", nickname);
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
