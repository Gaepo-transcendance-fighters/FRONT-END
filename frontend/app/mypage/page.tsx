"use client";

import { ThemeProvider } from "@emotion/react";
import {
  Avatar,
  Button,
  Card,
  Box,
  CardContent,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { IOnlineStatus, font, main } from "@/type/type";
import React, { useEffect, useState, ChangeEvent } from "react";
import MyGameLog from "@/components/main/myprofile/MyGameLog";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import SecondAuth from "@/components/main/myprofile/SecondAuth";
import { IUserData, myProfileStyle, nicknameModalStyle } from "@/type/My";

const server_domain = process.env.NEXT_PUBLIC_SERVER_URL_4000;

export default function PageRedir() {
  const router = useRouter();
  const { userState, userDispatch } = useUser();
  const { authState } = useAuth();
  const [isSet, setIsSet] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>({
    available: false,
    check2Auth: false,
    createdAt: "",
    nickname: "",
    imgUri: "",
    win: 0,
    lose: 0,
    email: "",
    intra: "",
    isOnline: IOnlineStatus.ONLINE,
    rankpoint: 0,
    updatedAt: "",
    userIdx: 0,
  });

  const [openModal, setOpenModal] = useState<boolean>(false);
  //로컬에 check2Auth는 스트링형태. 받아올때도 스트링이니까 넘버로 바꿨다가 전송해줄때 string으로 변경.
  const [verified, setVerified] = useState(false);
  const [inputName, setInputName] = useState<string>("");

  const OpenFileInput = () => {
    document.getElementById("file_input")?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const files = event.target.files;
    if (files) {
      uploadImage(files[0]);
    }
  };

  const uploadImage = async (file: File) => {
    // readAsDataURL을 사용해 이미지를 base64로 변환
    const dataUrl: string = await readFileAsDataURL(file);

    if (dataUrl === "") return;

    const formData = new FormData();
    formData.append("userIdx", authState.userInfo.id.toString() || "");
    formData.append("userNickname", "");
    formData.append("imgData", dataUrl);

    await axios({
      method: "post",
      url: `${server_domain}/users/profile`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + authState.userInfo.authorization,
      },
      data: formData,
    })
      .then((res) => {
        setUserData(res.data.result);
        userDispatch({ type: "CHANGE_IMG", value: res.data.result.imgUri });
      })
      .catch((error) => {
        console.error("업로드 실패", error);
      });
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    console.log("file", file.size);
    if (file.size > 2000000) {
      // 임의의 값. 아직 파일 사이즈 미정.
      //TODO : 사이즈 정하기
      alert("더 작은 사이즈의 파일을 선택해주세요.");
      return new Promise(() => "");
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          resolve(e.target.result);
        } else {
          reject(new Error("FileReader error"));
        }
      };

      reader.onerror = (e) => {
        reject(new Error("FileReader error"));
      };

      reader.readAsDataURL(file);
    });
  };

  const onChangeNickName = async () => {
    if (inputName === "") return alert("입력값이 없습니다");
    if (inputName === userData?.nickname) {
      return alert("현재 닉네임과 동일합니다!");
    }

    const formData = new FormData();
    formData.append("userIdx", authState.userInfo.id.toString() || "");
    formData.append("userNickname", inputName);
    formData.append("imgData", authState.userInfo.imgUrl);

    try {
      const response = await axios({
        method: "POST",
        url: `${server_domain}/users/profile`,
        headers: {
          "Content-Type": "Application/json",
          Authorization: "Bearer " + authState.userInfo.authorization,
        },
        data: formData,
      });
      if (response.status === 400) alert("이미 존재하는 닉네임입니다");
      else if (response.status === 200) {
        if (!authState.chatSocket) return;
        userDispatch({
          type: "CHANGE_NICK_NAME",
          value: response.data.result.nickname,
        });
        authState.chatSocket.emit("set_user_status", {
          userStatus: { nickname: response.data.nickname },
        });
        handleCloseModal();
      }
    } catch (error) {
      console.log("닉네임 변경중 문제가 발생");
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOnInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^A-Za-z\s]/gi, "");
  };

  const BackToHome = () => {
    router.push("/home");
  };

  const RankImgSelect = (data: IUserData) => {
    if (data.rankpoint < 800) return "./rank/exp_medal_bronze.png";
    else if (data.rankpoint >= 800 && data.rankpoint < 1100)
      return "./rank/exp_medal_silver.png";
    else if (data.rankpoint >= 1100) return "./rank/exp_medal_gold.png";
  };

  const RankSrc = RankImgSelect(userData);

  return (
    <>
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
            {/* 중앙에 위치한 스택에 올리는 메인 카드 */}
            <Card sx={myProfileStyle}>
              <Stack
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Stack
                  style={{
                    width: "50%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",

                    backgroundColor: main.main8,
                  }}
                >
                  <Card
                    sx={{
                      backgroundColor: main.main7,
                      flexDirection: "row",
                      display: "flex",
                      padding: 3,
                    }}
                    style={{ border: "1px solid black" }}
                  >
                    {/* 아바타박스 */}
                    <Box
                      sx={{
                        borderRadius: "70%",
                        width: "30%",
                        height: "100%",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                      mx={5}
                    >
                      <Avatar
                        src={userState.imgUri}
                        style={{
                          width: "100%",
                          height: "75%",
                          border: "4px solid #8CCAE5",
                        }}
                      />
                    </Box>
                    {/* 이미지, 닉네임, 2차인증, */}
                    <Stack
                      sx={{
                        width: "20vw",
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
                        {userState.nickname}
                      </Typography>
                      <CardContent style={{ width: "100%" }}>
                        2차인증 여부 : {userData.check2Auth ? "Y" : "N"}
                      </CardContent>
                      <CardContent style={{ width: "100%" }}>
                        <Typography style={{ fontSize: "1.2rem" }}>
                          Email : {authState.userInfo.email}
                        </Typography>
                      </CardContent>
                      {/* 버튼관련 스택 */}
                      <Stack
                        direction={"row"}
                        spacing={2}
                        padding={"20px 0px 0px 2px"}
                      >
                        <form>
                          <Button
                            onClick={OpenFileInput}
                            style={{
                              minWidth: "max-content",
                            }}
                            variant="contained"
                          >
                            사진변경
                          </Button>
                          <input
                            type="file"
                            id="file_input"
                            name="Change_IMG"
                            style={{ display: "none" }}
                            accept="image/png, image/jpg, image/jpeg"
                            onChange={handleChange}
                          />
                        </form>
                        <Modal open={openModal} onClose={handleCloseModal}>
                          <Box sx={nicknameModalStyle} borderRadius={"10px"}>
                            <Card
                              sx={{
                                backgroundColor: main.main4,
                                height: "170px",
                                margin: -1,
                              }}
                            ></Card>
                          </Box>
                        </Modal>
                        <SecondAuth />
                      </Stack>
                    </Stack>
                  </Card>
                  <br />
                  <Card
                    sx={{ backgroundColor: main.main7 }}
                    style={{ width: "100%", border: "1px solid black" }}
                  >
                    <CardContent sx={{ paddingBottom: 0 }}>전적</CardContent>
                    <Stack direction={"row"}>
                      {/* 이미지 */}
                      <Card
                        sx={{
                          margin: 1,
                          marginRight: 0,
                          width: "30%",
                        }}
                      >
                        <CardContent
                          sx={{
                            backgroundColor: main.main3,
                            height: "100%",
                            "&:last-child": { paddingBottom: "16px" },
                          }}
                        >
                          <img
                            src={RankSrc}
                            style={{
                              width: "70%",
                              height: "70%",
                              display: "block",
                              margin: "0 auto",
                            }}
                          ></img>
                        </CardContent>
                      </Card>
                      {/* !이미지 */}
                      <Card
                        sx={{
                          margin: 1,
                          width: "70%",
                          height: "60%",
                        }}
                      >
                        <CardContent
                          sx={{
                            backgroundColor: main.main3,
                            height: "100%",
                            "&:last-child": { paddingBottom: "16px" },
                          }}
                        >
                          <Typography margin={1}>
                            랭크(포인트) : {userData?.rankpoint}
                          </Typography>
                          <Typography margin={1}>
                            승률 :{" "}
                            {userData.win + userData.lose === 0
                              ? 0
                              : Math.floor(
                                  (userData.win /
                                    (userData.win + userData.lose)) *
                                    100
                                )}
                            %
                          </Typography>
                        </CardContent>
                      </Card>
                    </Stack>
                  </Card>
                  <br />
                </Stack>
                {/* 전적기록파트 */}
                <Stack
                  style={{
                    width: "45%",
                    height: "100%",
                    backgroundColor: main.main7,
                    border: "1px solid black",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <br />
                  <Card
                    sx={{
                      backgroundColor: main.main3,
                      height: "95%",
                      width: "95%",
                      overflowY: "scroll",
                    }}
                    id="logs"
                  >
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Card
                        sx={{ paddingBottom: 0 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "60%",
                          height: "30%",
                          backgroundColor: main.main7,
                          border: "2px solid black",
                        }}
                      >
                        <Typography style={{ fontSize: "2rem" }}>
                          전적 기록
                        </Typography>
                      </Card>
                    </Box>
                    <br />
                    <Box
                      sx={{
                        listStyleType: "none",
                        overflowY: "scroll",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      {/* <MyGameLog /> */}
                    </Box>
                  </Card>
                </Stack>
              </Stack>
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
          ></Stack>
        </Card>
      </ThemeProvider>
    </>
  );
}
