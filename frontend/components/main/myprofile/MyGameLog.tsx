"use client";

import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
import { main } from "@/type/type";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/context/AuthContext";
import { IGameRecord, gameLogOptions } from "@/type/GameType";

const server_domain = process.env.NEXT_PUBLIC_SERVER_URL_4000;

const TOTAL_PAGES = 100;

const MyGameLog = () => {
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(0);
  const [gameRecord, setGameRecord] = useState<IGameRecord[]>([]);
  const { userState } = useUser();
  const { authState } = useAuth();
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setPageNum((num) => num + 1);
      }
    }, gameLogOptions);

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  const callUser = useCallback(async () => {
    await axios
      .get(
        `${server_domain}/game/records?userIdx=${authState.userInfo.id}&page=${pageNum}`,
        {
          headers: {
            Authorization: "Bearer " + authState.userInfo.authorization,
          },
        }
      )
      .then((res) => {
        const newData = Array.isArray(res.data) ? res.data : [res.data];
        setGameRecord((prevRecord) => [...prevRecord, ...newData]);
        setLoading(false);
      });
  }, [pageNum]);

  useEffect(() => {
    if (pageNum <= TOTAL_PAGES) {
      setTimeout(() => {
        callUser();
      }, 500);
      setLoading(true);
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
          height: "15vh",
        }}
      >
        {gameRecord.map((gameRecord, i) => {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0px 0 0 0",
                color: "black",
                width: "90%",
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
                    <Typography sx={{ fontSize: "0.8rem" }}>
                      친선/랭크
                      {gameRecord.type === 0 ? <>Rank</> : <>Normal</>}
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
                    <Typography sx={{ fontSize: "0.8rem" }}>
                      {gameRecord.result === 0 ? <>Rank</> : <>Normal</>}
                    </Typography>
                  </div>
                </div>
                {/* 오른쪽박스 */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "70%",
                    height: "80%",

                    // backgroundColor: "#48a0ed",
                    backgroundColor: main.main0,
                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>
                    내닉네임 | 점수 : 점수 | 상대닉네임
                    {userState.nickname} {gameRecord.score}{" "}
                    {gameRecord.matchUserNickname}
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
