"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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

  const { setIsLoggedIn } = useAuth();
  const router = useRouter();

  const postCode = async (code: string) => {
    await fetch("http://10.19.208.53:3000/auth", {
      method: "GET",
      // headers: {
      //   "Content-type": "application/json",
      // },
      // body: JSON.stringify({
      //   code: code,
      // }),
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("loggedIn", "true");
          setIsLoggedIn(true);
          return router.push("/");
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

  return (
    <Box>
      <Card sx={modalStyle}>
        <CircularProgress sx={{ color: "white" }} />
        <Typography sx={{ color: "white" }}>Loading...</Typography>
      </Card>
    </Box>
  );
};

export default Auth;
