"use client";

import { useInitMsg } from "@/context/InitMsgContext";
import { useRoom } from "@/context/RoomContext";
import { IDMChatFromServer } from "@/type/RoomType";
import { IChat } from "@/type/type";
import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
import { Dispatch, SetStateAction } from "react";

const options = {
  threshold: 0.1,
};

interface Props {
  msgs: IChat[];
  setMsgs: Dispatch<SetStateAction<IChat[]>>;
}

const DmChats = ({ msgs, setMsgs }: Props) => {
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(0); // [제작필요]첫 페이지 를 알아야한다.
  const { roomState } = useRoom();
  const { initMsgState } = useInitMsg();
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setPageNum((num) => num - 1);
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

  const callUser = useCallback(async () => {
    console.log(pageNum);
    await axios
      // dev original
      .get(
        `http://localhost:4000/chat/messages?channelIdx=${roomState.currentRoom?.channelIdx}&index=${pageNum}`
      )
      // haryu's server
      // .get(`http://paulryu9309.ddns.net:4000/chat/messages?channelIdx=1&index=${pageNum}`)
      .then((res) => {
        const newData = Array.isArray(res.data) ? res.data : [res.data];
        setMsgs((prevMsgs) => [...prevMsgs, ...newData]);
        setLoading(false);
      });
  }, [pageNum]);

  useEffect(() => {
    if (pageNum > 0) {
      setTimeout(() => {
        callUser();
      }, 500);
      setLoading(true);
    }
  }, [pageNum]);

  // 첫 메세지 20개 불러오는 로직
  useEffect(() => {
    if (!initMsgState.dmEnterEntry) return;
    const list: IChat[] = initMsgState.dmEnterEntry.message.map(
      (data: IDMChatFromServer) => {
        const payload: IChat = {
          channelIdx: initMsgState.dmEnterEntry?.channelIdx,
          senderIdx:
            data.sender === roomState.currentDmRoomMemberList?.userNickname1
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
    let calPage = Math.floor(initMsgState.dmEnterEntry.totalMsgCount / 5);
    // let calPage = initMsgState.dmEnterEntry.totalMsgCount / 5;
    console.log("initMsgState.dmEnterEntry.totalMsgCount % 5" , initMsgState.dmEnterEntry.totalMsgCount % 5);
    if (initMsgState.dmEnterEntry.totalMsgCount % 5 !== 0)
      calPage += 1;
    setPageNum(calPage);
    console.log("totalmsgcount: ",initMsgState.dmEnterEntry.totalMsgCount);
    console.log("total page : ",calPage);
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          overflowY: "auto",
          overflowAnchor: "none",
          position: "sticky",
          margin: "1% 0% 1% 0%",
          padding: "2% 2% 0.5% 2%",
          height: "36vh",
        }}
      >
        {msgs.map((value, i) => {
          return (
            <div
              key={i}
              style={{
                listStyleType: "none",
                margin: "0px 0 0 0",
                color: "white",
                padding: 0,
              }}
            >
              <Typography variant="h6">
                {value.senderIdx === roomState.currentDmRoomMemberList?.userIdx1
                  ? roomState.currentDmRoomMemberList?.userNickname1
                  : roomState.currentDmRoomMemberList?.userNickname2 +
                    ": " +
                    value.msg}
              </Typography>
            </div>
          );
        })}
        <div ref={observerTarget}></div>
        {loading === true && <p>loading...</p>}
      </div>
    </>
  );
};

export default DmChats;
