"use client";

import Image from "next/image";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { main } from "@/font/color";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

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

const Login = () => {
  const router = useRouter();
  const { state, dispatch } = useAuth();
  const [url, setUrl] = useState("");

  const handleLogin = async () => {
    console.log(url);

    try {
      await axios("http://10.19.208.53:4000/auth/login", {
        method: "GET",
      }).then((res) => {
        if (res.status === 302) {
          const userData = res.data;
          console.log(userData);
          localStorage.setItem("loggedIn", "true");
          dispatch({ type: "LOGIN", value: true });
          return router.push("/");
        }
      });
    } catch (e) {
      console.log("[Error]", e);
    }
  };

  useEffect(() => {
    setUrl(process.env.NEXT_PUBLIC_REDIRECTURL!);
  }, []);

  return (
    <Box>
      <Card sx={modalStyle}>
        <Stack
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CardContent>
            <Image
              src="/CrazyPong.png"
              alt="logo for crazypong"
              width={300}
              height={200}
            />
          </CardContent>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: main.main3,
                width: "max-content",
              }}
              onClick={handleLogin}
            >
              <Typography sx={{ color: "white" }}>Login</Typography>
            </Button>
          </CardContent>
        </Stack>
      </Card>
    </Box>
  );
};

export default Login;
