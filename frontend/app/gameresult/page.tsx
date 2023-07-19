"use client";
import Layout from "@/components/public/Layout";
import { ThemeProvider } from "@emotion/react";
import FriendProfile from "@/components/main/friend_list/FriendProfile";
import {
  Button,
  Card,
  CardContent,
  Stack,
  createTheme,
  Modal,
} from "@mui/material";

const font = createTheme({
  typography: {
    fontFamily: "neodgm",
  },
});
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const GameResult = () => {
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
            backgroundColor: "#0EBEFF",
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
                fontSize: "3rem",
                border: "2px solid black",
              }}
            >
              Result
            </Card>
          </CardContent>

          <CardContent>
            <Card
              sx={{ display: "flex", gap: "10%", flexDirection: "row" }}
              style={{
                width: "100%",
                height: "65vh",
                border: "2px solid black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0477DE",
              }}
            >
              <Card
                style={{
                  width: "35%",
                  height: "70%",
                  border: "2px solid black",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  fontSize: "2rem",
                  backgroundColor: "#49EC62",
                }}
              >
                <Stack
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    gap: "8vh",
                    flexDirection: "column",
                  }}
                >
                  <Card
                  //   닉네임 클릭시, 프로필 모달 띄우는 파트
                  //   onClick={}
                  >
                    MY NICK NAME
                  </Card>
                  <Card> 100</Card>
                  <Card
                    sx={{ minWidth: "max-content" }}
                    style={{
                      width: "80%",
                      height: "70%",
                      border: "2px solid black",
                      fontSize: "1.5rem",
                      backgroundColor: "White",
                    }}
                  >
                    <Stack
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      Win Rate: 70%
                    </Stack>
                    <Stack
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      100W 0L
                    </Stack>
                  </Card>
                </Stack>
              </Card>
              <Card
                style={{
                  width: "35%",
                  height: "70%",
                  border: "2px solid black",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  fontSize: "2rem",
                  backgroundColor: "#FF6364",
                }}
              >
                <Stack
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    gap: "8vh",
                    flexDirection: "column",
                  }}
                >
                  <Card
                  //   닉네임 클릭시, 프로필 모달 띄우는 파트
                  //   onClick={}
                  >
                    O_NICK NAME
                  </Card>
                  <Card> 70</Card>
                  <Card
                    sx={{ minWidth: "max-content" }}
                    style={{
                      width: "80%",
                      height: "70%",
                      border: "2px solid black",
                      fontSize: "1.5rem",
                      backgroundColor: "White",
                    }}
                  >
                    <Stack
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      Win Rate: 70%
                    </Stack>
                    <Stack
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      100W 0L
                    </Stack>
                  </Card>
                </Stack>
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
export default GameResult;
