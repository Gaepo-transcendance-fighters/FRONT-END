"use client";

import { useAuth } from "@/context/AuthContext";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { socket } from "../layout";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 350,
  bgcolor: "#3478c5",
  boxShadow: 24,
  p: 4,
};

const Login = () => {
  const { setIsLoggedIn } = useAuth();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    localStorage.setItem("loggedIn", "true");
    setIsLoggedIn(true);
    router.push("/");
  };

  useEffect(() => {
    if (isLoggedIn) {
      socket.emit("main_enter", "intra_id", (json) => {
        setFriendList(json.friend);
        setChannelList(json.channel);
        setBlockList(json.blockList);
      });
    }
  }, [isLoggedIn]);

  return (
    <Box sx={{ backgroundColor: "#6EC2F5", height: "100vh" }}>
      <Card sx={modalStyle}>
        <Stack
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CardContent>title</CardContent>
          {/* <Image src='' /> */}
          <Button
            variant="contained"
            size="large"
            sx={{ backgroundColor: "#48a0ed", width: "max-content" }}
            onClick={handleLogin}
          >
            <Typography sx={{ color: "white" }}>Login</Typography>
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default Login;
