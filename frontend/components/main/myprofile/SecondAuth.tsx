"use client";

import {
  Button,
  Card,
  createTheme,
  Box,
  CardContent,
  Modal,
} from "@mui/material";
import { useRouter } from "next/navigation";

const server_domain = process.env.NEXT_PUBLIC_SERVER_URL_4000;

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

import { main } from "@/type/type";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function SecondAuth() {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [verified, setVerified] = useState<boolean>(false);
  const router = useRouter();

  const { authState, authDispatch } = useAuth();

  useEffect(() => {
    const verified = authState.userInfo.check2Auth;
    // if (verified === "" || verified === null) return;

    // setVerified(verified);
  }, []);

  //값을 서버에서 받아오므로, useRef는 받아온 값으로 변경되어야할것.
  //useState로 초기값 설정해주고, 바뀐값을 전달만해줌?

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const onChangeSecondAuth = async () => {
    let newVerifiedValue = false;
    // if (verified) {
    //   newVerifiedValue = false;
    // } else if (verified === false) {
    //   newVerifiedValue = true;
    // }
    newVerifiedValue = !verified;
    const response = await axios({
      method: "patch",
      // url: "http://localhost:4000/users/profile/second",
      url: `${server_domain}/users/profile/second`,
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + authState.userInfo.authorization,
      },
      data: {
        userIdx: Number(authState.userInfo.id),
        check2Auth: newVerifiedValue,
      }, // 불리언 값을 JSON 문자열로 변환하여 전달
    }).then((res) => {
      if (res.status === 200) {
        setVerified(newVerifiedValue);
        authDispatch({
          type: "SET_CHECK2AUTH",
          value: newVerifiedValue,
        });

        // localStorage.setItem("check2Auth", newVerifiedValue ? "true" : "false");
        if (!newVerifiedValue) return router.push("/home");
        location.reload();
        //       if (response.status == 200) {
        //   if (response.data.check2Auth == true) {
        //     console.log("success in check 2 auth");
        //     return router.push("/");
        //   } else if (response.data.check2Auth === false) {
        //     console.log("success in check 2 auth");
        //   }
      }
    });
  };

  return (
    <Button
      type="button"
      style={{
        minWidth: "max-content",
      }}
      variant="contained"
      onClick={handleOpenModal}
    >
      2차인증
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
              <br />
              (버튼 클릭 시 메인화면으로 돌아갑니다)
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
                disabled={verified}
                onClick={onChangeSecondAuth}
              >
                활성화
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
                disabled={verified}
                onClick={onChangeSecondAuth}
              >
                비활성화
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </Button>
  );
}
