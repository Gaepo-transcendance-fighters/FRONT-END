import {
  Avatar,
  Button,
  Card,
  Box,
  CardContent,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Typography,
  Input,
} from "@mui/material";

import { positions } from "@mui/system";
import Image from "next/image";
import { useState } from "react";
import ModalBasic from "../../main/myprofile/ModalBasic";
import ChangeNickName from "./ChangeNickName";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyProfileRoute from "@/components/MyProfileRoute/MyProfileRoute";

import Router from "next/router";
import { useRouter } from "next/navigation";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  bgcolor: "#65d9f9",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Myprofile = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [nicknameModal, setNicknameModal] = useState<boolean>(false);

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
  const OpenFileInput = () => {
    document.getElementById("file_input")?.click();
  };

  const HandleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filelist = event.target.files;
    console.log(filelist);
  };

  const OpenChangeNN = () => {
    <ChangeNickName />;
  };

  const router = useRouter();

  //서버랑 연결이 되어야있어야함...!
  //페이지를 넥스트에 연결을 해줘야함.

  const RedirMyprofile = () => {
    router.push("frontend/components/MyProfileRoute/MyProfileRoute.HTML");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Avatar
          alt="Remy Sharp"
          src="https://image.fmkorea.com/files/attach/new3/20230426/2895716/2869792504/5712239214/67b5b96fceb24c036e6f7368386974d5.png"
          sx={{ width: 130, height: 130 }}
        />
      </div>
      <div style={{ padding: 10 }}>
        <Card
          style={{
            height: 60,
            width: 150,
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
            margin: "0 auto",
            backgroundColor: "#67dbfb",
          }}
        >
          NickName
        </Card>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="button"
          onClick={handleOpenModal}
          // onClick={RedirMyprofile}
          style={{ backgroundColor: "WHITE" }}
        >
          더보기
        </Button>
      </div>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle} borderRadius={"10px"}>
          <Card
            sx={{
              backgroundColor: "#48a0ed",
              width: "100wv",
              display: "flex",
              padding: 2,
            }}
          >
            <Box
              sx={{
                borderRadius: "70%",
                width: "max-content",
                overflow: "hidden",
              }}
              mx={5}
            >
              <Image
                src="https://image.fmkorea.com/files/attach/new3/20230426/2895716/2869792504/5712239214/67b5b96fceb24c036e6f7368386974d5.png"
                alt="user img"
                width={100}
                height={100}
              />
            </Box>
            <Stack
              sx={{
                width: "15vw",
              }}
              spacing={1}
            >
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                닉네임: 내닉네임
              </Typography>
              <Typography>2차인증 여부 : Y/N</Typography>
              <Stack direction={"row"} spacing={0} padding={"0px 0px 0px 2px"}>
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
                  onClick={OpenChangeNN}
                >
                  닉네임변경
                </Button>

                <Button
                  type="button"
                  sx={{ minWidth: "max-content" }}
                  variant="contained"
                >
                  2차인증하기
                </Button>
              </Stack>
            </Stack>
          </Card>
          <br />

          {/* 
          랭크, 전적기록 파트 
          */}

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
        </Box>
      </Modal>
    </div>
  );
};
export default Myprofile;
