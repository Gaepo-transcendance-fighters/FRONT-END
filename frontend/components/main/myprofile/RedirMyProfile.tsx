import {
  Avatar,
  Button,
  Card,
  Box,
  CardContent,
  Modal,
  Stack,
  Typography,
  Input,
  Switch,
} from "@mui/material";

import { useState } from "react";
import { main } from "@/components/public/Layout";
import React from "react";
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
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 700,
  bgcolor: "#65d9f9",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const RedirMyProfile = () => {
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
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
    <Box borderRadius={"10px"} sx={myProfileStyle}>
      <Card
        sx={{
          backgroundColor: "#48a0ed",
          display: "flex",
          padding: 3,
        }}
      >
        <Box
          sx={{
            borderRadius: "70%",
            width: "250px",
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
            style={{ fontSize: "30px" }}
          >
            MyNickName
          </Typography>

          <CardContent style={{ width: "100%" }}>
            <Typography>2차인증 여부 : Y/N</Typography>
          </CardContent>
          <CardContent style={{ width: "100%" }}>
            <Typography>Email : studentof42@42seoul.kr</Typography>
          </CardContent>
          <Stack direction={"row"} spacing={2} padding={"20px 0px 0px 2px"}>
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
                  <CardContent sx={{ paddingBottom: 0, textAlign: "center" }}>
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
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
              color="secondary"
            />
          </Stack>
        </Stack>
      </Card>
      <br />
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
                <CardContent sx={{ "&:last-child": { paddingBottom: "16px" } }}>
                  WIN
                </CardContent>
                <CardContent sx={{ "&:last-child": { paddingBottom: "16px" } }}>
                  hoslim VS jujeon
                </CardContent>
                <CardContent sx={{ "&:last-child": { paddingBottom: "16px" } }}>
                  5 : 3
                </CardContent>
              </Stack>
            </Card>
          </Card>
        </Stack>
      </Card>
    </Box>
  );
};

export default RedirMyProfile;