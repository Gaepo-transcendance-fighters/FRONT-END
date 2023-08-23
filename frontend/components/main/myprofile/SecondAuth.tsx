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
  width: 350,
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
  width: "75vw",
  height: "80%",
  bgcolor: "#65d9f9",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

import { useRouter, useSearchParams } from "next/navigation";
import { main } from "@/type/type";
import React, { useEffect, useState, ChangeEvent } from "react";
import MyGameLog from "@/components/main/myprofile/MyGameLog";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { CssOutlined, ViewAgenda } from "@mui/icons-material";

export default function SecondAuth() {
  const [verified, setVerified] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const onChangeSecondAuth = async () => {
    if (verified == false) setVerified(true);
    else if (verified == true) setVerified(false);
    setOpenModal(true);

    // try {
    //   const response = await axios({
    //     method: "PATCH",
    //     url: "http://localhost:4000/users/profile/:my_nickname",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     data: JSON.stringify({
    //       // userNickName: userData?.nickname,
    //       check2Auth: verified,
    //     }),
    //   });
    // } catch (error) {
    //   console.log("2차인증 시 에러발생");
    // }
    handleCloseModal;
  };

  {
    console.log(verified);
  }
  return (
    <Button
      type="button"
      style={{
        minWidth: "max-content",
      }}
      variant="contained"
      onClick={onChangeSecondAuth}
    >
      {verified == true ? (
        <>2차인증 비활성화</>
      ) : (
        <>
          2차인증 활성화
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx={modalStyle} borderRadius={"10px"}>
              <Card
                style={{
                  width: "100%",
                  height: "20%",
                  backgroundColor: main.main4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* 상단 안내메세지 */}
                <CardContent
                  style={{
                    width: "100%",
                    height: "20%",
                    backgroundColor: main.main4,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  2차인증 확인
                </CardContent>
              </Card>
              <Card
                style={{
                  width: "100%",
                  height: "90%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <CardContent
                  style={{
                    width: "100%",
                    height: "20%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  2차인증을 활성화 시, 다음 로그인부터 적용됩니다.
                </CardContent>
                <CardContent
                  style={{
                    width: "60%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                  sx={{ display: "flex", gap: "20%", flexDirection: "row" }}
                >
                  <Button
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#49EC62",
                      border: "1px solid black",
                    }}
                    onClick={onChangeSecondAuth}
                  >
                    확인
                  </Button>
                  <Button
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#FF6364",
                      border: "1px solid black",
                    }}
                    onClick={handleCloseModal}
                  >
                    거절
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Modal>
        </>
      )}
    </Button>
  );
}
