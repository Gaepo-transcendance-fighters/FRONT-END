"use client";
import { ThemeProvider } from "@emotion/react";
import {
  Button,
  Card,
  CardContent,
  Stack,
  createTheme,
  Typography,
} from "@mui/material";

const font = createTheme({
  typography: {
    fontFamily: "neodgm",
  },
});
import { useRouter } from "next/navigation";
import { main } from "@/components/public/Layout";
const inwaiting = () => {
  const router = useRouter();

  const BackToMain = () => {
    router.push("/");
  };

  return (
    <ThemeProvider theme={font}>
      <Card sx={{ display: "flex" }}>
        <Stack
          sx={{
            width: "100%",
            height: "100vh",
            backgroundColor: main.main1,
            padding: 0,
            margin: 0,
          }}
        >
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card
              style={{
                width: "40%",
                height: "10vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid black",
              }}
            >
              <Typography sx={{ fontSize: "2rem" }}>
                Select Game Mode
              </Typography>
            </Card>
          </CardContent>
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card
              style={{
                width: "60%",
                height: "65vh",
                border: "2px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: main.main3,
              }}
            >
              <Typography sx={{ fontSize: "3rem" }}>
                상대방을 기다리고있습니다...
              </Typography>
            </Card>
          </CardContent>

          <CardContent
            style={{
              width: "100%",
              height: "30vh",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              style={{
                width: "20%",
                height: "50%",
                border: "2px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                backgroundColor: "White",
              }}
              onClick={BackToMain}
            >
              취소하고 메인으로가기
            </Button>
            <Button
              onClick={() => {
                router.push("./gameplaying");
              }}
            >
              게임화면으로
            </Button>
          </CardContent>
        </Stack>
      </Card>
    </ThemeProvider>
  );
};
export default inwaiting;
