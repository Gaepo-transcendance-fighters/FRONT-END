"use client";
import Layout from "@/components/public/Layout";
import { ThemeProvider } from "@emotion/react";
import {
  Button,
  Card,
  Box,
  CardContent,
  Stack,
  createTheme,
} from "@mui/material";

const font = createTheme({
  typography: {
    fontFamily: "neodgm",
  },
});
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Game = () => {
  const router = useRouter();

  const ClickNomalGame = () => {
    router.push("./modeselect");
  };

  const ClickRankGame = () => {
    //임시로해놓겠습니다
    router.push("./gameresult");
  };

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
                fontSize: "2rem",
                border: "2px solid black",
              }}
            >
              Select Game Mode
            </Card>
          </CardContent>
          <CardContent>
            <Card
              style={{
                width: "100%",
                height: "65vh",
                border: "2px solid black",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: "#0477DE",
              }}
            >
              <Card
                style={{
                  width: "80%",
                  height: "80%",
                  border: "2px solid black",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Button
                  style={{
                    width: "40%",
                    height: "70%",
                    border: "2px solid black",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    fontSize: "2rem",
                    backgroundColor: "#0EBEFF",
                  }}
                  onClick={ClickNomalGame}
                >
                  일반 게임 플레이!
                </Button>
                <Button
                  style={{
                    width: "40%",
                    height: "70%",
                    border: "2px solid black",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    fontSize: "2rem",
                    backgroundColor: "#0EBEFF",
                  }}
                  onClick={ClickRankGame}
                >
                  랭크 게임 플레이!
                </Button>
              </Card>
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
                width: "30%",
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
              메인화면으로 돌아가기
            </Button>
          </CardContent>
        </Stack>
      </Card>
    </ThemeProvider>
  );
};
export default Game;
