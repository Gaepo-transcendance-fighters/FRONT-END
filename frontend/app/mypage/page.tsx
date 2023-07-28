"use client";
import { ThemeProvider } from "@emotion/react";

import {
  Avatar,
  Button,
  Card,
  createTheme,
  Box,
  CardContent,
  Modal,
  Stack,
  Typography,
  Input,
  Switch,
} from "@mui/material";

const font = createTheme({
  typography: {
    fontFamily: "neodgm",
  },
});

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 150,
  bgcolor: "#65d9f9",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const myProfileStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  height: "80%",
  bgcolor: "#65d9f9",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

import { useRouter } from "next/navigation";

import { main } from "@/components/public/Layout";
import { useState } from "react";

export default function PageRedir() {
  const router = useRouter();

  const BackToHome = () => {
    router.push("/");
  };

  const [checked, setChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (verified == true) setVerified(false);
    else setVerified(true);
  };

  const OpenFileInput = () => {
    document.getElementById("file_input")?.click();
  };

  const HandleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filelist = event.target.files;
    console.log(filelist);
  };

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [verified, setVerified] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={font}>
      <Card sx={{ display: "flex" }}>
        <Stack
          sx={{
            width: "10%",
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
            width: "80%",
            height: "100vh",
            backgroundColor: main.main3,
            padding: 0,
            margin: 0,
          }}
        >
          {/* <RedirMyProfile /> */}
          <Card sx={myProfileStyle}>
            <Card
              sx={{
                backgroundColor: "#48a0ed",
                display: "flex",
                padding: 3,
              }}
            >
              {/* 아바타박스 */}
              <Box
                sx={{
                  borderRadius: "70%",
                  width: "250px",
                  // minWidth: "max-content",
                  height: "250px",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
                mx={5}
              >
                <Avatar
                  src="https://image.fmkorea.com/files/attach/new3/20230426/2895716/2869792504/5712239214/67b5b96fceb24c036e6f7368386974d5.png"
                  style={{
                    width: "90%",
                    height: "90%",
                    border: "4px solid #8CCAE5",
                  }}
                />
              </Box>
              <Stack
                sx={{
                  width: "15vw",
                }}
                spacing={0.5}
              >
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  style={{ fontSize: "3rem" }}
                >
                  MyNickName
                </Typography>

                <CardContent style={{ width: "100%" }}>
                  {verified == true ? (
                    <Typography style={{ fontSize: "1.5rem" }}>
                      2차인증 여부 : Y
                    </Typography>
                  ) : (
                    <Typography style={{ fontSize: "1.5rem" }}>
                      2차인증 여부 : N
                    </Typography>
                  )}
                </CardContent>
                <CardContent style={{ width: "100%" }}>
                  <Typography style={{ fontSize: "1.2rem" }}>
                    Email : studentof42@42seoul.kr
                  </Typography>
                </CardContent>
                <Stack
                  direction={"row"}
                  spacing={2}
                  padding={"20px 0px 0px 2px"}
                >
                  <Button
                    classes={"photo_button"}
                    onClick={OpenFileInput}
                    type="button"
                    sx={{ minWidth: "max-content" }}
                    variant="contained"
                  >
                    사진변경
                  </Button>
                  <input
                    type="file"
                    id="file_input"
                    style={{ display: "none" }}
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={HandleFileUpload}
                  />

                  <Button
                    type="button"
                    sx={{ minWidth: "max-content" }}
                    variant="contained"
                    onClick={handleOpenModal}
                  >
                    닉네임변경
                  </Button>

                  <Modal open={openModal} onClose={handleCloseModal}>
                    <Box sx={modalStyle} borderRadius={"10px"}>
                      <Card
                        sx={{
                          backgroundColor: main.main4,
                          height: "170px",
                          margin: -1,
                        }}
                      >
                        <CardContent
                          sx={{ paddingBottom: 0, textAlign: "center" }}
                        >
                          변경할 닉네임을 입력하세요
                        </CardContent>
                        <Stack direction={"row"}>
                          <Card
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                            sx={{
                              margin: 1,
                              width: "100%",
                              height: "120px",
                              backgroundColor: main.main1,
                              overflow: "scroll",
                            }}
                          >
                            <Input type="text" sx={{ width: "40%" }}></Input>
                            <Button
                              style={{
                                border: "0.1px solid black",
                                backgroundColor: "lightGray",
                              }}
                            >
                              입력
                            </Button>
                          </Card>
                        </Stack>
                      </Card>
                    </Box>
                  </Modal>

                  <Card
                    style={{
                      minWidth: "max-content",
                      backgroundColor: "#1776D2",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Typography color="white">2차인증 On/Off</Typography>
                  </Card>
                  <Switch
                    checked={verified ? true : false}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                    color="secondary"
                  />
                </Stack>
              </Stack>
            </Card>
            <br />
            {/* 전적 */}
            <Card sx={{ backgroundColor: "#3478c5" }}>
              <CardContent sx={{ paddingBottom: 0 }}>전적</CardContent>
              <Stack direction={"row"}>
                <Card
                  sx={{
                    margin: 1,
                    marginRight: 0,
                    width: "30%",
                    height: "max-content",
                  }}
                >
                  <CardContent
                    sx={{
                      backgroundColor: "#48a0ed",
                      height: "100%",
                      "&:last-child": { paddingBottom: "16px" },
                    }}
                  >
                    <Typography margin={1}>랭크(포인트)</Typography>
                    <Typography margin={1}>승률</Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    margin: 1,
                    width: "70%",
                    height: "max-content",
                  }}
                >
                  <CardContent
                    sx={{
                      backgroundColor: "#48a0ed",
                      height: "100%",
                      "&:last-child": { paddingBottom: "16px" },
                    }}
                  >
                    <Typography margin={1}>3000</Typography>
                    <Typography margin={1}>0%</Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Card>
            <br />
            {/* 전적기록 */}
            <Card
              sx={{
                backgroundColor: "#3478c5",
                height: "170px",
              }}
            >
              <CardContent sx={{ paddingBottom: 0 }}>전적 기록</CardContent>
              <Stack direction={"row"}>
                <Card
                  sx={{
                    margin: 1,
                    width: "100%",
                    height: "120px",
                    backgroundColor: "#48a0ed",
                    overflow: "scroll",
                  }}
                >
                  <Card
                    sx={{
                      backgroundColor: "#86d8f7",
                      margin: 1,
                    }}
                  >
                    <Stack direction={"row"}>
                      <CardContent
                        sx={{ "&:last-child": { paddingBottom: "16px" } }}
                      >
                        WIN
                      </CardContent>
                      <CardContent
                        sx={{ "&:last-child": { paddingBottom: "16px" } }}
                      >
                        hoslim VS jujeon
                      </CardContent>
                      <CardContent
                        sx={{ "&:last-child": { paddingBottom: "16px" } }}
                      >
                        5 : 3
                      </CardContent>
                    </Stack>
                  </Card>
                </Card>
              </Stack>
            </Card>
          </Card>
        </Stack>

        <Stack
          sx={{
            width: "10%",
            height: "100vh",
            backgroundColor: main.main3,
            padding: 0,
            margin: 0,
          }}
        >
          asdasd
        </Stack>
      </Card>
    </ThemeProvider>
  );
}
