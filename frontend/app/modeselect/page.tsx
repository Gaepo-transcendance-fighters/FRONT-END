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
import DirectionStack from "@/components/chat_window/Stack";

const ModeSelect = () => {
  const router = useRouter();
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
            id={"highest"}
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
              Select Option
            </Card>
          </CardContent>
          <CardContent id={"middle"}>
            <Card
              style={{
                width: "100%",
                height: "70vh",
                border: "2px solid black",
                alignItems: "center",
                backgroundColor: "#0477DE",
              }}
              id={"middle_big"}
            >
              {/*게임속도옵션*/}
              <Stack
                sx={{ display: "flex", gap: "10px", flexDirection: "column" }}
                style={{
                  backgroundColor: "#0477DE",
                  padding: "10px 0px 0px 0px",
                }}
                id={"speedoption"}
              >
                <Card
                  style={{
                    width: "20%",
                    height: "5vh",
                    border: "2px solid black",
                    margin: "auto",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  Speed
                </Card>
                <Card
                  style={{
                    width: "80%",
                    height: "20vh",
                    border: "2px solid black",
                    margin: "auto",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  속도옵션 들어갈 자리
                </Card>
              </Stack>

              {/*맵선택옵션부분*/}

              <Stack
                sx={{ display: "flex", gap: "10px", flexDirection: "column" }}
                style={{
                  backgroundColor: "#0477DE",
                  padding: "10px 0px 0px 0px",
                }}
                id={"mapoption"}
              >
                <Card
                  style={{
                    width: "20%",
                    height: "5vh",
                    border: "2px solid black",
                    margin: "auto",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  Map
                </Card>
                <Card
                  style={{
                    width: "80%",
                    height: "20vh",
                    border: "2px solid black",
                    margin: "auto",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  맵옵션 버튼 들어갈 자리
                </Card>
              </Stack>
              <Card
                style={{
                  width: "20%",
                  height: "10vh",
                  margin: "auto",
                  padding: "10px 0px 0px 0px",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  backgroundColor: "#0477DE",
                }}
              >
                <Button
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "5px solid RED",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    backgroundColor: "#F8C800",
                  }}
                  onClick={() => {
                    return router.push("./gameplaying");
                  }}
                >
                  Get Ready!
                </Button>
              </Card>
            </Card>
          </CardContent>
        </Stack>
      </Card>
    </ThemeProvider>
  );
};

export default ModeSelect;
