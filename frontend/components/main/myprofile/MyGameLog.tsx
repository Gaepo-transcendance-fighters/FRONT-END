"use client";

import { Typography, Box, CardContent } from "@mui/material";

import { Card } from "@mui/material";

import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";

import { main } from "@/type/type";

import { useUser } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";
const server_domain = process.env.NEXT_PUBLIC_SERVER_URL_4000;

const TOTAL_PAGES = 100;

const options = {
  threshold: 0.1,
};

interface ChatMessage {
  channelIdx: number;
  sender: string;
  msg: string;
}

enum type {
  nomal,
  rank,
}
enum result {
  win,
  lose,
}

interface GameRecord {
  matchUserIdx: number;
  matchUserNickname: string;
  score: string;
  type: type;
  result: RecordResult;
}

export enum RecordResult {
  DEFAULT = 0,
  PLAYING,
  WIN,
  LOSE,
  DONE,
  SHUTDOWN,
}

interface GameLog {
  userInfo: { win: number; lose: number };
  gameList: {
    GameRecord: GameRecord;
  }; // 나의 게임 레코드 전부 보내주시면 됩니다 - 전부인가요?
}

const MyGameLog = () => {
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(0);

  const [gameRecordData, setGameRecordData] = useState<GameLog[]>([]);
  // const [gameRecord, setGameRecordData] = useState<GameRecord[]>(MockGamelog);

  const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);
  const { userState } = useUser();
  const { authState } = useAuth();
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setPageNum((num) => num + 1);
      }
    }, options);

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  //haryu's server
  // .get(`http://paulryu9309.ddns.net:4000/game/records/userIdx=${localStorage.getItem("idx")}&page=${pageNum}`,
  const [allUsers, setAllUsers] = useState([]);

  const callUser = useCallback(async () => {
    // console.log(`${server_domain}/records/userIdx=${authState.userInfo.id}`);
    await axios
      .get(
        `${server_domain}/game/records/?userIdx=${authState.userInfo.id}&page=${pageNum}`,
        // .get(`${server_domain}/game/records/userIdx=${localStorage.getItem("idx")}&page=${pageNum}`,
        {
          headers: {
            Authorization: "Bearer " + authState.userInfo.authorization,
          },
        }
      )
      .then((res) => {
        const newData = Array.isArray(res.data) ? res.data : [res.data];
        setGameRecordData((prevRecord) => [...prevRecord, ...newData]);
        setLoading(false);
      });
  }, [pageNum]);

  useEffect(() => {
    if (pageNum <= TOTAL_PAGES) {
      setTimeout(() => {
        callUser();
      }, 500);
      setLoading(true);
      console.log(allUsers);
    }
  }, [pageNum]);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          overflowY: "scroll",
          overflowAnchor: "none",
          position: "sticky",
          width: "100%",
          height: "70%",
        }}
      >
        {gameRecordData.map((gameRecordData, i) => {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "10px 0 0 0",
                color: "black",
                width: "80%",
                height: "70%",
                // backgroundColor: "#48a0ed",
                border: "1px solid black",
                backgroundColor: main.main1,
                borderRadius: "5px",
              }}
            >
              {/* 내부에 작은 박스 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0px 0 0 0",
                  color: "black",
                  width: "90%",
                  height: "80%",
                  // backgroundColor: "#48a0ed",
                  backgroundColor: main.main0,
                  borderRadius: "5px",
                }}
              >
                {/* 내부에서 공간을 나눠야함 */}
                {/* 왼쪽박스 */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "30%",
                    height: "80%",

                    // backgroundColor: "#48a0ed",
                    backgroundColor: main.main0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      width: "80%",
                      height: "40%",
                      // backgroundColor: "#48a0ed",
                      backgroundColor: main.main0,
                    }}
                  >
                    <Typography sx={{ fontSize: "1.1rem" }}>
                      {gameRecordData.gameList.GameRecord.type === 0 ? (
                        <>Normal</>
                      ) : (
                        <>Rank</>
                      )}
                      {/* {gameRecord.type === 0 ? <>Normal</> : <>Rank</>} */}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      width: "80%",
                      height: "40%",

                      // backgroundColor: "#48a0ed",
                      backgroundColor: main.main0,
                    }}
                  >
                    <Typography sx={{ fontSize: "1.1rem" }}>
                      {gameRecordData.gameList.GameRecord.result === 0 ? (
                        <>Win</>
                      ) : (
                        <>Lose</>
                      )}
                      {/* {gameRecord.result === 0 ? <>Win</> : <>Lose</>} */}
                    </Typography>
                  </div>
                </div>
                {/* 오른쪽박스 */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "80%",
                    height: "80%",

                    // backgroundColor: "#48a0ed",
                    backgroundColor: main.main0,
                  }}
                >
                  <Typography sx={{ fontSize: "1.5rem" }}>
                    {/* {allUsers.} */}
                    {/* 내닉네임 | 점수 : 점수 | 상대닉네임 */}
                    {userState.nickname}{" "}
                    {gameRecordData.gameList.GameRecord.score}{" "}
                    {gameRecordData.gameList.GameRecord.matchUserNickname}
                  </Typography>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={observerTarget}></div>
        {loading === true && (
          <Typography component={"div"}>loading...</Typography>
        )}
      </div>
    </>
  );
};

export default MyGameLog;
