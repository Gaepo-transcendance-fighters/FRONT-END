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
  intra: string; //<-nickname 받기 전 임시
  imgUrl: string;
  Win: number;
  Lose: number;
  rank: number;
  email: string;
}

import { useRouter, useSearchParams } from "next/navigation";

import { main } from "@/components/public/Layout";
import { useEffect, useState } from "react";
import { get } from "https";
import MyGameLog from "@/components/main/myprofile/MyGameLog";
import { useUser } from "@/context/UserContext";
import axios from "axios";

export default function PageRedir() {
  // async function SendImg(uri: string) {
  //   const request = await fetch("/user/profile/:my_nickname", {
  //     method: "POST",
  //     body: JSON.stringify(uri),
  //     headers: {
  //       "Content-Type": "img-uri",
  //     },
  //   });
  // }

  // async function SendNewName(newname: string) {
  //   const request = await fetch("/user/profile/:my_nickname", {
  //     method: "POST",
  //     body: JSON.stringify(newname),
  //     headers: {
  //       "Content-Type": "new-name",
  //     },
  //   });
  // }

  const { userState } = useUser();

  const router = useRouter();

  const BackToHome = () => {
    router.push("/");
  };

  const searchParams = useSearchParams();
  const nickname = searchParams.toString();
  const [checked, setChecked] = useState(true);
  const [userData, setUserData] = useState<IUserData>();
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  //   if (verified == true) setVerified(false);
  //   else setVerified(true);
  // };

  useEffect(() => {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("authorization"),
    };
    axios
      .get("http://localhost:4000/users/profile", { headers })
      .then((response) => {
        setUserData(response.data);
        // console.log(response.data);
      });
  }, []);
  // console.log(userData);
  console.log(userData);

  const OpenFileInput = () => {
    document.getElementById("file_input")?.click();
  };

  // const HandleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const filelist = event.target.files;
  //   console.log(filelist);

  //   document
  //     .getElementById("uploadForm")
  //     .addEventListener("submit", function (e) {
  //       e.preventDefault();
  //     });
  // };

  const onChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const uploadFile = e.target.files[0];
      const formData = new FormData();

      formData.append("files", uploadFile);

      await axios({
        method: "post",
        url: "http://localhost:4000/user/profile/:my_nickname",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(uploadFile);
    }
  };

  const onChangeNickName = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ChangeNickName", inputName);

    console.log("@@ " + inputName);
    await axios({
      method: "post",
      url: "http://localhost:4000/user/profile/:my_nickname",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [verified, setVerified] = useState<boolean>(false);
  const [inputName, setInputName] = useState<string>("");

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
  // console.log("@@" + userState.nickname);

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
                            onChange={onChangeImg}
                            // onChange={HandleFileUpload}
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
                                  <Input
                                    type="text"
                                    sx={{ width: "40%" }}
                                    onChange={(event) => {
                                      setInputName(event?.target.value);
                                      console.log(inputName);
                                    }}
                                  ></Input>
                                  {/* 에러...내일고칠게여.. */}
                                  <Button
                                    type="submit"
                                    onClick={onChangeNickName}
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
                        <Button
                          type="button"
                          style={{
                            minWidth: "max-content",
                          }}
                          variant="contained"
                          onClick={() => {
                            if (verified == true) setVerified(false);
                            else setVerified(true);
                          }}
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
                            src="./rank/exp_medal_bronze.png"
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
                            랭크(포인트) : {userData?.rank}
                          </Typography>
                          <Typography margin={1}>
                            승률 : 승/패에따라 계산해서 올려야함 0813기준{" "}
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
