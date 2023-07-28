"use client";
import { ThemeProvider } from "@emotion/react";
import {
  Button,
  Box,
  Card,
  CardContent,
  Stack,
  createTheme,
  Modal,
  Typography,
} from "@mui/material";

import { main } from "@/components/public/Layout";
import { useRouter } from "next/navigation";
import { useState } from "react";
const font = createTheme({
  typography: {
    fontFamily: "neodgm",
  },
});

const infomodalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 600,
  bgcolor: "#65d9f9",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Game = () => {
  const router = useRouter();

  const ClickNomalGame = () => {
    // router.push("./optionselect");
    router.push("./inwaiting");
  };

  const ClickRankGame = () => {
    //임시로해놓겠습니다
    router.push("./gameresult");
  };

  const BackToMain = () => {
    router.push("/");
  };

  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
              <CardContent>
                <Button
                  style={{
                    width: "3vw",
                    height: "5vh",
                    backgroundColor: "#F2CB03",
                    border: "1px solid black",
                    fontSize: "2.5rem",
                    color: "white",
                  }}
                  onClick={handleOpenModal}
                >
                  ?
                </Button>
                <Modal open={openModal} onClose={handleCloseModal}>
                  <Box sx={infomodalStyle} borderRadius={"10px"}>
                    <Card
                      style={{
                        width: "100%",
                        height: "10%",
                        backgroundColor: main.main4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* 상단 안내메세지 */}
                      How to?
                    </Card>

                    <Card
                      style={{
                        width: "100%",
                        height: "85%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        padding: "10px 0px 0px 0px",
                        backgroundColor: "white",
                      }}
                    >
                      <CardContent
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          padding: "10px 0px 0px 0px",
                        }}
                      >
                        {/* 일반게임 */}
                        <Card
                          style={{
                            width: "30%",
                            height: "15%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: main.main3,
                          }}
                        >
                          일반게임 안내
                        </Card>
                        {/* 일반설명 */}
                        <Card
                          style={{
                            width: "80%",
                            height: "90%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid black",
                          }}
                        >
                          설명이들어가야하는데뭘적어야할지모르겠어요
                        </Card>
                      </CardContent>

                      <CardContent
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          padding: "10px 0px 0px 0px",
                        }}
                      >
                        {/* 랭크게임 */}
                        <Card
                          style={{
                            width: "25%",
                            height: "15%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: main.main3,
                          }}
                        >
                          랭크게임 안내
                        </Card>
                        {/* 랭크설명 */}
                        <Card
                          style={{
                            width: "80%",
                            height: "70%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid black",
                          }}
                        >
                          설명이들어가야하는데뭘적어야할지모르겠어요
                        </Card>
                      </CardContent>

                      <CardContent
                        style={{
                          width: "100%",
                          height: "40%",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                          padding: "10px 0px 0px 0px",
                        }}
                      >
                        <Button
                          style={{
                            width: "20%",
                            height: "50%",
                            border: "2px solid black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "1.5rem",
                            backgroundColor: main.main1,
                          }}
                          onClick={handleCloseModal}
                        >
                          확인
                        </Button>
                      </CardContent>
                    </Card>
                  </Box>
                </Modal>
              </CardContent>
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
                backgroundColor: main.main3,
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
                    width: "35%",
                    height: "70%",
                    border: "2px solid black",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    fontSize: "2rem",
                    backgroundColor: main.main1,
                  }}
                  onClick={ClickNomalGame}
                >
                  일반 게임 플레이!
                </Button>

                <Button
                  style={{
                    width: "35%",
                    height: "70%",
                    border: "2px solid black",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    fontSize: "2rem",
                    backgroundColor: main.main1,
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
