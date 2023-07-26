"use client";
import { ThemeProvider } from "@emotion/react";
import { Button, Card, CardContent, Stack, createTheme } from "@mui/material";

const font = createTheme({
  typography: {
    fontFamily: "neodgm",
  },
});

import { useRouter } from "next/navigation";
import RedirMyProfile from "@/components/main/myprofile/RedirMyProfile";
import { main } from "@/components/public/Layout";
export default function PageRedir() {
  const router = useRouter();

  const BackToHome = () => {
    router.push("/");
  };
  return (
    <ThemeProvider theme={font}>
      <Card sx={{ display: "flex" }}>
        <Stack
          sx={{
            width: "20vw",
            height: "100vh",
            backgroundColor: main.main3,
            padding: 0,
            margin: 0,
          }}
        >
          <Button
            variant="outlined"
            style={{ backgroundColor: "white", margin: "30px 0px 0px 30px" }}
            onClick={BackToHome}
          >
            홈으로 돌아가기
          </Button>
        </Stack>

        <Stack
          sx={{
            width: "60vw",
            height: "100vh",
            backgroundColor: main.main3,
            padding: 0,
            margin: 0,
          }}
        >
          <CardContent sx={{ height: "50vh", backgroundColor: main.main3 }}>
            <RedirMyProfile />
          </CardContent>
        </Stack>

        <Stack
          sx={{
            width: "20vw",
            height: "100vh",
            backgroundColor: main.main3,
            padding: 0,
            margin: 0,
          }}
        ></Stack>
      </Card>
    </ThemeProvider>
  );
}
