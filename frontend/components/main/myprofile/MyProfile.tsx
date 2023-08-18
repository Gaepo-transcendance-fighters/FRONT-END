"use client";

import { main } from "@/font/color";
import {
  Avatar,
  Button,
  Card,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
const font = createTheme({
  typography: {
    fontFamily: "neodgm",
  },
});

import { useUser } from "@/context/UserContext";
import tmp_friendprofile from "@/app/tmp_friend_profile/page";
{
  /* <Myprofile Img={소켓으로받아온 imguri링크} Nickname={소켓으로받아온 닉네임}/> */
  // const Myprofile = (props) => {
}
const Myprofile = () => {
  const router = useRouter();
  const searchparams = useSearchParams();
  const { userState } = useUser();

  const createQuery = useCallback(
    (nickname: string) => {
      const params = new URLSearchParams(searchparams.toString());
      params.set("name", nickname);

      return params.toString();
    },
    [searchparams]
  );

  const RedirMyprofile = () => {
    router.push("./mypage" + "?" + createQuery(userState.nickname));
  };

  return (
    <ThemeProvider theme={font}>
      <div style={{ padding: 10 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            src={userState.imgUri}
            style={{
              width: "70%",
              height: "22vh",
              border: "4px solid #8CCAE5",
            }}
          />
        </div>
        <div style={{ padding: 10 }}>
          <Card
            style={{
              height: "4vh",
              width: "50%",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
              margin: "0 auto",
              backgroundColor: main.main1,
              border: "1px solid black",
            }}
          >
            <Typography
              color={"#Black"}
              fontSize={"large"}
              align="center"
              sx={{
                verticalAlign: "middle",
              }}
            >
              {userState.nickname}
              {/* props.Nickname*/}
            </Typography>
          </Card>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="button"
            onClick={RedirMyprofile}
            style={{
              backgroundColor: "WHITE",
              height: "4vh",
              width: "25%",
              border: "1px solid black",
            }}
          >
            더보기
          </Button>
          <Button
            type="button"
            onClick={() => {
              router.push("./SecondAuth");
            }}
          >
            2차인증ui
          </Button>

          <Button
            type="button"
            onClick={() => {
              router.push("./tmp_friend_profile");
            }}
          >
            친구프로필페이지
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};
export default Myprofile;
