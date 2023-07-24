"use client";
import { ThemeProvider } from "@emotion/react";
import { Check, CheckBox } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Stack,
  FormGroup,
  FormControlLabel,
  createTheme,
  Typography,
} from "@mui/material";

import React from "react";
import { useState } from "react";
const font = createTheme({
  typography: {
    fontFamily: "neodgm",
  },
});

import { useRouter } from "next/navigation";

type SpeedOption = "speed1" | "speed2" | "speed3";
type MapOption = "map1" | "map2" | "map3";

const OptionSelect = () => {
  const router = useRouter();

  const [selectedSpeedOption, setSelectedSpeedOption] =
    useState<SpeedOption | null>(null);

  const [selectedMapOption, setSelectedMapOption] = useState<MapOption | null>(
    null
  );

  console.log("Speed : " + selectedSpeedOption);
  console.log("Map : " + selectedMapOption);

  const handleSpeedOptionChange = (option: SpeedOption) => {
    setSelectedSpeedOption((prevOption) =>
      prevOption === option ? null : option
    );
  };

  const handleMapOptionChange = (option: MapOption) => {
    setSelectedMapOption((prevOption) =>
      prevOption === option ? null : option
    );
  };

  return (
    <ThemeProvider theme={font}>
      <Card sx={{ display: "flex" }}>
        <Stack
          sx={{
            width: "100%",
            height: "100vh",
            backgroundColor: "#0EBEFF",
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
                width: "12%",
                height: "3vh",
                border: "2px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                backgroundColor: "White",
              }}
              onClick={() => {
                router.push("./game");
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
                border: "2px solid black",
                alignItems: "center",
                backgroundColor: "#0477DE",
              }}
              id={"middle_big"}
            >
              {/*게임속도옵션*/}

              <Stack
                sx={{ display: "flex", gap: "10px", flexDirection: "column" }}
                style={{
                  backgroundColor: "#0477DE",
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
                      selectedSpeedOption && selectedSpeedOption !== "speed1"
                        ? true
                        : false
                    }
                    control={
                      <Checkbox
                        checked={selectedSpeedOption === "speed1"}
                        sx={{ "& .MuiSvgIcon-root": { fontSize: "3rem" } }}
                        onChange={() => handleSpeedOptionChange("speed1")}
                      />
                    }
                    label="Slow"
                  />
                  <FormControlLabel
                    disabled={
                      selectedSpeedOption && selectedSpeedOption !== "speed2"
                        ? true
                        : false
                    }
                    control={
                      <Checkbox
                        checked={selectedSpeedOption === "speed2"}
                        sx={{ "& .MuiSvgIcon-root": { fontSize: "3rem" } }}
                        onChange={() => handleSpeedOptionChange("speed2")}
                      />
                    }
                    label="Normal"
                  />
                  <FormControlLabel
                    disabled={
                      selectedSpeedOption && selectedSpeedOption !== "speed3"
                        ? true
                        : false
                    }
                    control={
                      <Checkbox
                        checked={selectedSpeedOption === "speed3"}
                        sx={{ "& .MuiSvgIcon-root": { fontSize: "3rem" } }}
                        onChange={() => handleSpeedOptionChange("speed3")}
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
                  backgroundColor: "#0477DE",
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
                      selectedMapOption && selectedMapOption !== "map1"
                        ? true
                        : false
                    }
                    control={
                      <Checkbox
                        checked={selectedMapOption === "map1"}
                        sx={{ "& .MuiSvgIcon-root": { fontSize: "3rem" } }}
                        onChange={() => handleMapOptionChange("map1")}
                      />
                    }
                    label="Map1"
                  />
                  <FormControlLabel
                    disabled={
                      selectedMapOption && selectedMapOption !== "map2"
                        ? true
                        : false
                    }
                    control={
                      <Checkbox
                        checked={selectedMapOption === "map2"}
                        sx={{ "& .MuiSvgIcon-root": { fontSize: "3rem" } }}
                        onChange={() => handleMapOptionChange("map2")}
                      />
                    }
                    label="Map2"
                  />
                  <FormControlLabel
                    disabled={
                      selectedMapOption && selectedMapOption !== "map3"
                        ? true
                        : false
                    }
                    control={
                      <Checkbox
                        checked={selectedMapOption === "map3"}
                        sx={{ "& .MuiSvgIcon-root": { fontSize: "3rem" } }}
                        onChange={() => handleMapOptionChange("map3")}
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
                  backgroundColor: "#0477DE",
                }}
              >
                <Button
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "5px solid RED",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    backgroundColor: "#F8C800",
                  }}
                  onClick={() => {
                    return router.push("./inwaiting");
                  }}
                >
                  Get Ready!
                </Button>
              </Card>
            </Card>
          </CardContent>
        </Stack>
      </Card>
    </ThemeProvider>
  );
};

export default OptionSelect;
