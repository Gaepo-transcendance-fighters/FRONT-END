"use client";

import { Box, Typography } from "@mui/material";
import { useRoom } from "@/context/RoomContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { IChat } from "../ChatWindow";
import axios from "axios";
import { useInitMsg } from "@/context/InitMsgContext";

interface Props {
  msgs: IChat[];
  setMsgs: Dispatch<SetStateAction<IChat[]>>;
}

const DmChat = ({ msgs, setMsgs }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { roomState } = useRoom();
  const observerTarget = useRef(null);
  const [lastDate, setLastDate] = useState<string>();
  const { initMsgState } = useInitMsg();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoading(true);
          callHistory();
        }
      },
      { threshold: 0.3 }
    );

    if (observerTarget.current) observer.observe(observerTarget.current);

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, loading]);

  const callHistory = useCallback(async () => {
    console.log("callHistory start lastDate", lastDate);
    if (!lastDate) {
      setLoading(false);
      return;
    }
    await axios
      .get(
        `http://localhost:4000/chat/messages?channelIdx=${roomState.currentRoom?.channelIdx}&msgDate=${lastDate}`
      )
      .then((res) => {
        const newData = Array.isArray(res.data) ? res.data : [res.data];
        setMsgs((prevMsgs) => [...prevMsgs, ...newData]);
        setLoading(false);
        const lastIdx = msgs.length - 1;
        const lastElement = msgs[lastIdx];
        setLastDate((prev) => lastElement.msgDate);
      });
  }, [lastDate, loading, msgs]);

  // 첫 메세지 20개 불러오는 로직
  useEffect(() => {
    if (!initMsgState.dmEnterEntry) return;
    const list: IChat[] = initMsgState.dmEnterEntry?.message.map(
      (data: any) => {
        const payload: IChat = {
          channelIdx: initMsgState.dmEnterEntry?.channelIdx,
          senderIdx:
            data.sender === roomState.currentDmRoomMemberList?.userIdx1
              ? roomState.currentDmRoomMemberList?.userIdx1
              : roomState.currentDmRoomMemberList?.userIdx2,
          sender: data.sender,
          msg: data.msg,
          msgDate: data.msgDate,
        };
        return payload;
      }
    );
    if (roomState.currentRoom?.channelIdx) setMsgs([]);
    setMsgs((prevState) => {
      return [...prevState, ...list];
    });
  }, [initMsgState]);

  // 이전 대화기록을 불러오거나, 새로 채팅을 송수신하게되면 그때마다 불러와진 대화기록 중 제일 오래된 메세지의 Date를 가져온다.
  useEffect(() => {
    console.log("!!!");
    if (msgs.length > 0) {
      const lastIdx = msgs.length - 1;
      console.log("lastidx", lastIdx);
      const lastElement = msgs[lastIdx];
      console.log("lastIdxMsg", lastElement);
      setLastDate(() => lastElement.msgDate);
      // console.log("메세지 갱신됐어, 라스트 데이트도 업뎃함");
      // console.log(Date.now(), lastDate);
    }
  }, [msgs, lastDate]);

  useEffect(() => {
    console.log(msgs);
  }, [msgs]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column-reverse",
        overflowY: "scroll",
        overflowAnchor: "none",
        position: "sticky",
        backgroundColor: "#3272D2",
        height: "40vh",
        borderRadius: "5px",
        listStyleType: "none",
        margin: "0% 2% 1% 2%",
      }}
    >
      {msgs.map((value, i) => {
        return (
          <ul
            key={i}
            style={{ margin: "1% 0% 1% 0%", padding: "2% 2% 0.5% 2%" }}
          >
            <div
              style={{
                listStyleType: "none",
                margin: "0px 0 0 0",
                color: "white",
                padding: 0,
              }}
            >
              {
                <Typography variant="h6">
                  {value.senderIdx ===
                  roomState.currentDmRoomMemberList?.userIdx1
                    ? roomState.currentDmRoomMemberList?.userNickname1
                    : roomState.currentDmRoomMemberList?.userNickname2 +
                      ": " +
                      value.msg}
                </Typography>
              }
            </div>
          </ul>
        );
      })}
      <div ref={observerTarget}> </div>
      <Typography style={{ color: "white" }} component={"div"} align="center">
        this is top of the chat list...
      </Typography>
      {loading === true && (
        <Typography style={{ color: "white" }} component={"div"}>
          loading...
        </Typography>
      )}
    </Box>
  );
};

export default DmChat;
