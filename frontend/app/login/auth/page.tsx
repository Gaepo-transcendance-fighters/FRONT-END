"use client";

import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { main } from "@/font/color";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";
import { socket } from "@/app/page";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 350,
  bgcolor: main.main4,
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};
interface Data {
  userIdx: number;
  nickname: string;
  intra: string;
  imgUri: string;
  token: string;
  email: string;
  check2Auth: boolean;
}

const Auth = () => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const [client, setClient] = useState(false);
  const { userDispatch } = useUser();
  const { authDispatch } = useAuth();

  const setupCookies = () => {
    let expire = new Date();

    expire.setTime(expire.getTime() + 30 * 60 * 1000);
    document.cookie = "login=1; path=/; expires=" + expire.toUTCString() + ";";
  };

  const postCode = async (code: string) => {
    // dev original
    await fetch("http://localhost:4000/login/auth", {
      // haryu's server
      // await fetch("http://paulryu9309.ddns.net:4000/login/auth", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("authorization"),
      },
      body: JSON.stringify({
        code: code,
      }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data: Data = await res.json();
          if (data.imgUri === "http://localhost:4000/img/0.png")
          // if (data.imgUri === "http://paulryu9309.ddns.net:4000/img/0.png")
            socket.emit("set_user_status", {
              userStatus: { nickname: data.nickname },
            });

          console.log(data);
          localStorage.setItem("authorization", data.token); // 서버에서 받은 토큰을 저장
          localStorage.setItem("intra", data.intra);
          localStorage.setItem("idx", data.userIdx.toString());
          localStorage.setItem("imgUri", data.imgUri);
          localStorage.setItem("email", data.email);
          localStorage.setItem("check2Auth", data.check2Auth.toString());
          authDispatch({ type: "SET_ID", value: data.userIdx });
          authDispatch({ type: "SET_NICKNAME", value: data.nickname });
          setupCookies();

          if (data.check2Auth === true) return router.push("./secondauth");
          else return router.push(`/home`);
        }
      })
      .catch((error) => {
        console.log(error);
        return alert(`[Error] ${error}`);
      });
  };

  useEffect(() => {
    const code = searchParam.get("code");
    if (!code) return;
    postCode(code);
  }, []);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return <></>;

  return (
    <Box>
      <Card sx={modalStyle}>
        <CircularProgress sx={{ color: "white" }} />
        <Typography sx={{ color: "white" }}>Loading...</Typography>
        <Typography sx={{ color: "white" }}>
          {searchParam.get("code")}
        </Typography>
      </Card>
    </Box>
  );
};

export default Auth;
