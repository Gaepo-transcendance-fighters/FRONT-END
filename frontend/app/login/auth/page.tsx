"use client";

import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { main } from "@/font/color";

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
          const data = await res.json();
          localStorage.setItem("authorization", data.token);
          localStorage.setItem("loggedIn", "true");
          return router.push(`/login/auth?token=${data.token}`);
        }
      })
      .catch((error) => {
        console.log(error);
        return alert(`[Error] ${error}`);
      });
  };

  const logout = async () => {
    await fetch("http://localhost:4000/logout", {
      method: "POST",
    }).then((res) => {
      if (res.status === 200) {
        localStorage.setItem("loggedIn", "false");
        return router.push("/login");
      }
    });
  };

  useEffect(() => {
    //임시 작업 용
    localStorage.setItem("loggedIn", "true");
    router.push(`/`);

    const code = searchParam.get("code");
    if (!code) return;
    console.log(code);

    postCode(code);
  }, []);

  return (
    <Box>
      <button onClick={logout}>로그아웃</button>
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
