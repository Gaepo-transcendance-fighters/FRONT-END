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

const modalStyle = {
  // position: "absolute" as "absolute",
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

  const handleLogin = () => {
    router.push("/login/auth");
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
