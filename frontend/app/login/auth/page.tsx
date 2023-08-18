"use client";

import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { main } from "@/font/color";
import { useUser } from "@/context/UserContext";

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
const Auth = () => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const { userState, userDispatch } = useUser();

  interface Data {
    token: string;
    jwt: string;
    user: {
      userIdx: number;
      intra: string;
      imgUri: string;
      accessToken: string;
      email: string;
    };
  }
  const postCode = async (code: string) => {
    await fetch("http://localhost:4000/login/auth", {
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
          localStorage.setItem("loggedIn", "true");
          const data: Data = await res.json();
          console.log(data);
          localStorage.setItem("authorization", data.token); // 서버에서 받은 토큰을 저장
          localStorage.setItem("token", data.jwt);
          userDispatch({ type: "CHANGE_NICK_NAME", value: data.user.intra });
          return router.push(`/`);
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
    console.log(code);

    postCode(code);
  }, []);

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
