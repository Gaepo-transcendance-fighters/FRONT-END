"use client";

import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Stack,
  FormControlLabel,
  Typography,
} from "@mui/material";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { main } from "@/type/type";
import { useGame } from "@/context/GameContext";
import { useAuth } from "@/context/AuthContext";
import { gameSocket } from "../page";
import axios from "axios";

enum SpeedOption {
  speed1,
  speed2,
  speed3,
}

enum MapOption {
  map1,
  map2,
  map3,
}

enum GameType {
  FRIEND,
  NORMAL,
  RANK,
}

interface IGameOption {
  gameType: GameType; // FRIED, NORMAL, RANK
  userIdx: number;
  speed: SpeedOption; //NORMAL, FAST, FASTER
  mapNumber: MapOption; // A, B, C
}

// export const gameSocket = io("http://localhost:4000/game", {
// const userId =
//   typeof window !== "undefined" ? localStorage.getItem("idx") : null;

// export const gameSocket = io("http://localhost:4000/game", {
//   query: { userId: userId },
// });

const OptionSelect = () => {
  const router = useRouter();
  const { gameState, gameDispatch } = useGame();
  const { authState, authDispatch } = useAuth();
  const [client, setClient] = useState(false);

  const [selectedSpeedOption, setSelectedSpeedOption] = useState<SpeedOption>(
    SpeedOption.speed2
  );

  const [selectedMapOption, setSelectedMapOption] = useState<MapOption>(
    MapOption.map2
  );
  const [countdown, setCountdown] = useState<number>(3);

  const handleSpeedOptionChange = (option: SpeedOption) => {
    setSelectedSpeedOption((prevOption) =>
      prevOption === option ? prevOption : option
    );
  };

  const handleMapOptionChange = (option: MapOption) => {
    setSelectedMapOption((prevOption) =>
      prevOption === option ? prevOption : option
    );
  };

  useEffect(() => {
    countdown > 0 && setTimeout(() => setCountdown(countdown - 1), 1000);
    // 나중에 이거 풀면됨
    if (countdown == 0) cntRedir();
  }, [countdown]);

  const cntRedir = async () => {
    if (!gameSocket) return;
    gameDispatch({ type: "SET_BALL_SPEED_OPTION", value: selectedSpeedOption });
    gameDispatch({ type: "SET_MAP_TYPE", value: selectedMapOption });

    await axios({
      method: "post",
      url: "http://paulryu9309.ddns.net:4000/game",
      data: {
        gameType: gameState.gameMode,
        userIdx: authState.id,
        speed: selectedSpeedOption,
        mapNumber: selectedMapOption,
      },
    }).then((res) => {
      if (res.data.code === 200) {
        gameSocket.connect();
        router.replace("/game");
      } else {
        console.log("게임방 생성 실패");
        router.replace("/?from=game");
      }
    });
  };

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return <></>;

  return (
    <Card sx={{ display: "flex" }}>
      <Stack
        sx={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url("/background.png")`,
          padding: 0,
          margin: 0,
        }}
      >
        <CardContent
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          <Button
            style={{
              width: "max-content",
              height: "3vh",
              border: "2px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              backgroundColor: "White",
            }}
            onClick={() => {
              router.replace("/?from=game");
            }}
          >
            이전화면으로 돌아가기
          </Button>
        </CardContent>

        <CardContent
          id={"highest"}
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
              fontSize: "2rem",
              border: "2px solid black",
              backgroundColor: main.main3,
            }}
          >
            <Typography sx={{ fontSize: "2rem" }}>Select Option</Typography>
          </Card>
        </CardContent>
        <CardContent id={"middle"}>
          <Card
            style={{
              width: "100%",
              height: "70vh",
              boxShadow: "none",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0)",
            }}
            id={"middle_big"}
          >
            {/*게임속도옵션*/}

            <Stack
              sx={{ display: "flex", gap: "10px", flexDirection: "column" }}
              style={{
                padding: "10px 0px 0px 0px",
              }}
              id={"speedoption"}
            >
              <Card
                style={{
                  width: "20%",
                  height: "5vh",
                  border: "2px solid black",
                  margin: "auto",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  backgroundColor: main.main2,
                }}
              >
                <Typography sx={{ fontSize: "1.5rem" }}>Speed</Typography>
              </Card>
              <Card
                style={{
                  width: "80%",
                  height: "20vh",
                  border: "2px solid black",
                  margin: "auto",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                {/* 속도체크박스 */}
                <FormControlLabel
                  disabled={
                    selectedSpeedOption === SpeedOption.speed1
                      ? true
                      : false || countdown == 0
                      ? true
                      : false
                  }
                  control={
                    <Checkbox
                      checked={selectedSpeedOption === SpeedOption.speed1}
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: "3rem" },
                        "&.Mui-checked": { color: main.main3 },
                      }}
                      onChange={() =>
                        handleSpeedOptionChange(SpeedOption.speed1)
                      }
                    />
                  }
                  label="Slow"
                />
                <FormControlLabel
                  disabled={
                    selectedSpeedOption === SpeedOption.speed2
                      ? true
                      : false || countdown == 0
                      ? true
                      : false
                  }
                  control={
                    <Checkbox
                      checked={selectedSpeedOption === SpeedOption.speed2}
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: "3rem" },
                        "&.Mui-checked": { color: main.main3 },
                      }}
                      onChange={() =>
                        handleSpeedOptionChange(SpeedOption.speed2)
                      }
                    />
                  }
                  label="Normal"
                />
                <FormControlLabel
                  disabled={
                    selectedSpeedOption === SpeedOption.speed3
                      ? true
                      : false || countdown == 0
                      ? true
                      : false
                  }
                  control={
                    <Checkbox
                      checked={selectedSpeedOption === SpeedOption.speed3}
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: "3rem" },
                        "&.Mui-checked": { color: main.main3 },
                      }}
                      onChange={() =>
                        handleSpeedOptionChange(SpeedOption.speed3)
                      }
                    />
                  }
                  label="Fast"
                />
              </Card>
            </Stack>

            {/*맵선택옵션부분*/}

            <Stack
              sx={{ display: "flex", gap: "10px", flexDirection: "column" }}
              style={{
                padding: "10px 0px 0px 0px",
              }}
              id={"mapoption"}
            >
              <Card
                style={{
                  width: "20%",
                  height: "5vh",
                  border: "2px solid black",
                  margin: "auto",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  backgroundColor: main.main2,
                }}
              >
                <Typography sx={{ fontSize: "1.5rem" }}>Map</Typography>
              </Card>
              <Card
                style={{
                  width: "80%",
                  height: "20vh",
                  border: "2px solid black",
                  margin: "auto",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                {/* 맵옵션 버튼 들어갈 자리 */}
                <FormControlLabel
                  disabled={
                    selectedMapOption === MapOption.map1
                      ? true
                      : false || countdown == 0
                      ? true
                      : false
                  }
                  control={
                    <Checkbox
                      checked={selectedMapOption === MapOption.map1}
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: "3rem" },
                        "&.Mui-checked": { color: main.main3 },
                      }}
                      onChange={() => handleMapOptionChange(MapOption.map1)}
                    />
                  }
                  label="Map1"
                />
                <FormControlLabel
                  disabled={
                    selectedMapOption === MapOption.map2
                      ? true
                      : false || countdown == 0
                      ? true
                      : false
                  }
                  control={
                    <Checkbox
                      checked={selectedMapOption === MapOption.map2}
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: "3rem" },
                        "&.Mui-checked": { color: main.main3 },
                      }}
                      onChange={() => handleMapOptionChange(MapOption.map2)}
                    />
                  }
                  label="Map2"
                />
                <FormControlLabel
                  disabled={
                    selectedMapOption === MapOption.map3
                      ? true
                      : false || countdown == 0
                      ? true
                      : false
                  }
                  control={
                    <Checkbox
                      checked={selectedMapOption === MapOption.map3}
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: "3rem" },
                        "&.Mui-checked": { color: main.main3 },
                      }}
                      onChange={() => handleMapOptionChange(MapOption.map3)}
                    />
                  }
                  label="Map3"
                />
              </Card>
            </Stack>
            <Card
              style={{
                width: "20%",
                height: "10vh",
                margin: "auto",
                padding: "10px 0px 0px 0px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: main.main1,
              }}
            >
              {countdown === 0 ? (
                <>
                  <Card
                    style={{
                      width: "100%",
                      height: "90%",
                      border: "5px solid black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      backgroundColor: main.main0,
                    }}
                  >
                    <Typography sx={{ fontSize: "2rem" }}>Let's Go!</Typography>
                  </Card>
                </>
              ) : (
                <>
                  <Card
                    style={{
                      width: "100%",
                      height: "90%",
                      border: "5px solid RED",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                      backgroundColor: "#F8C800",
                    }}
                  >
                    <Typography sx={{ fontSize: "2rem" }}>
                      {countdown}
                    </Typography>
                  </Card>
                </>
              )}
            </Card>
          </Card>
        </CardContent>
      </Stack>
    </Card>
  );
};

export default OptionSelect;
