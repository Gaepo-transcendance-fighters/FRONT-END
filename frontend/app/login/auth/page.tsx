"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const [value, setValue] = useState("");

  const { setIsLoggedIn } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    // const res = await()
    if (!value) return alert("Please enter your nickname");
    localStorage.setItem("loggedIn", "true");
    setIsLoggedIn(true);
    router.push("/");
  };

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
            <Typography sx={{ color: "white" }} fontSize={"larger"}>
              Enter your nickname!
            </Typography>
          </CardContent>
          <TextField
            placeholder="nickname"
            sx={{ backgroundColor: "white" }}
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
          />

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
              sx={{ backgroundColor: main.main3, width: "max-content" }}
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

export default Auth;
