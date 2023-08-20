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
  width: "75vw",
  height: "80%",
  bgcolor: "#65d9f9",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IUserData {
  nickname: string;
  imgUrl: string;
  Win: number;
  Lose: number;
  rank: number;
  email: string;
}

import { useRouter, useSearchParams } from "next/navigation";

import { main } from "@/type/type";
import React, { useEffect, useState, ChangeEvent } from "react";
import MyGameLog from "@/components/main/myprofile/MyGameLog";
import { useUser } from "@/context/UserContext";
import axios from "axios";

export default function PageRedir() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const nickname = searchParams.toString();

  const { userState } = useUser();
  const [checked, setChecked] = useState(true);
  const [userData, setUserData] = useState<IUserData>({
    nickname: "",
    imgUrl: "",
    Win: 0,
    Lose: 0,
    rank: 0,
    email: "",
  });
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [verified, setVerified] = useState<boolean>(false);
  const [inputName, setInputName] = useState<string>("");

  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    // const getData = () => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("authorization"),
    };
    axios
      .get("http://localhost:4000/users/profile", { headers })
      .then((response) => {
        setUserData(response.data);
      });
    // };
    console.log("API REQUEST");
  }, [reload]);

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
    try {
      await axios({
        method: "PUT",
        url: `http://localhost:4000/users/profile/${userData?.nickname}`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("authorization"),
        },
        data: JSON.stringify({
          imgUri: dataUrl,
        }),
      });
      console.log("업로드 완료");
    } catch (error) {
      console.error("업로드 실패", error);
    }
    setReload((curr) => !curr);
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
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

  //body가 아니라 data로 보내야한다고함..?data에 객체를 직접 전달해도 axios가 JSON형태로 변환함.
  const onChangeNickName = async () => {
    if (inputName === "") return alert("입력값이 없습니다");
    if (inputName === userData?.nickname) {
      return alert("현재 닉네임과 동일합니다!");
    }

    try {
      const response = await axios({
        method: "PATCH",
        url: `http://localhost:4000/users/profile/${userData?.nickname}`,

        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("authorization"),
        },
        data: JSON.stringify({
          changedNickname: inputName,
        }),
      });
      if (response.status === 400) alert("이미 존재하는 닉네임입니다");
      else if (response.status === 200) {
        console.log("Sucess");
        handleCloseModal();
      }
    } catch (error) {
      console.log("닉네임 변경중 문제가 발생");
    }
    setReload((curr) => !curr);
  };

  const onChangeSecondAuth = async () => {
    if (verified == true) setVerified(false);
    else setVerified(true);

    try {
      const response = await axios({
        method: "PATCH",
        url: "http://localhost:4000/users/profile/:my_nickname",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          // userNickName: userData?.nickname,
          check2Auth: verified,
        }),
      });
    } catch (error) {
      console.log("2차인증 시 에러발생");
    }
  };

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

  const handleOnInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^A-Za-z\s]/gi, "");
  };

  const BackToHome = () => {
    router.push("/");
  };

  const RankImgSelect = (data: IUserData) => {
    if (data.rank < 800) return "./rank/exp_medal_bronze.png";
    else if (data.rank >= 800 && data.rank < 1100)
      return "./rank/exp_medal_silver.png";
    else if (data.rank >= 1100) return "./rank/exp_medal_gold.png";
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

          {/* 중앙에 위치한 파트 */}
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
                      // backgroundColor: "RED",
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
                        // src="https://image.fmkorea.com/files/attach/new3/20230426/2895716/2869792504/5712239214/67b5b96fceb24c036e6f7368386974d5.png"
                        src={userData?.imgUrl}
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
                        {userData?.nickname}
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
                          Email : {userData?.email}
                        </Typography>
                      </CardContent>
                      {/* 버튼관련 스택 */}
                      <Stack
                        direction={"row"}
                        spacing={2}
                        padding={"20px 0px 0px 2px"}
                      >
                        <form>
                          <label htmlFor="profile-upload" />

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
                            // onChange={onChangeImg}
                            onChange={handleChange}
                          />
                        </form>
                        {/* <form>
                          <input
                            type="file"
                            id="profile-upload"
                            accept="image/png, image/jpg, image/jpeg"
                            style={{ display: "none" }}
                          />
                        </form> */}
                        {/* 123 */}
                        <Button
                          type="submit"
                          style={{
                            minWidth: "max-content",
                          }}
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
                                  <input
                                    type="text"
                                    maxLength={10}
                                    style={{
                                      width: "40%",
                                      height: "32px",
                                      fontSize: "15px",
                                      border: 0,
                                      borderRadius: "15px",
                                      outline: "none",
                                      paddingLeft: "10px",
                                      backgroundColor: "#E9E9E9",
                                    }}
                                    onInput={handleOnInput}
                                    onChange={(event) => {
                                      setInputName(event?.target.value);

                                      console.log(inputName);
                                    }}
                                  />
                                  <Button
                                    style={{
                                      border: "0.1px solid black",
                                      backgroundColor: "lightGray",
                                    }}
                                    onClick={onChangeNickName}
                                  >
                                    입력
                                  </Button>
                                </Card>
                              </Stack>
                            </Card>
                          </Box>
                        </Modal>
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
                            <>2차인증 활성화</>
                          )}
                        </Button>
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
                          // height: "90%",
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
                            랭크(포인트) : {userData.rank}
                          </Typography>
                          <Typography margin={1}>
                            승률 :{" "}
                            {Math.floor(
                              (userData.Win / (userData.Win + userData.Lose)) *
                                100
                            )}
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
                      // backgroundColor: "RED",
                      // backgroundColor: "#3478c5",
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
                      <MyGameLog />
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
